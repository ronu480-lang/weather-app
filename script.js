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
            <p>🌡️ Temperature: ${data.main.temp} °C</p>
            <p>🙂 Feels Like: ${data.main.feels_like} °C</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
            <p>☁️ Cloud Coverage: ${data.clouds.all}%</p>
            <p>🌤️ Weather: ${data.weather[0].main}</p>
        `;

    } catch (error) {
        result.innerHTML = "Something went wrong";
    }
}