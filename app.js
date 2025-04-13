const apiKey = "252e8f1cfcf78ae2430bc3786251e818";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const animation = document.querySelector(".loading");
const weatherBox = document.querySelector(".weather");

async function checkWeather(city) {
    animation.classList.add("show");
    weatherBox.classList.remove("show");
    document.querySelector(".error").style.display = "none";

    const fetchPromise = fetch(apiUrl + city + `&appid=${apiKey}`);
    const delay = new Promise(resolve => setTimeout(resolve, 1000));
    const [response] = await Promise.all([fetchPromise, delay]);

    if (response.status == 404) {
        animation.classList.remove("show");
        document.querySelector(".error").style.display = "block";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloudy.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rainy.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/sun-rain.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/foggy.png";
        }

        weatherBox.classList.add("show");
        document.querySelector(".weather").style.display = "block";   
        document.querySelector(".error").style.display = "none"; 
    }

    animation.classList.remove("show");
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

