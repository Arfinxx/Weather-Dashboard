// When a user searches for a city they are presented with current and future conditions for that city.

//fetch data using API
var city = "London";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=50&appid=adafafa7b4ca2fd642e72286f02918a6";

fetch(queryURL)
  .then(function (response) {
    return response.json();
  }).then(function (data) {

    console.log(data)
 

// When a user views the current weather conditions for that city they are presented with:
// The city name
// The date
var dt = data.list[0].dt;
var currentDate = new Date(dt*1000);
var cityAndDate = $("<h2>").text(data.city.name + " (" + currentDate.toLocaleDateString('en-US')+ ")");
$("#today").append(cityAndDate);

// An icon representation of weather conditions
var iconDiv = $("<div>").attr("id", "icon");
var iconImg = $("<img>").attr({ 
    "id": "today-icon", 
    "src": "", 
    "alt": "Weather icon"});

var iconEl = iconDiv.append(iconImg);

var iconCode = data.list[0].weather[0].icon;
var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
iconImg.attr("src", iconURL);

$("#today").append(iconEl);

// The temperature
var tempC = (data.list[0].main.temp - 273.15).toFixed(2);
var tempCH3 = $("<h3>").text("Temp: " + tempC.toString() + " °C").attr("style", "padding-top: 15px;");
$("#today").append(tempCH3);

// The wind speed
var WindSp = $("<h3>").text("Wind: " + data.list[0].wind.speed + " KPH");
$("#today").append(WindSp);

// The humidity

var humid = $("<h3>").text("Humidity: " + data.list[0].main.humidity + " %");
$("#today").append(humid);

})

// When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:



// The date
// An icon representation of weather conditions
// The temperature
// The humidity

// The city is added to the search history

// When a user click on a city in the search history they are again presented with current and future conditions for that city