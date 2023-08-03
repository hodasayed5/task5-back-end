const request = require("request")
const forecaste = (longtitude, latitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=51a20bc2793045b6b26142621220803&q=' + longtitude + "," + latitude
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("error23", undefined)
        }
        else if (response.body.error) {
            callback(response.body.error.message, undefined)
        }
        else {
            callback(undefined, response.body.location.name + " it is " + response.body.current.condition.text + " and temp " + response.body.current.temp_c)
        }
    })
}
module.exports = forecaste;