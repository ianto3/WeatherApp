const locationElement = document.querySelector("[data-location]");
const temperatureElement = document.querySelector("[data-temperature]");
const descriptionElement = document.querySelector("[data-description]");
const feelsLikeElement = document.querySelector(".feels-like");
const cloudElement = document.querySelector("[data-clouds]");
const humidityElement = document.querySelector("[data-humidity]");
const windSpeedElement = document.querySelector("[data-speed]");
const windDirectionElement = document.querySelector("[data-direction]");
const windCompass = document.querySelector(".wind-direction")
const sunriseElement = document.querySelector("[data-sunrise]");
const sunsetElement = document.querySelector("[data-sunset]");
const forecastElements = document.querySelector(".forecasts");
const mainIconElement = document.querySelector(".main-icon");

// Unit handling

const celsiusInput = document.querySelector("#celsius");
const fahrenheitInput = document.querySelector("#fahrenheit")

function isMetric() {
    return celsiusInput.checked
}

function updateUnits() {
    // Temperatures
    const allTemperatureValues = document.querySelectorAll("[data-temperature]");
    allTemperatureValues.forEach(el => el.textContent = displayTemperature(el.textContent));

    const allTempUnits = document.querySelectorAll("[data-temp-unit]");
    allTempUnits.forEach(el => el.textContent = isMetric() ? " ºC" : " ºF");

    // Speed
    const allSpeedValues = document.querySelectorAll("[data-speed]");
    console.dir(allSpeedValues)
    allSpeedValues.forEach(el => el.textContent = displaySpeed(el.textContent));

    const allSpeedUnits = document.querySelectorAll("[data-speed-unit]");
    allSpeedUnits.forEach(el => el.textContent = isMetric() ? " km/h" : " mph");
}

function displayTemperature(temp) {
    if (isMetric()) {
        return Math.round(temp);
    }
    return Math.round(temp * (9 / 5) + 32);
}

function displaySpeed(speed) {
    if (isMetric()) {
        return speed;
    }
    return (speed / 1.609).toFixed(2);
}

// Data display

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
    windSpeedElement.textContent = displaySpeed(data.wind_speed);
    windDirectionElement.textContent = data.wind_deg;
    windCompass.style.transform = `rotate(${data.wind_deg + 90}deg)`
    sunriseElement.textContent = convertTime(data.sunrise);
    sunsetElement.textContent = convertTime(data.sunset);
    mainIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
}

function setForecast(data, index) {
    const [day, weekDay] = new Date(data.sunrise * 1000).toLocaleDateString('en-US', { weekday: 'long', day: "numeric" }).split(" ")
    const dailyForecast = document.createElement("div");
    dailyForecast.classList.add("daily-forecast");

    dailyForecast.innerHTML = `${weekDay} ${day}
    <img class="forecast-img" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    <div class="forecast-max">
    <span data-temperature>${displayTemperature(data.temp.max)}</span>
    <span data-temp-unit> ºC</span>
    </div>
    <div class="forecast-min">
    <span data-temperature>${displayTemperature(data.temp.min)}</span>
    <span data-temp-unit> ºC</span>
    </div>`;

    forecastElements.appendChild(dailyForecast);
}

// Main function

function setValues(data, location) {
    locationElement.textContent = location;
    // Current conditions
    setCurrent(data.current);
    // Forecast
    forecastElements.innerHTML = ""; // reset forecast div
    data.daily.map((data, index) => setForecast(data, index));

    celsiusInput.addEventListener("change", () => {
        setCurrent(data.current);
        forecastElements.innerHTML = ""; // reset forecast div
        data.daily.map((data, index) => setForecast(data, index));
        updateUnits()
    });

    fahrenheitInput.addEventListener("change", updateUnits);
}

