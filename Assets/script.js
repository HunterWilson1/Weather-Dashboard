let searchBtn = document.querySelector("#searchBtn");
let citySearch = document.querySelector("#citySearch");
let cityName = document.querySelector("#city");
let temp = document.querySelector("#temp");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-spd");
let weatherIcon = document.querySelector("#weatherIcon");
let forecastContainer = document.querySelector("#forecast-container");
let history = document.getElementById("history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
let clearH = document.getElementById("clear-H")

function start() {
  const APIKey = "59e0d5247e1028ae9dbf1071b7d55e24";

  function currentWeather(city) {
    let queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      APIKey;

    fetch(queryURL)
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);

        cityName.innerText = citySearch.value;
        weatherIcon.setAttribute(
          "src",
          "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        );
        temp.innerText = "Temp: " + data.main.temp;
        humidity.innerText = "Humidity: " + data.main.humidity;
        windSpeed.innerText = "Wind Speed: " + data.wind.speed;
      });
  }

  function getFiveDayForecast(cast) {
    let queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cast +
      "&units=imperial&appid=" +
      APIKey;
    fetch(queryURL)
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);

        for (let i = 0; i < data.list.length; i += 8) {
          console.log(data.list[i]);

          var h2 = document.createElement("h2");
          var p = document.createElement("p");
          var img = document.createElement("img");

          forecastContainer.classList =
            "row col-md-2 forecast bg-primary text-white m-2 rounded";

          h2.innerText = data.city.name;

          img.src = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png"

          p.innerText =
            "Temp: " +
            data.list[i].main.temp +
            "\n" +
            "Humidity: " +
            data.list[i].main.humidity +
            "\n" +
            "Wind Speed: " +
            data.list[i].wind.speed;
          
          img.classList = "card-body text-center";
          h2.classList = "card-body text-center";
          p.classList = "card-body text-center";

          forecastContainer.appendChild(h2);
          forecastContainer.appendChild(img);
          forecastContainer.appendChild(p);
        }
      });
  }

  //event listener for search button
  searchBtn.addEventListener("click", function () {
    //variable so that search equals the value of the input
    const search = citySearch.value;
    //calls weather function
    currentWeather(search);
    //pushes the value of search into the searchHistory array
    searchHistory.push(search);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    //calling the functions
    currentWeather(search);
    getFiveDayForecast(search);
    renderSearchHistory();
  });
  
  clearH.addEventListener("click", function () {
    localStorage.clear();
    searchHistory = [];
    renderSearchHistory();
})

  function renderSearchHistory() {
    history.innerHTML = "";
    //loop through searchHistory array
    for (let i = 0; i < searchHistory.length; i++) {
      //creates element for the searches
      const hContent = document.createElement("input");
      //adds attributes to the element
      hContent.setAttribute("type", "text");
      hContent.setAttribute("readonly", true);
      hContent.setAttribute("class", "form-control d-block bg-white");
      hContent.setAttribute("value", searchHistory[i]);
      //runs current weather based off of clicking search
      hContent.addEventListener("click", function () {
        currentWeather(hContent.value);
      });
      history.append(hContent);
    }
  }


}

start();
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
