// define variables for search
// var cityName = $("#city-search-input").val();

// var cityName = document.getElementById("city-search-input").value;
const myAPIKey = "b2475b8e5d424d1956220623cf67c7ef";
let latLonQueryURL = "";

$("#city-search-button").on("click", function () {
  let cityName = $("#city-search-input").val();
  //   const cityQueryURL =
  //     "http://api.openweathermap.org/data/2.5/weather?q=" +
  //     cityName +
  //     "&appid=b2475b8e5d424d1956220623cf67c7ef";
  const cityQueryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    myAPIKey;

  //asynchronous call to openweather API
  console.log(cityName);
  console.log(cityQueryURL);
  $.ajax({
    url: cityQueryURL,
    method: "GET",
  })
    .then(function (response) {
      console.log(response);
      console.log(cityName);
      console.log(response.coord.lat);
      console.log(response.coord.lon);
      const myLat = response.coord.lat;
      const myLon = response.coord.lon;
      latLonQueryURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        myLat +
        "&lon=" +
        myLon +
        "&exclude=minutely,hourly&appid=" +
        myAPIKey;
      //   console.log(latLonQueryURL);
    })
    .done(function (response) {
      console.log(latLonQueryURL);
      $.ajax({
        url: cityQueryURL,
        // url: latLonQueryURL,

        method: "GET",
      }).then(console.log(response));
    });
});
