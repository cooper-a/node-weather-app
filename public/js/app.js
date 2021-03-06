console.log('Client side JS file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = '/weather?address=' + location

    messageOne.textContent = 'Loading!'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.summary + ' It is currently ' + data.temperature + ' degrees with a ' + data.precipProb + ' percent chance of rain. Today\'s high is ' + data.highTemp + ' and the low is ' + data.lowTemp + '.'
        }
    })
})

})