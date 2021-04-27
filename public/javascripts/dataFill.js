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
const forecastElements = document.querySelector(".forecasts");
const mainIconElement = document.querySelector(".main-icon");

// // Units

function displayTemperature(temp) {
    return `${Math.round(temp)} ºC`
}

// function displaySpeed() {

// }

function convertTime(unixTime) {
    // Converts unix time to local time format.
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const convertedTime = formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return convertedTime;
}

function setCurrent(data) {
    cloudElement.textContent = `${data.clouds}%`;
    temperatureElement.firstChild.nodeValue = displayTemperature(data.temp);
    feelsLikeElement.textContent = displayTemperature(data.feels_like);
    humidityElement.textContent = `${data.humidity}%`;
    descriptionElement.textContent = data.weather[0].description;
    windSpeedElement.textContent = data.wind_speed;
    windDirectionElement.textContent = data.wind_deg;
    sunriseElement.textContent = convertTime(data.sunrise);
    sunsetElement.textContent = convertTime(data.sunset);
    mainIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
}

function setForecast(data, index) {
    const [day, weekDay] = new Date(data.sunrise * 1000).toLocaleDateString('en-US', { weekday: 'long', day: "numeric" }).split(" ")
    const dailyForecast = document.createElement("div");
    // dailyForecast.setAttribute(`daily-forecast-${index}`, "")
    dailyForecast.classList.add("daily-forecast");
    dailyForecast.innerHTML = `${weekDay} ${day}
    <img class="forecast-img" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    <span class="forecast-max">${displayTemperature(data.temp.max)}</span>
    <span class="forecast-min">${displayTemperature(data.temp.min)}</span >`;
    forecastElements.appendChild(dailyForecast);
}

function setValues(data, location) {

    locationElement.textContent = location;

    // Current conditions
    setCurrent(data.current);

    // Forecast
    forecastElements.innerHTML = ""; // reset forecast div
    data.daily.map((data, index) => setForecast(data, index));

    setUnits();
}