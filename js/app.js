
//JS for menu icon to toggle
// document.getElementById('menuIcon').addEventListener('click', toggleMenu);

// function toggleMenu() {
//     const sideMenu = document.getElementById('sideMenu');
//     const menuIcon = document.getElementById('menuIcon');

//     sideMenu.classList.toggle('show');  // Toggle the visibility of the menu
//     menuIcon.classList.toggle('open');  // Toggle the color change of the menu button
// }


//Scroll Banner
window.addEventListener('DOMContentLoaded', () => {
    const bannerContent = document.querySelector('.banner-content');
    
    // Clone the banner content and append it for seamless scrolling
    const clone = bannerContent.cloneNode(true);
    bannerContent.parentNode.appendChild(clone);
});


document.getElementById('menuIcon').addEventListener('click', toggleMenu);

function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuIcon = document.getElementById('menuIcon');

    // Toggle the menu's visibility
    sideMenu.classList.toggle('show');

    // Toggle the icon based on the menu's visibility
    if (sideMenu.classList.contains('show')) {
        menuIcon.src = "icons/menu-open.svg";  // Set to open icon
    } else {
        menuIcon.src = "icons/menu-closed.svg"; // Set to closed icon
    }
}



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



// Fetch city images for the slideshow
function getCityHighlights(city) {
    const apiKey = 'YOUR_UNSPLASH_API_KEY';  // Replace this with your Unsplash API key
    const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKey}&per_page=5`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                displaySlideshow(data.results);
            } else {
                alert('No images found for this city');
            }
        })
        .catch(error => {
            console.error('Error fetching city images:', error);
        });
}

// Display the slideshow
function displaySlideshow(images) {
    const slideshow = document.getElementById('slideshow');
    slideshow.innerHTML = ''; // Clear previous images

    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.urls.regular;
        img.alt = image.alt_description;
        if (index === 0) img.classList.add('active'); // Make the first image visible
        slideshow.appendChild(img);
    });

    startSlideshow();
}


//For slideshow timing
function startSlideshow() {
    const slides = document.querySelectorAll('.slideshow img');
    let currentIndex = 0;

    setInterval(() => {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    }, 3000); // Change image every 3 seconds
}



