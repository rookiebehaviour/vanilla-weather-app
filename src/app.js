let apiKey = "f10daba5t5ce3fc3ed35o46ebd038a42";
let city = "Middletown";
let unit = "metric";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&units=${unit}&key=${apiKey}`;

function displayTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let weatherElement = document.querySelector("#weather");
  weatherElement.innerHTML = response.data.condition.description;

  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = Math.round(response.data.temperature.feels_like);
  feelsLikeElement.innerHTML = `Feels like: ${feelsLike}°`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#windspeed");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
}

axios.get(url).then(displayTemp);
