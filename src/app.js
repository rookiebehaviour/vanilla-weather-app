let apiKey = "f10daba5t5ce3fc3ed35o46ebd038a42";
let city = "Middletown";
let unit = "metric";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

function displayTemp(response) {
  console.log(response.data.temperature.current);
}

axios.get(url).then(displayTemp);
