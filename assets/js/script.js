var detailWeather = document.getElementById("detailWeather");
var cityInput = document.getElementById("cityInput");
var weatherUrlCurrent;
var city = document.getElementById("city");
var date = document.getElementById("date");
var temp = document.getElementById("temp");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var icon = document.getElementById("icon");

function searchCity() {
     document.addEventListener("click", function(event) {
          var element = event.target;
          if (element.matches("#searchBtn")) {
               weatherUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=0bc67a3f3f64547ee2e870ae76499e59`
               showWeather();
          }
     })
}
searchCity();


function showWeather() {
     fetch(weatherUrlCurrent)
     .then(function(response) {
          return response.json();
     })
     .then(function(data) {
          city.textContent = `${cityInput.value.toUpperCase()} Weather`;
          date.textContent = moment().format("MMM, D, YYYY");
          var iconNo = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
          console.log(iconNo);
          icon.setAttribute("src", iconNo);
          temp.textContent = `Temperature: ${data.main.temp}`; 
          humidity.textContent = `Humidity: ${data.main.humidity}`;
          wind.textContent = `Wind Speed: ${data.wind.speed}`;
     })
}