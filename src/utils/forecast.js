const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const weatherURL = "http://api.weatherstack.com/current?access_key=a0209f40212e543fba07c6a36b8ff39f&query="
                        + latitude + "," + longitude;

    request({url: weatherURL, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to the server. Please try again later!", undefined);
        }else if(response.body.error){
            callback("Unable to fetch weather. Please specify a valid location!", undefined);
        }else{
            const weatherReport = "The current weather is " + response.body.current.temperature + " degrees. But it feels like "
            + response.body.current.feelslike + " degrees.";

            callback(undefined, weatherReport);
        }
    });
}

module.exports = forecast;
