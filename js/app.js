document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('searchInput').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name!');
    }
});

function getWeather(city) {
    const apiKey = 'YOUR_API_KEY';  // Replace this with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherDetails');
    weatherContainer.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].main}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
    `;
}