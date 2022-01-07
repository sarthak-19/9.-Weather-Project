const express = require("express");

const app = express();
const https=require("https");
const { REPL_MODE_STRICT } = require("repl");


app.get("/", function(req,res) 
{
    const url="https://api.openweathermap.org/data/2.5/weather?q=Allahabad&appid=182f3690b07d046dd63f05d924d24f12&units=metric";
    https.get(url,function(response)
    {
        console.log(response.statusCode);

        response.on("data",function(data)
        {
            const weatherData=JSON.parse(data);
            var temp=weatherData.main.temp
            var description=weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>Weather in Prayagraj is "+description+"<\h1>");
            res.write("<h2>Current temperature is "+temp+"</h2>")
            res.write("<image src="+iconUrl+">");
            res.send();
            // console.log(weatherData);
        });
    });
//    res.send("server is up and running"); 
});


app.listen(3000, function()
{
    console.log("Server running on port 3000");
});