let searchBtn = document.querySelector('#searchBtn');
let citySearch = document.querySelector('#citySearch');
let cityName = document.querySelector('#city');
let temp = document.querySelector('#temp')
let humidity = document.querySelector('#humidity');

function start() {

const APIKey = "59e0d5247e1028ae9dbf1071b7d55e24"

    function currentWeather (city) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

        fetch(queryURL)
            .then((Response) => Response.json())
            .then((data) => {
           
            console.log(data),
            
            cityName.innerText = citySearch.value
            temp.innerText = "Temp: " + data.main.temp
            humidity.innerText = "Humidity: " + data.main.humidity
            }
            );

    }

    searchBtn.addEventListener("click", 
    function(){
        currentWeather(citySearch.value
    )});
}


start()
/* 
target value present in input form. current weather takes in values and console.log
when search button clicked runs currentweather. cw takes in citysrea.value
inside current vle console.log currentwt.value

$(document).ready(function(){
  $("button").click(function(){
    $("p").hide();
  });
});
*/