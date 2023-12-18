function changeTemperature(response) {
  let temperatureElement = document.querySelector("#current-tem-degree");
  let temperature = response.data.temperature.current;

  let headingTwo = document.querySelector("#city");
  headingTwo.innerHTML = response.date.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

let searchForm = document.querySelector("#first-form");
searchForm.addEventListener("submit", searchIngine);
showUser("Kabul");
