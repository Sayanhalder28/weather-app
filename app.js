const express = require("express");
const body = require("body-parser");
const https = require("https");

const app = express();
app.use(body.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/cityName",function(req,res){
  console.log(req.body)
  temperature(req.body.name,res);
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running...");
});


function temperature(location,res){
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ location +"&units="+ unit +"&appid=9a8d02ab2d5144e17923c45860eff768#" ;
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      res.render('temp',{cityName : location,temp : temp});
    });
  });
};
