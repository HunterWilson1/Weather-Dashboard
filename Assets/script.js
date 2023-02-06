let searchBtn = document.querySelector('#searchBtn');
let citySearch = document.querySelector('#citySearch');
let cityName = document.querySelector('#city');
let temp = document.querySelector('#temp')
let humidity = document.querySelector('#humidity');
let windSpeed = document.querySelector('#wind-spd')
let weatherIcon = document.querySelector('#weatherIcon')
let forecastContainer = document.querySelector('#forecast-container')



function start() {

const APIKey = "59e0d5247e1028ae9dbf1071b7d55e24"

    function currentWeather (city) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    
        fetch(queryURL)
            .then((Response) => Response.json())
            .then((data) => {
           
            console.log(data)
        
            cityName.innerText = citySearch.value
            weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
            temp.innerText = "Temp: " + data.main.temp
            humidity.innerText = "Humidity: " + data.main.humidity
            windSpeed.innerText = "Wind Speed: " + data.wind.speed
            }
            );

    }

    function getFiveDayForecast (cast) {
      let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cast + "&units=imperial&appid=" + APIKey;
        fetch(queryURL)
         .then((Response) => Response.json())
         .then((data) => {
          console.log(data)

          for (let i = 0; i < data.list.length; i+=8) {
            console.log(data.list[i])
          
          var h2 = document.createElement("h2")
          h2.innerText = data.city.name
          forecastContainer.appendChild(h2)
          }
         }) 
    }


    
    searchBtn.addEventListener("click", 
    function(){
        currentWeather(citySearch.value)
        getFiveDayForecast(citySearch.value)
      });
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