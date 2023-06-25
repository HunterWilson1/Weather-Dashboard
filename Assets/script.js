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
  
        var currentContainer = document.getElementById("current-container");
        currentContainer.innerHTML = `
          <div class="col-lg-9">
            <div class="row mr-0 justify-content-end">
              <div class="col-lg-11 card m-3" id="today-forecast">
                <div class="card-body">
                  <h3 id="city" class="city-name align-middle">${city}</h3>
                  <img id="weatherIcon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" />
                  <p id="weather">${data.weather[0].description}</p>
                  <p id="temp">Temp: ${data.main.temp}</p>
                  <p id="humidity">Humidity: ${data.main.humidity}</p>
                  <p id="wind-spd">Wind Speed: ${data.wind.speed}</p>
                </div>
              </div>
            </div>
          </div>
        `;
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
  
        // Clear the forecastContainer before appending new forecast cards
        forecastContainer.innerHTML = "";
  
        // Create a parent container with the 'row' class
        var rowContainer = document.createElement("div");
        rowContainer.classList = "row justify-content-center";
  
        for (let i = 0; i < data.list.length; i += 8) {
          console.log(data.list[i]);
  
          var card = document.createElement("div");
          card.classList =
            "col-md-2 forecast bg-primary text-white m-2 rounded d-flex align-items-center justify-content-center";
  
          var cardContent = document.createElement("div");
          cardContent.classList = "card-content text-center";
  
          var h2 = document.createElement("h2");
          var p = document.createElement("p");
          var img = document.createElement("img");
  
          h2.innerText = data.city.name;
  
          img.src =
            "http://openweathermap.org/img/w/" +
            data.list[i].weather[0].icon +
            ".png";
  
          p.innerText =
            "Temp: " +
            data.list[i].main.temp +
            "\n" +
            "Humidity: " +
            data.list[i].main.humidity +
            "\n" +
            "Wind Speed: " +
            data.list[i].wind.speed;
  
          img.classList = "card-icon";
          h2.classList = "card-title";
          p.classList = "card-text";
  
          cardContent.appendChild(h2);
          cardContent.appendChild(img);
          cardContent.appendChild(p);
  
          card.appendChild(cardContent);
  
          // Append each card to the row container
          rowContainer.appendChild(card);
        }
  
        // Append the row container to the forecast container
        forecastContainer.appendChild(rowContainer);
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
   // currentWeather(search);
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
