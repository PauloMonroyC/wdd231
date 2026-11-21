const API_KEY = "588389a7f5dc8889740a49bded7e5e65";
const LAT = -12.05;
const LON = -77.04;

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const weatherNow = document.querySelector('.weather-now');
const forecastList = document.querySelector('#forecast');


async function getCurrentWeather() {
  try {
    const response = await fetch(currentUrl);
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();

    currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDesc.textContent = data.weather[0].description;

    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    weatherIcon.removeAttribute('hidden');
  } catch (error) {
    console.error(error);
    weatherDesc.textContent = 'Weather data is not available right now.';
  }
}


async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();

        const days = data.list
        .filter(item => item.dt_txt.includes('12:00:00'))
        .slice(0, 3);

        days.forEach(item => {
            const li = document.createElement('li');
            const day = new Date(item.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'long',
                timeZone: 'UTC'
            });
            li.textContent = `${day}: ${Math.round(item.main.temp)}°C`;
            forecastList.appendChild(li);
        });
    }   catch (error) {
        console.error(error);
    }
}

getCurrentWeather();
getForecast();