const APIKey = "59e0d5247e1028ae9dbf1071b7d55e24"

function currentWeather (city) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?" + city + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(weatherResponse) {
        console.log(weatherResponse)
    })
}