var detailWeather = document.getElementById("detailWeather");
var cityInput = document.getElementById("cityInput");
var weatherUrlCurrent;
var weatherUrlAll;
var city = document.getElementById("city");
var date = document.getElementById("date");
var temp = document.getElementById("temp");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var icon = document.getElementById("icon");
var uvi = document.getElementById("uvi");
var lat;
var lon;
var forecast = document.getElementById("forecast");
var day1 = document.getElementById("day1");
var day2 = document.getElementById("day2");
var day3 = document.getElementById("day3");
var day4 = document.getElementById("day4");


function searchCity() {
     document.addEventListener("click", function(event) {
          var element = event.target;
          if (element.matches("#searchBtn")) {
               weatherUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=0bc67a3f3f64547ee2e870ae76499e59`
               getCoord();
          }
     })
}
searchCity();

function getCoord() {
     fetch(weatherUrlCurrent)
     .then(function(response) {
          return response.json();
     })
     .then(function(data) {
          lat = data.coord.lat;
          lon = data.coord.lon;
          console.log(lat);
          console.log(lon);
          weatherUrlAll = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=0bc67a3f3f64547ee2e870ae76499e59`
          console.log(weatherUrlAll);
          getWeather();
     })     
}

function getWeather() {
     fetch(weatherUrlAll)
     .then(function(response) {
          return response.json();
     })
     .then(function(data) {
          city.textContent = `${cityInput.value.toUpperCase()} Weather`;
          date.textContent = moment().format("MMM, D, YYYY");
          var iconNo = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;
          console.log(iconNo);
          icon.setAttribute("src", iconNo);
          temp.textContent = `Temperature: ${data.current.temp}`; 
          humidity.textContent = `Humidity: ${data.current.humidity}`;
          wind.textContent = `Wind Speed: ${data.current.wind_speed}`;
          uvi.textContent = `Uvi: ${data.current.uvi}`;
          getFuture(day1, 1);
          getFuture(day2, 2);
          getFuture(day3, 3);
          getFuture(day4, 4);
     })
}

function getFuture(day, n) {
     day.textContent = moment().add(n, 'days').format("dddd");
     fetch(weatherUrlAll)
     .then(function(response) {
          return response.json();
     })
     .then(function(data) {
          var temp = document.createElement("div");
          temp.textContent = `Temperature: ${data.daily[n].temp.day}`; 
          day.appendChild(temp);
          var humidity = document.createElement("div");
          humidity.textContent = `Humidity: ${data.daily[n].humidity}`;
          day.appendChild(humidity);
          var wind = document.createElement("div");
          wind.textContent = `Wind Speed: ${data.daily[n].wind_speed}`;
          day.appendChild(wind);
          var uvi = document.createElement("div");
          uvi.textContent = `Uvi: ${data.daily[n].uvi}`;
          day.appendChild(uvi);
     })
}
