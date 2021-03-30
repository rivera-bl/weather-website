const request = require('request')

const forecast = (lat, lon, callback) => {
    const apiKey = "8d8120a7918f1dcea675fb641b38ec6c"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

    // refactored with object shorthand and destructuring, body is a property of response
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to Weather Services', undefined)
        }else if(body.cod != 200){
            callback('Unable to find Location. Try another Coordinates', undefined)
        }else{
            callback(undefined, `There's ${body.main.temp} degrees out.`)
        }
    })
}

module.exports = forecast
