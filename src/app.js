let apiKey = "f10daba5t5ce3fc3ed35o46ebd038a42";
let city = "Cincinnati";
let unit = "metric";
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
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
  date.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
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

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

// Default search if no city entered
search("Cincinnati");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", displayFahrenheitTemp);

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", displayCelciusTemp);
