const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

app.set("view engine", "hbs");

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

const partialsPath = path.join(__dirname, "../views/partials");
hbs.registerPartials(partialsPath);


app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        author: "Beyond Training"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        author: "Beyond Training"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Us",
        author: "Beyond Training"
    });
});

app.get("/weather", (req ,res) => {
    if(req.query.location.length > 0){  
        geocode(req.query.location, (error, geoRes) => {

            if(error){
                return res.send({error: error});
            }
    
            forecast(geoRes.latitude, geoRes.longitude, (error, forecastRes) => {
                if(error){
                    return res.send({
                        error: error
                    });
                }
    
                res.send({
                    forecast: forecastRes,
                    place: geoRes.place
                });
            });
        });
    }else{
        res.send({error: "Please provide the location!"});
    }
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        author: "Beyond Training"
    });
});

var port = 3000;

if(process.env.PORT){
    port = process.env.PORT;
}

app.listen(process.env.PORT); //port


