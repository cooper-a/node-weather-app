const request = require('request')



const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3b4e5790fda7e47bd3464c9c12263100/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to darksky API!', undefined)
        }
        else if(body.error) {
            callback('Unable to find that location!', undefined)
        }
        else {
            callback(undefined, {
                temperature: body.currently.temperature,
                precipProb: body.currently.precipProbability,
                summary: body.daily.data[0].summary
            })
        }
    })
}

module.exports = forecast