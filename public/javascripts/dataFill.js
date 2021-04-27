const locationElement = document.querySelector("[data-location]");
const temperatureElement = document.querySelector("[data-temperature]");
const descriptionElement = document.querySelector("[data-description]");
const feelsLikeElement = document.querySelector("[data-feels]");
const cloudElement = document.querySelector("[data-clouds]");
const humidityElement = document.querySelector("[data-humidity]");
const windSpeedElement = document.querySelector("[data-speed]");
const windDirectionElement = document.querySelector("[data-direction]");
const sunriseElement = document.querySelector("[data-sunrise]");
const sunsetElement = document.querySelector("[data-sunset]");
const forecastElements = document.querySelector(".forecasts")

function convertTime(unixTime) {
    // Converts unix time to local time format.
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const convertedTime = formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return convertedTime;
}

// function weekDay(unixTime) {
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const dayNum = new Date(unixTime * 1000).getDay();
//     return days[dayNum];
// }

function setCurrent(data) {
    cloudElement.textContent = data.clouds;
    temperatureElement.textContent = data.temp;
    feelsLikeElement.textContent = data.feels_like;
    humidityElement.textContent = data.humidity;
    descriptionElement.textContent = data.weather[0].description;
    windSpeedElement.textContent = data.wind_speed;
    windDirectionElement.textContent = data.wind_deg;
    sunriseElement.textContent = convertTime(data.sunrise);
    sunsetElement.textContent = convertTime(data.sunset);
}

function setForecast(data, index) {
    const [day, weekDay] = new Date(data.sunrise * 1000).toLocaleDateString('en-US', { weekday: 'long', day: "numeric" }).split(" ")
    const dailyForecast = document.createElement("div");
    dailyForecast.setAttribute(`daily-forecast-${index}`, "")
    dailyForecast.innerHTML = `${weekDay} ${day}
    <span class="forecast-max">${data.temp.max}</span>
    <span class="forecast-min">${data.temp.min}</span>`;
    forecastElements.appendChild(dailyForecast);
}

function setValues(data, location) {
    locationElement.textContent = location;

    // Current conditions
    setCurrent(data.current);

    // Forecast
    forecastElements.innerHTML = ""; // reset forecast div
    data.daily.map((data, index) => setForecast(data, index));
}

