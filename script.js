const button = document.querySelector(".button");
const input = document.querySelector(".Search");
const result = document.getElementById("result");

button.addEventListener("click", getWeather);

async function getWeather() {
    let city = input.value;

    if (city === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    let apiKey = "37c77956a8f187701feaaaf64b2f6b87"; // OpenWeatherMap API key
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod === "404") {
            result.innerHTML = "City not found";
            return;
        }

       result.innerHTML = `
    <h2>${data.name}</h2>

    <div class="weather-cards">

        <div class="card">
            <p>🌡️ Temperature</p>
            <h3>${data.main.temp} °C</h3>
        </div>

        <div class="card">
            <p>🙂 Feels Like</p>
            <h3>${data.main.feels_like} °C</h3>
        </div>

        <div class="card">
            <p>💧 Humidity</p>
            <h3>${data.main.humidity}%</h3>
        </div>

        <div class="card">
            <p>🌬️ Wind Speed</p>
            <h3>${data.wind.speed} m/s</h3>
        </div>

        <div class="card">
            <p>☁ Cloud Coverage</p>
            <h3>${data.clouds.all}%</h3>
        </div>

        <div class="card">
            <p>🌤️ Weather</p>
            <h3>${data.weather[0].main}</h3>
        </div>

    </div>
`;

    } catch (error) {
        result.innerHTML = "Something went wrong";
    }
}