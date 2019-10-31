const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() 
const port = process.env.PORT || 3000

// Define paths for Express
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Du bao thoi tiet',
        name: 'Khanh'
    })
})
app.get('/weather', (req, res) => {
    const location = req.query.search
    if(!location) {
        return res.send({
            error: 'Ban phai dien ten thanh pho'
        })
    }  


    geocode(location, (error, {latitude, longtitude, location} = {}) => {
            if(error) {
                return res.send({ error })
            }

            forecast(latitude, longtitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }

                res.send({
                    location,
                    forecast: forecastData
                })
            })
        })

    
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Thong tin',
        name: 'Khanh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Giup do',
        help: 'Goi theo SDT: ' 
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: 'Khong tim thay trang help nay',
        errorMess: 'Help page not Found'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: 'Khong thay trang',
        errorMess: 'not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})