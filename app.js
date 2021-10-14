const express = require("express");
const https = require("https");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  //res.send("Server is running");
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Vancouver&units=metric&appid=acb26e7d0729d6f9d84f43af38a21e4d";
  https.get(url, (response) => {
    // console.log("response", response);
    // console.log("statusCode:", response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      //console.log(weatherData);
      const temp = weatherData.main.temp;
      //console.log(temp);
      const description = weatherData.weather[0].description;
      //console.log("description", description);
      const icon = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(
        `<h1>The temperature in Vancouver is ${temp} degrees Celcius</h1>`
      );
      res.write(`<p>The weather is currently ${description}</p>`);
      res.write(`<img src="${imageUrl}" alt="weather icon">`);
      res.send();
    });

    // }).on('error', (e) => {
    //   console.error(e);
  });
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
