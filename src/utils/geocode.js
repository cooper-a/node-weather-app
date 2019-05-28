const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY29vcGVyLWEiLCJhIjoiY2p2d3R3dzRrMDNsaTN6c3pzcHR4YXJldyJ9._Sx7L-YmP2FL5bOQSmdikQ'
    
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.features.length === 0) {
            callback('Unable to find that place, can you please try again?', undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode