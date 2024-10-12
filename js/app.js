document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('searchInput').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name!');
    }
});