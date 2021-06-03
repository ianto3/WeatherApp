if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const mapBoxToken = process.env.MAPBOX_TOKEN;

const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const axios = require("axios")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("weather", { mapBoxToken });
})

app.post("/weather", (req, res) => {
    const { latitude, longitude } = req.body;
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${OPENWEATHER_API_KEY}&units=metric`
    axios.get(url, {
        responseType: "json"
    })
        .then(data => res.json(data.data))
        .catch(err => console.log("error!!!", err));
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})