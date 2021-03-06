// define variables for search
const myAPIKey = "b2475b8e5d424d1956220623cf67c7ef";
let latLonQueryURL = "";
let myLat = "";
let myLon = "";
let fiveDayForecast = {};
let cityName = "";

//iterate over the days of the week for 5 day forecast
for (let i = 1; i < 6; i++) {
  $(`#date-` + i).text(moment().add(i, "days").format("dddd"));
}

//define html placeholder elements
const cityHistoryEl = $(".city-history");
const cityNameEl = $("#city-name");

//create an object for recent city history
let cityHistoryObj = {};
let cityArray = [];

//pull back saved local storage and render on the page
if (JSON.parse(localStorage.getItem("WeatherDashboard")) != null) {
  cityArray = JSON.parse(localStorage.getItem("WeatherDashboard"));
  cityName = cityArray[cityArray.length - 1];
  for (j = 0; j < cityArray.length; j++) {
    let thisSavedCityEl = $(
      `<li class="list-group-item">` + cityArray[j] + `</li>`
    );
    if (j === cityArray.length - 1) {
      thisSavedCityEl.css("background-color", "green");
    }
    $(cityHistoryEl).prepend(thisSavedCityEl);
    searchOpenWeatherAPI(cityName);
  }
}

//search the OpenWeatherAPIs using the city name
$("#city-search-button").on("click", function () {
  cityName = $("#city-search-input").val();
  searchOpenWeatherAPI(cityName);
});

//renders weather info onto the page
function renderWeatherResults() {
  //sets uv index highlights based on world standard
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

  $("#day-0-wind").text(fiveDayForecast.daily[0].wind_speed + "mph");
  $("#day-0-uv")
    .text(fiveDayForecast.daily[0].uvi)
    .css("background-color", uVIndexColor);

  //push data from open weather api response to page elements
  //looping through each of the 5 day's elements to update
  for (let i = 0; i < 6; i++) {
    $(`#day-` + i + `-icon`)
      .attr(
        "src",
        "https://openweathermap.org/img/wn/" +
          fiveDayForecast.daily[i].weather[0].icon +
          "@2x.png"
      )
      .show();
    $(`#day-` + i + `-temp`).text(
      fiveDayForecast.daily[i].temp.day + "\u00B0 F"
    );
    $(`#day-` + i + `-humidity`).text(fiveDayForecast.daily[i].humidity);
  }
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
  $("#city-name").text(cityName);
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
        newCityEl.css("background-color", "green");
        $(cityHistoryEl).children().css("background-color", "white");
        $(cityHistoryEl).prepend(newCityEl);

        //adding on-click event to allow for recent search functionality on first load
        $(".list-group-item").on("click", function () {
          $(this).css("background-color", "green");
          $(this).siblings().css("background-color", "white");
          //pull info back from local storage and populate the elements appropriately
          cityName = $(this).text();
          searchOpenWeatherAPI(cityName);
        });
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
        });
    });
}
