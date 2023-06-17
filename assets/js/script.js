const apiKey = '3a2a40ee9e2d2b266f15b66f682f266f';
const currentDay = dayjs().format('MMMM DD, YYYY');
const cityEl = document.querySelector('#city');
const iconEl = document.querySelector("#icon");
const tempEl = document.querySelector("#temp");
const windEl = document.querySelector("#wind");
const humidityEl = document.querySelector("#humidity");
const searchEl = document.querySelector('#search');
const searchBtn = document.querySelector('.btn');
const searchHistoryEl = document.querySelector('#cities');
let cityArray = [];

function displayHistory() {
    localStorage.getItem('cityArray',JSON.stringify(cityArray));
    if (cityArray.length > 0) {
        JSON.parse(localStorage.getItem(cityArray))
    }
    searchedCities();
}
displayHistory();

function userInput(city) {
    localStorage.getItem("cityArray", JSON.stringify(cityArray));
    if (cityArray.length > 0) {
        JSON.parse(localStorage.getItem(cityArray))
        cityArray.push(city);
    } else {
        cityArray = [city];
    }
    localStorage.setItem("searchHistory", JSON.stringify(cityArray));
}


function searchedCities(userInput) {
    searchHistoryEl.innerHTML = "";
    for (let i = 0; i < cityArray.length; i++) {
        let city = cityArray[i];
        let cityBtn = document.createElement("button");
        cityBtn.setAttribute("type", "button");
        cityBtn.classList.add('history-btn', 'btn-history');
        cityBtn.setAttribute('data-search', cityArray[i]);
        cityBtn.innerHTML = city
        cityBtn.addEventListener("click", function () {
            city = cityBtn.innerHTML.trim();

            let currentWeatherURL =
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
            fetch(currentWeatherURL)
                .then(data => data.json())
                .then(res => {
                    console.log(res);
                    cityEl.textContent = `${city} (${currentDay})`;
                    tempEl.textContent = `Temperature: ${res.main.temp} °F`;
                    windEl.textContent = `Wind: ${res.wind.speed} MPH`;
                    humidityEl.textContent = `Humidity: ${res.main.humidity} %`;



                    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=${apiKey}&units=imperial`)
                        .then(data => data.json())
                        .then(res => {
                            console.log(res);
                            $("#city-1").text(`${city} (${dayjs().add(1, "days").format("MMMM DD, YYYY")}) `);
                            document.querySelector("#icon1").src = `http://openweathermap.org/img/wn/${res.list[3].weather[0].icon}@2x.png`
                            $("#temp-1").text(`Temp: ${res.list[3].main.temp} °F`);
                            $("#wind-1").text(`Wind: ${res.list[3].wind.speed} MPH`);
                            $("#humidity-1").text(`Humidity: ${res.list[3].main.humidity} %`);

                            $("#city-2").text(`${city} (${dayjs().add(2, "days").format("MMMM DD, YYYY")})`);
                            document.querySelector("#icon2").src = `http://openweathermap.org/img/wn/${res.list[11].weather[0].icon}@2x.png`
                            $("#temp-2").text(`Temp: ${res.list[11].main.temp} °F`);
                            $("#wind-2").text(`Wind: ${res.list[11].wind.speed} MPH`);
                            $("#humidity-2").text(`Humidity: ${res.list[11].main.humidity} %`);

                            $("#dcity-3").text(`${city} (${dayjs().add(3, "days").format("MMMM DD, YYYY")})`);
                            document.querySelector("#icon3").src = `http://openweathermap.org/img/wn/${res.list[19].weather[0].icon}@2x.png`
                            $("#temp-3").text(`Temp: ${res.list[19].main.temp} °F`);
                            $("#wind-3").text(`Wind: ${res.list[19].wind.speed} MPH`);
                            $("#humidity-3").text(`Humidity: ${res.list[19].main.humidity} %`);

                            $("#city-4").text(`${city} (${dayjs().add(4, "days").format("MMMM DD, YYYY")})`);
                            document.querySelector("#icon4").src = `http://openweathermap.org/img/wn/${res.list[27].weather[0].icon}@2x.png`
                            $("#temp-4").text(`Temp: ${res.list[27].main.temp} °F`);
                            $("#wind-4").text(`Wind: ${res.list[27].wind.speed} MPH`);
                            $("#humidity-4").text(`Humidity: ${res.list[27].main.humidity} %`);

                            $("#city-5").text(`${city} (${dayjs().add(5, "days").format("MMMM DD, YYYY")})`);
                            document.querySelector("#icon5").src = `http://openweathermap.org/img/wn/${res.list[35].weather[0].icon}@2x.png`
                            $("#temp-5").text(`Temp: ${res.list[35].main.temp} °F`);
                            $("#wind-5").text(`Wind: ${res.list[35].wind.speed} MPH`);
                            $("#humidity-5").text(`Humidity: ${res.list[35].main.humidity} %`);
                        })
                })
            searchedCities();
        })
        searchHistoryEl.appendChild(cityBtn)
    }
}

function handleSearchHistoryClick(e) {
    const btn = e.target;
    const cityName = btn.getAttribute('data-search');

}
searchHistoryEl.addEventListener("click", handleSearchHistoryClick);

function getWeather(event, city) {
    event.preventDefault();
    city = searchEl.value.trim();
    userInput(city)

    let currentWeatherURL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(currentWeatherURL)
        .then(data => data.json())
        .then(res => {
            console.log(res);
            cityEl.textContent = `${city} (${currentDay})`;
            tempEl.textContent = `Temp: ${res.main.temp} °F`;
            windEl.textContent = `Wind: ${res.wind.speed} MPH`;
            humidityEl.textContent = `Humidity: ${res.main.humidity} %`;

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${res.coord.lat}&lon=${res.coord.lon}&appid=${apiKey}&units=imperial`)
                .then(data => data.json())
                .then(res => {
                    console.log(res);
                    $("#city-1").text(`${city} (${dayjs().add(1, "days").format("MMMM DD, YYYY")})`);
                    document.querySelector("#icon1").src = `http://openweathermap.org/img/wn/${res.list[3].weather[0].icon}@2x.png`
                    $("#temp-1").text(`Temp: ${res.list[3].main.temp} °F`);
                    $("#wind-1").text(`Wind: ${res.list[3].wind.speed} MPH`);
                    $("#humidity-1").text(`Humidity: ${res.list[3].main.humidity} %`);

                    $("#city-2").text(`${city} (${dayjs().add(2, "days").format("MMMM DD, YYYY")})`);
                    document.querySelector("#icon2").src = `http://openweathermap.org/img/wn/${res.list[11].weather[0].icon}@2x.png`
                    $("#temp-2").text(`Temp: ${res.list[11].main.temp} °F`);
                    $("#wind-2").text(`Wind: ${res.list[11].wind.speed} MPH`);
                    $("#humidity-2").text(`Humidity: ${res.list[11].main.humidity} %`);

                    $("#city-3").text(`${city} (${dayjs().add(3, "days").format("MMMM DD, YYYY")})`);
                    document.querySelector("#icon3").src = `http://openweathermap.org/img/wn/${res.list[19].weather[0].icon}@2x.png`
                    $("#temp-3").text(`Temp: ${res.list[19].main.temp} °F`);
                    $("#wind-3").text(`Wind: ${res.list[19].wind.speed} MPH`);
                    $("#humidity-3").text(`Humidity: ${res.list[19].main.humidity} %`);

                    $("#city-4").text(`${city} (${dayjs().add(4, "days").format("MMMM DD, YYYY")})`);
                    document.querySelector("#icon4").src = `http://openweathermap.org/img/wn/${res.list[27].weather[0].icon}@2x.png`
                    $("#temp-4").text(`Temp: ${res.list[27].main.temp} °F`);
                    $("#wind-4").text(`Wind: ${res.list[27].wind.speed} MPH`);
                    $("#humidity-4").text(`Humidity: ${res.list[27].main.humidity} %`);

                    $("#city-5").text(`${city} (${dayjs().add(5, "days").format("MMMM DD, YYYY")})`);
                    document.querySelector("#icon5").src = `http://openweathermap.org/img/wn/${res.list[35].weather[0].icon}@2x.png`
                    $("#temp-5").text(`Temp: ${res.list[35].main.temp} °F`);
                    $("#wind-5").text(`Wind: ${res.list[35].wind.speed} MPH`);
                    $("#humidity-5").text(`Humidity: ${res.list[35].main.humidity} %`);



                })
        })
        searchedCities();
}
searchBtn.addEventListener("click", getWeather);

