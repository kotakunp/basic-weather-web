const apiKey = "252e8f1cfcf78ae2430bc3786251e818";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const animation = document.querySelector(".loading");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather(city){

    animation.style.display = "block";
    weather.style.display = "none";
    error.style.display = "none";

    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none"; 
        animation.style.display = "none";         
    }else{
        var data = await response.json();

        console.log(data);
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/cloudy.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rainy.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/sun-rain.png";
        }
        else if(data.weather[0].main == "mist"){
            weatherIcon.src = "images/foggy.png";
        }

        animation.style.display = "none";    
    
        document.querySelector(".weather").style.display = "block";   
        document.querySelector(".error").style.display = "none";     
    }
   

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);

})

