# 06-Server-Side-Weather-API

Week 6 of UW boot camp homework assignment ![hosted here](https://brians-123.github.io/06-Server-Side-Weather-API/)

## Description

```
This app uses multiple APIs.
Moment.js: allows for quick date calculation and formatting functionality.
OpenWeather: two free APIs were used. THe first grabs the latitude and longitude and another pulls the weather forcast. The first API did not provide 5 day forecast information and the second did not allow searching by city name. This was also a good chance to chain API requests together.
Bootstrap: the vast majority of the style and formattting came from bootstrap.

The app offers the ability to search by city and will display the current day's weather along with a 5 day forecast. The page will display highlighted UV Index depending on the healthiness of the conditions as well as weather icons making the page more engaging. Upon searching, the city will move to the top of the recent searches list. This list is clickable and will provide the same functionality as searching by city. Cities will be displayed in local storage to quickly come back to where the person left off.

```

## Demo

![Demo](./Assets/Weather-Dashboard.gif)

## User Story

```
AS a traveler
I WANT to view today's forecast and upcoming 5 day forecast in multiple cities
SO THAT I can make decisions on my travel activities and attire
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

## Licensing

This application is not to be used elsewhere.

## Credits

Acceptance criteria was part of the UW Coding Boot Camp and © 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
