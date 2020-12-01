// define variables for search
const myAPIKey = "b2475b8e5d424d1956220623cf67c7ef";
let latLonQueryURL = "";
let myLat = "";
let myLon = "";
let fiveDayForecast = {};
let cityName = "";

//add days of week and format with moment.js api
$("#date-1").text(moment().add(1, "days").format("dddd"));
$("#date-2").text(moment().add(2, "days").format("dddd"));
$("#date-3").text(moment().add(3, "days").format("dddd"));
$("#date-4").text(moment().add(4, "days").format("dddd"));
$("#date-5").text(moment().add(5, "days").format("dddd"));

//define html placeholder elements
const todayTempEl = $("#today-temp");
const todayHumidityEl = $("#today-humidity");
const todayWindEl = $("#today-wind");
const todayUVEl = $("#today-uv");
const cityHistoryEl = $(".city-history");
const cityNameEl = $("#city-name");

//create an object for recent city history
let cityHistoryObj = {};
let cityArray = [];

//pull back saved local storage and render on the page
if (JSON.parse(localStorage.getItem("WeatherDashboard")) != null) {
  cityArray = JSON.parse(localStorage.getItem("WeatherDashboard"));

  for (j = 0; j < cityArray.length; j++) {
    let thisSavedCityEl = $(
      `<li class="list-group-item">` + cityArray[j] + `</li>`
    );
    $(cityHistoryEl).prepend(thisSavedCityEl);
  }
}

//search the OpenWeatherAPIs using the city name
$("#city-search-button").on("click", function () {
  cityName = $("#city-search-input").val();
  $("#city-name").text(cityName);
  searchOpenWeatherAPI(cityName);
});

//renders weather info onto the page
function renderWeatherResults() {
  let uVIndexColor = "";
  if (fiveDayForecast.daily[0].uvi <= 2) {
    uVIndexColor = "green";
  } else if (fiveDayForecast.daily[0].uvi <= 5) {
    uVIndexColor = "yellow";
  } else if (fiveDayForecast.daily[0].uvi <= 7) {
    uVIndexColor = "orange";
  } else if (fiveDayForecast.daily[0].uvi <= 10) {
    uVIndexColor = "red";
  } else {
    uVIndexColor = "violet";
  }

  todayTempEl.text(fiveDayForecast.daily[0].temp.day + "\u00B0 F");
  todayHumidityEl.text(fiveDayForecast.daily[0].humidity + "%");
  todayWindEl.text(fiveDayForecast.daily[0].wind_speed + "mph");
  todayUVEl
    .text(fiveDayForecast.daily[0].uvi)
    .css("background-color", uVIndexColor);

  //push data from open weather api response to page elements
  $("#day-0-icon")
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        fiveDayForecast.daily[0].weather[0].icon +
        "@2x.png"
    )
    .show();
  $("#day-1-icon")
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        fiveDayForecast.daily[1].weather[0].icon +
        "@2x.png"
    )
    .show();

  $("#day-2-icon")
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        fiveDayForecast.daily[2].weather[0].icon +
        "@2x.png"
    )
    .show();

  $("#day-3-icon")
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        fiveDayForecast.daily[3].weather[0].icon +
        "@2x.png"
    )
    .show();
  $("#day-4-icon")
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        fiveDayForecast.daily[4].weather[0].icon +
        "@2x.png"
    )
    .show();
  $("#day-5-icon")
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        fiveDayForecast.daily[5].weather[0].icon +
        "@2x.png"
    )
    .show();
  $("#day-1-temp").text(fiveDayForecast.daily[1].temp.day + "\u00B0 F");
  $("#day-2-temp").text(fiveDayForecast.daily[2].temp.day + "\u00B0 F");
  $("#day-3-temp").text(fiveDayForecast.daily[3].temp.day + "\u00B0 F");
  $("#day-4-temp").text(fiveDayForecast.daily[4].temp.day + "\u00B0 F");
  $("#day-5-temp").text(fiveDayForecast.daily[5].temp.day + "\u00B0 F");
  $("#day-1-humidity").text(fiveDayForecast.daily[1].humidity);
  $("#day-2-humidity").text(fiveDayForecast.daily[2].humidity);
  $("#day-3-humidity").text(fiveDayForecast.daily[3].humidity);
  $("#day-4-humidity").text(fiveDayForecast.daily[4].humidity);
  $("#day-5-humidity").text(fiveDayForecast.daily[5].humidity);
}

//Allows looking up prior city data by clicking the recent search
//and formats based on clicks
$(".list-group-item").on("click", function () {
  $(this).css("background-color", "green");
  $(this).siblings().css("background-color", "white");
  //pull info back from local storage and populate the elements appropriately
  cityName = $(this).text();
  searchOpenWeatherAPI(cityName);
});

//separating function to search for OpenWeather API info
//as the storage is persistant in local storage and the user could come
//back and search again after a day, we want to always search the apis
function searchOpenWeatherAPI(cityName) {
  const cityQueryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    myAPIKey;

  //asynchronous call to openweather API to get the latitude and longitude
  $.ajax({
    url: cityQueryURL,
    method: "GET",
  })
    .then(function (response) {
      let thisCity = cityName;
      myLat = response.coord.lat;
      myLon = response.coord.lon;
      latLonQueryURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        myLat +
        "&lon=" +
        myLon +
        "&exclude=minutely,hourly&units=imperial&appid=" +
        myAPIKey;

      //if cityArray doesn't contain thisCity add to the array
      if (!cityArray.includes(thisCity)) {
        cityArray.push(thisCity);
        let newCityEl = $(`<li class="list-group-item">` + thisCity + `</li>`);
        $(cityHistoryEl).prepend(newCityEl);
        localStorage.setItem("WeatherDashboard", JSON.stringify(cityArray));
      }
    })

    //wait for the response to get the latitude and longitude then use a different api
    //to get the 5 day forecast
    .then(function () {
      $.ajax({
        url: latLonQueryURL,
        method: "GET",
      })
        //save the response to an object
        .then(function (saveFiveDay) {
          fiveDayForecast = saveFiveDay;
          renderWeatherResults(fiveDayForecast);
          console.log(saveFiveDay);
        });
    });
}
