const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

// Persists slide index data for slideshow
app.get("/slide-index", (req, res) => {
  let slideIndex = 0;

  try {
    slideIndex = parseInt(fs.readFileSync("slide-count.txt", "utf8")) || 0;
  } catch (err) {
    console.error("Error reading slide index:", err);
  }

  res.send(slideIndex.toString());
});

app.post("/update-slide-index", (req, res) => {
  const slideIndex = req.body.slideIndex;

  try {
    fs.writeFileSync("slide-count.txt", slideIndex.toString());
    res.sendStatus(200);
  } catch (err) {
    console.error("Error updating slide index:", err);
    res.sendStatus(500);
  }
});

// Handle weather get requests using OpenWeatherMap API
const API_KEY = ""; // Please input your own API key here!
const CITY = "Berkeley";
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;

app.get("/latest-weather", async (req, res) => {
  try {
    const response = await fetch(WEATHER_API_URL);
    const data = await response.json();
    if (data.main && data.main.temp) {
      const temperature = Math.round(((data.main.temp - 273.15) * 9) / 5 + 32);
      res.json({ temperature });
    } else {
      res.status(404).json({ error: "No weather data found" });
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Listen for http requests
app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}!`);
});
