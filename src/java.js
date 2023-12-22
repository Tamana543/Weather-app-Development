function changeTemperature(response) {
  let temperatureElement = document.querySelector("#current-tem-degree");
  let temperature = response.data.temperature.current;
  let descriptionElement = document.querySelector("#description");
  let headingTwo = document.querySelector("#city");
  let HumidityElement = document.querySelector("#Humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-tem-icon" />`;
  timeElement.innerHTML = formatDate(date);
  windSpeedElement.innerHTML = `${response.data.wind.speed}M/h`;
  HumidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  headingTwo.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  emojiIngine(response);
  forcastTemperature(response.data.city);
}
function emojiIngine(response) {
  let emojiElement = document.querySelector("#emoji");
  let emojiData = response.data.temperature.current;
  if (emojiData < 10) {
    emojiElement.innerHTML = "😎";
  } else {
    emojiElement.innerHTML = "🥵";
  }
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let Days = [
    "Sunday",
    "Monnday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = Days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function showUser(city) {
  let apiKey = "002f53aof18d4ab43a5e5047f8f74ctd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(changeTemperature);
}
/* it is time to add API to your pro.
1- get the axios paste it in header
2- get the Api from Shecodes - watch above*/

function searchIngine(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");

  showUser(searchInput.value);
}
function forcastTemperature(city) {
  let apiKey = "002f53aof18d4ab43a5e5047f8f74ctd";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function forecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  return days[date.getDay()];
}
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` 
    <div class="weather-forcast-date">
    <div class="forcast-day">${forecastDay(day.time)}</div>
    <div>
      <img src="${
        day.condition.icon_url
      }" alt="forcast image" class="forcast -img"/>
    </div>
    <div class="forcast-tem-num">
      <span class="for-tem-num-max">${Math.round(
        day.temperature.maximum
      )}&deg;</span>
      &nbsp;
      <span class="for-tem-num-min">${Math.round(
        day.temperature.minimum
      )}&deg;</span>
    </div>
    </div>
    `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#first-form");
searchForm.addEventListener("submit", searchIngine);
showUser("Kabul");
