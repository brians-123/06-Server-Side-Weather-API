// define variables for search
const myAPIKey = "b2475b8e5d424d1956220623cf67c7ef";
let latLonQueryURL = "";
let myLat = "";
let myLon = "";
let fiveDayForecast = {};
const todayTempEl = $("#today-temp");
const todayHumidityEl = $("#today-humidity");
const todayWindEl = $("#today-wind");
const todayUVEl = $("#today-UV");
const cityHistory = $(".city-history");

$("#city-search-button").on("click", function () {
  let cityName = $("#city-search-input").val();
  const cityQueryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    myAPIKey;

  //asynchronous call to openweather API
  $.ajax({
    url: cityQueryURL,
    method: "GET",
  })
    .then(function (response) {
      myLat = response.coord.lat;
      myLon = response.coord.lon;
      latLonQueryURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        myLat +
        "&lon=" +
        myLon +
        "&exclude=minutely,hourly&appid=" +
        myAPIKey;
    })
    .then(function (myDailyWeatherResponse) {
      $.ajax({
        url: latLonQueryURL,
        method: "GET",
      }).then(function (saveFiveDay) {
        fiveDayForecast = saveFiveDay;
        renderWeatherResults(fiveDayForecast);
      });
    });
});
function renderWeatherResults(weatherResults) {
  console.log(fiveDayForecast);
  todayTempEl.text("asdf");
}
