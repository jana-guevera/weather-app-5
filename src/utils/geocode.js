const request = require("postman-request");

const geocode = (location, callback) => {
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?limit=1&access_token=pk.eyJ1IjoiamFuYWd1ZXZlcmEwNyIsImEiOiJja3F2YW91aGQwY250MnFvNnlmYWIxZ3drIn0.kEuq4uPgYr0FnBlNDv7pPw";

    request({url: geocodeUrl, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to the server. Please try again later!", undefined);
        }else if(response.body.features.length === 0){
            callback("Unable to fetch geocode. Please specify a valid location!", undefined);
        }else{
            const location = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            }

            callback(undefined, location);
        }
    });
}

module.exports = geocode;