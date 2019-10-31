 const request = require('request')

const forecast = (latitude, longtitude, callback) => {

const url = 'https://api.darksky.net/forecast/7ef31227738e2db07226340307060275/'+ encodeURIComponent(latitude) +',' + encodeURIComponent(longtitude)+'?units=si'

request({url, json: true}, (error, {body}) => {
    if(error) {
        callback('Unable to connect!', undefined)
    } else if(body.error){
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, 'Tong ket: ' + body.daily.data[0].summary + ' === Voi nhiet do: ' + body.currently.temperature + ' do C ==== Va ti le co mua la: ' + body.currently.precipProbability + '%'
        )
        }
})
 }

 module.exports = forecast