const apiKey = "a6c38668880b325d45ff86ed836bb687";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    let response = await fetch(apiUrl + `${apiKey}&q=` + city);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {

        
        let data = await response.json();
        console.log(data)
        document.querySelector(".city").innerText = data.name;
        document.querySelector(".temp").innerText = Math.floor(data.main.temp) + "°C"
        document.querySelector(".humidity").innerText = data.main.humidity + "%";
        document.querySelector(".wind").innerText = data.wind.speed.toFixed(2) + "km/h";
        
        const weatherName = data.weather[0].main.toLowerCase();
        weatherIcon.src = `images/${weatherName}.png`;
        
        document.querySelector(".weather").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "/") {
        event.preventDefault();  // Prevent the browser’s default find/search behavior
        searchBox.focus();       // Focus your input box
    }
});