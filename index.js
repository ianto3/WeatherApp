if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const mapBoxToken = process.env.MAPBOX_TOKEN;

const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const ejsMate = require("ejs-mate") // might not need it
const axios = require("axios")

// tell express we want to use ejs-mate
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("weather", { mapBoxToken });
})

app.post("/weather", (req, res) => {
    // console.log(req.body)
    console.log("post-entry")
});

app.listen(3000, () => {
    console.log("listening...")
})