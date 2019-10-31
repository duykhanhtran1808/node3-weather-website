console.log('app.js is loaded, babe')


 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    messageOne.textContent = 'Doi ti dang load :D'
    messageTwo.textContent = ''


    fetch('/weather?search=' + encodeURIComponent(location)).then((response) => { 
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            }else {
                messageOne.textContent = data.location,
                messageTwo.textContent = data.forecast
            }
        })
    })
})
 
