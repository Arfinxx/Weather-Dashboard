// When a user searches for a city they are presented with current and future conditions for that city.

cities = ["London"];
selectedCity = cities[0]

//fetch data using API
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + selectedCity + "&cnt=50&appid=adafafa7b4ca2fd642e72286f02918a6";

function SearchForecast(){
fetch(queryURL)
.then(function (response) {
    return response.json();
}).then(function (data) {
    
    console.log(data)
    
    $("#today").empty();
    $("#forecast").empty();
    
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
        var tempCH3 = $("<h4>").text("Temp: " + tempC.toString() + " °C").attr("style", "padding-top: 15px;");
        $("#today").append(tempCH3);
        
        // The wind speed
        var windSp = $("<h4>").text("Wind: " + data.list[0].wind.speed + " KPH");
        $("#today").append(windSp);
        
        // The humidity
        
        var humid = $("<h4>").text("Humidity: " + data.list[0].main.humidity + " %");
        $("#today").append(humid);
        
        
        // When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
        var cardGroup = $("<div>").addClass("card-group")
        
        var i = 7;
        
        while ( i < data.list.length) {
            
            var cardContainer = $("<div>").addClass("card bg-dark text-light border-secondary");
            var cardBody = $("<div>").addClass("card-body");
            
            cardContainer.append(cardBody);
            
            // The date
            
            
            var dt1 = data.list[i].dt;
            var nextDate = new Date(dt1*1000);
            var dateTitle = $("<h2>").text(nextDate.toLocaleDateString('en-US'));
            cardBody.append(dateTitle);
            
            
            // An icon representation of weather conditions
            
            
            
            var cardIconDiv = $("<div>").attr("id", "icon");
            var cardIconImg = $("<img>").attr({ 
                "id": "card-icon", 
                "src": "", 
                "alt": "Weather icon"});
                
                var cardIconEl = cardIconDiv.append(cardIconImg);
                
                var cardIconCode = data.list[i].weather[0].icon;
                var cardIconURL = "http://openweathermap.org/img/w/" + cardIconCode + ".png";
                cardIconImg.attr("src", cardIconURL);
                
                cardBody.append(cardIconEl);
                
                
                
                // The temperature
                
                
                
                var cardTempC = (data.list[i].main.temp - 273.15).toFixed(2);
                var cardTempCH3 = $("<h3>").text("Temp: " + cardTempC.toString() + " °C").attr("style", "padding-top: 15px;");
                cardBody.append(cardTempCH3);
                
                
                // The wind speed
                
                
                var cardWindSp = $("<h3>").text("Wind: " + data.list[i].wind.speed + " KPH");
                cardBody.append(cardWindSp);
                
                
                
                // The humidity
                
                
                
                var cardHumid = $("<h3>").text("Humidity: " + data.list[i].main.humidity + " %");
                cardBody.append(cardHumid);
                
                
                cardGroup.append(cardContainer);
                
                i = i+8;
                
                
            }  
            $("#forecast").append(cardGroup);
        })        
}
SearchForecast();

 // The city is added to the search history
function CreateHistoryButton () {
     
     $("#history").empty();
     for (var i = 0; i < cities.length; i++){
         
         // creating button and adding class "history-city"
         var a = $("<button>").addClass("history-city btn btn-secondary").attr("data-name", cities[i]);
         // adding Button text
         a.text(cities[i])
         // Appending the button to history div
         $("#history").append(a);
     }
 }


 // Submit Button
 var submitButton = $("#search-button");
 var searchQuery = "";
 submitButton.on("click", function(event){
     event.preventDefault();
     var searchQuery = $("#search-input").val().trim();
     cities.push(searchQuery);
     selectedCity = cities[cities.length-1]
     queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + selectedCity + "&cnt=50&appid=adafafa7b4ca2fd642e72286f02918a6";
     SearchForecast();
     CreateHistoryButton ()
 })
 
 // When a user click on a city in the search history they are again presented with current and future conditions for that city
 
 $("#history").on("click", "button", function(event){
     event.preventDefault();
     
     selectedCity = this.getAttribute("data-name");
     queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + selectedCity + "&cnt=50&appid=adafafa7b4ca2fd642e72286f02918a6";
     SearchForecast();
     
 } )
 
 CreateHistoryButton ()