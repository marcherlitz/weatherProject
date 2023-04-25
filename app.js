//jshint esversion:6
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = 'a7fdd0c52ffbb71acddd8e8af28a487c';
    const unit = 'metric';
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    console.log(url);
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weather = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(weatherData.main.temp);
            
            res.write("<h1>The temperature in " + query + " is " + temp + " Degree Celsius</h1>"); 
            res.write("<h2> The weather is " + weather +  "</h2>");
            res.write("<img src='" + imageURL +"'>");
        })
    });
});

 
app.listen(port, () => {
    console.log("Connected to Server on Port 3000!");
});