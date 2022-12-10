let apiKey = "f10daba5t5ce3fc3ed35o46ebd038a42";
let city = "Cincinnati";
let unit = "imperial";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&units=${unit}&key=${apiKey}`;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">
                ${formatDay(forecastDay.time)}
              </div>
                <img src=${forecastDay.condition.icon_url} 
                alt=${forecastDay.condition.icon} 
                width="42" />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">
                    ${Math.round(forecastDay.temperature.maximum)}°
                  </span>
                  <span class="weather-forecast-temperature-min">
                    ${Math.round(forecastDay.temperature.minimum)}°
                  </span>
                </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f10daba5t5ce3fc3ed35o46ebd038a42";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&units=${unit}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  celciusTemp = response.data.temperature.current;

  let temperature = Math.round(celciusTemp);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherElement = document.querySelector("#weather");
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let humidityElement = document.querySelector("#humidity");
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#windspeed");
  let date = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.condition.icon;

  temperatureElement.innerHTML = `${temperature}`;
  cityElement.innerHTML = response.data.city;
  weatherElement.innerHTML = response.data.condition.description;
  feelsLikeElement.innerHTML = `Feels like: ${feelsLike}°`;
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `Wind: ${wind} mph`;
  date.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "f10daba5t5ce3fc3ed35o46ebd038a42";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&units=${unit}&key=${apiKey}`;

  axios.get(url).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchBoxElement = document.querySelector("#search-box");
  search(searchBoxElement.value);
}

// Default search if no city entered
search("Cincinnati");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
