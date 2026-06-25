// SEARCH ELEMENTS

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const currentDate = document.getElementById("current-date");
// WEATHER ELEMENTS
const aqiValue = document.getElementById("aqi-value");
const aqiStatus = document.getElementById("aqi-status");
const aqiProgress = document.getElementById("aqi-progress");
const leftLabel = document.getElementById("left-label");
const rightLabel = document.getElementById("right-label");
const leftSunIcon = document.getElementById("left-sun-icon");
const rightSunIcon = document.getElementById("right-sun-icon");
const sunIcon = document.getElementById("sun-icon");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const sunProgress = document.getElementById("sun-progress");
const feelsLike = document.getElementById("feels-like");
const precipitationElement = document.getElementById("precipitation");
const weeklyContainer = document.getElementById("weekly-container");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const forecastContainer = document.getElementById("forecast-container");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weather-condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");
// SEARCH BUTTON EVENT

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city !== "") {
    getWeather(city);
  }
});
// ENTER KEY SUPPORT
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city !== "") {
      getWeather(city);
    }
  }
});
function getWeatherDetails(code, isDay = true) {
  if (code === 0) {
    return {
      text: "Clear Sky",
      icon: isDay ? "fa-sun" : "fa-moon",
    };
  } else if (code === 1 || code === 2) {
    return {
      text: "Partly Cloudy",
      icon: isDay ? "fa-cloud-sun" : "fa-cloud-moon",
    };
  } else if (code === 3) {
    return {
      text: "Overcast",
      icon: "fa-cloud",
    };
  } else if (code === 45 || code === 48) {
    return {
      text: "Fog",
      icon: "fa-smog",
    };
  } else if (code >= 51 && code <= 67) {
    return {
      text: "Rainy",
      icon: "fa-cloud-rain",
    };
  } else if (code >= 71 && code <= 77) {
    return {
      text: "Snow",
      icon: "fa-snowflake",
    };
  } else if (code >= 80 && code <= 82) {
    return {
      text: "Rain Showers",
      icon: "fa-cloud-showers-heavy",
    };
  } else if (code === 95) {
    return {
      text: "Thunderstorm",
      icon: "fa-cloud-bolt",
    };
  } else if (code === 96 || code === 99) {
    return {
      text: "Severe Thunderstorm",
      icon: "fa-cloud-bolt",
    };
  } else {
    return {
      text: "Unknown",
      icon: "fa-circle-question",
    };
  }
}
// MAIN WEATHER FUNCTION
async function getWeather(city) {
  try {
    // =========================
    // STEP 1 -> GET COORDINATES
    // =========================
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();
    // CITY NOT FOUND
    if (!geoData.results) {
      alert("City not found");
      return;
    }
    // EXTRACT COORDINATES
    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;
    const cityFullName = geoData.results[0].name;
    // =========================
    // STEP 2 -> GET WEATHER
    // =========================

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day,surface_pressure,visibility,apparent_temperature,precipitation&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    // =========================
    // AQI API
    // =========================

    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi&timezone=auto`;
    const aqiResponse = await fetch(aqiUrl);
    const aqiData = await aqiResponse.json();

    // CHECK IF AQI EXISTS
    if (!aqiData.current || aqiData.current.us_aqi == null) {
      aqiValue.innerText = "--";
      aqiStatus.innerText = "Unavailable";
      return;
    }
    // EXTRACT AQI

    let aqi = aqiData.current.us_aqi;

    // LIMIT EXTREME VALUES

    aqi = Math.min(aqi, 500);

    // AQI STATUS

    let status = "Good";
    let color = "#4cd137";
    if (aqi <= 50) {
      status = "Good";
      color = "#4cd137";
    } else if (aqi <= 100) {
      status = "Moderate";
      color = "#fbc531";
    } else if (aqi <= 150) {
      status = "Unhealthy";
      color = "#e67e22";
    } else if (aqi <= 200) {
      status = "Bad";
      color = "#e84118";
    } else if (aqi <= 300) {
      status = "Very Unhealthy";
      color = "#8e44ad";
    } else {
      status = "Hazardous";
      color = "#6c3483";
    }
    // =========================
    // STEP 3 -> EXTRAT DATA
    // =========================

    const temp = weatherData.current.temperature_2m;
    const hum = weatherData.current.relative_humidity_2m;
    const wind = weatherData.current.wind_speed_10m;
    const weatherCode = weatherData.current.weather_code;
    const isDay = weatherData.current.is_day;
    const pressureValue = weatherData.current.surface_pressure;
    const visibilityValue = weatherData.current.visibility;
    const feelsLikeValue = weatherData.current.apparent_temperature;

    // =========================
    // SUNRISE / SUNSET
    // =========================
    const sunrise = weatherData.daily.sunrise[0];
    const sunset = weatherData.daily.sunset[0];
    const sunriseDate = new Date(sunrise);
    const sunsetDate = new Date(sunset);
    const now = new Date(`${weatherData.current.time}:00`);
    document.body.classList.remove("sunrise", "day", "sunset", "night");
    const currentHour = now.getHours();
    if (currentHour >= 5 && currentHour < 8) {
      document.body.classList.add("sunrise");
    } else if (currentHour >= 8 && currentHour < 17) {
      document.body.classList.add("day");
    } else if (currentHour >= 17 && currentHour < 20) {
      document.body.classList.add("sunset");
    } else {
      document.body.classList.add("night");
    }
    // =========================
    // STEP 4 -> WEATHER CONDITION
    // =========================

    const weatherInfo = getWeatherDetails(weatherCode, isDay);
    document.body.className = "";
    if (weatherInfo.text.includes("Rain")) {
      document.body.classList.add("rainy");
    } else if (weatherInfo.text.includes("Snow")) {
      document.body.classList.add("snowy");
    } else if (weatherInfo.text.includes("Thunder")) {
      document.body.classList.add("storm");
    } else if (weatherInfo.text.includes("Clear")) {
      document.body.classList.add("clear");
    } else {
      document.body.classList.add("cloudy");
    }

    // DATE
    const today = new Date();
    currentDate.innerText = today.toDateString();

    // =========================
    // STEP 5 -> UPDATE UI
    // =========================

    cityName.innerHTML = `<i class="fa-solid fa-location-dot"></i>${cityFullName}`;
    temperature.innerText = `${temp}°C`;
    humidity.innerText = `${hum}%`;
    windSpeed.innerText = `${wind} km/h`;
    pressure.innerText = `${pressureValue} hPa`;
    visibility.innerText = `${(visibilityValue / 1000).toFixed(1)} km`;
    feelsLike.innerText = `${feelsLikeValue}°C`;
    weatherCondition.innerText = weatherInfo.text;
    weatherIcon.className = `fa-solid ${weatherInfo.icon}`;

    // UPDATE AQI TEXT

    aqiValue.innerText = Math.round(aqi);
    aqiStatus.innerText = status;

    // CIRCLE PROGRESS

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const safeAqi = Math.min(aqi, 500);
    const aqiProgressValue = circumference - (safeAqi / 500) * circumference;
    aqiProgress.style.strokeDashoffset = aqiProgressValue;
    aqiProgress.style.stroke = color;
    aqiStatus.style.color = color;

    // =========================
    // STEP 6 -> HOURLY FORECAST
    // =========================
    // CLEAR OLD FORECAST

    forecastContainer.innerHTML = "";

    // GET HOURLY DATA

    const hourlyTimes = weatherData.hourly.time;
    const hourlyTemps = weatherData.hourly.temperature_2m;
    const hourlyCodes = weatherData.hourly.weather_code;
    const precipitationProbabilities =
      weatherData.hourly.precipitation_probability;

    // CURRENT TIME

    const currentTime = weatherData.current.time.slice(0, 13);

    // FIND CURRENT INDEX

    const startIndex = hourlyTimes.findIndex((time) =>
      time.startsWith(currentTime),
    );

    // SAFETY CHECK

    if (startIndex === -1) {
      console.log("Hour not found");
      return;
    }
    const precipitationChance = precipitationProbabilities[startIndex];
    precipitationElement.innerText = `${precipitationChance}%`;

    // GENERATE NEXT HOURS

    let forecastHTML = "";
    for (
      let i = startIndex;
      i < Math.min(startIndex + 24, hourlyTimes.length);
      i++
    ) {
      const time = hourlyTimes[i];
      const temp = hourlyTemps[i];
      const code = hourlyCodes[i];
      // EXTRACT HOUR
      const hour = time.slice(11, 16);

      // DETECT DAY/NIGHT
      const hourlyDate = new Date(time);
      const isHourlyDay = hourlyDate >= sunriseDate && hourlyDate <= sunsetDate;

      // WEATHER INFO
      const hourlyWeather = getWeatherDetails(code, isHourlyDay);

      // CARD
      const forecastCard = `

    <div class="forecast-card">
        <p>${hour}</p>
        <i class="fa-solid ${hourlyWeather.icon}"></i>
        <h3>${temp}°C</h3>
    </div>
  `;
      forecastHTML += forecastCard;
    }

    // FINAL RENDER
    forecastContainer.innerHTML = forecastHTML;

    // =========================
    // STEP 7 -> WEEKLY FORECAST
    // =========================

    // CLEAR OLD DATA
    weeklyContainer.innerHTML = "";

    // DAILY DATA
    const dailyTimes = weatherData.daily.time;
    const dailyCodes = weatherData.daily.weather_code;
    const maxTemps = weatherData.daily.temperature_2m_max;
    const minTemps = weatherData.daily.temperature_2m_min;

    // STORE ALL CARDS
    let weeklyHTML = "";

    // GENERATE 7 DAYS
    for (let i = 0; i < 7; i++) {
      const date = new Date(dailyTimes[i]);

      // DAY NAME
      const dayName = date.toLocaleDateString("en-US", {
        weekday: "long",
      });

      const code = dailyCodes[i];
      const weatherInfo = getWeatherDetails(code);
      const maxTemp = maxTemps[i];
      const minTemp = minTemps[i];

      // CARD
      const weeklyCard = `
    <div class="week-card">
        <p>${dayName}</p>
        <i class="fa-solid ${weatherInfo.icon}"></i>
        <h3>
            ${maxTemp}° / ${minTemp}°
        </h3>
    </div>
  `;

      // ADD CARD
      weeklyHTML += weeklyCard;
    }

    // FINAL RENDER
    weeklyContainer.innerHTML = weeklyHTML;

    // DAYTIME CHECK
    const isDayTime = now >= sunriseDate && now <= sunsetDate;
    let startTime;
    let endTime;
    let progress;
    // DAY MODE
    if (isDayTime) {
      leftLabel.innerText = "Sunrise";
      rightLabel.innerText = "Sunset";
      leftSunIcon.className = "fa-solid fa-sun";

      rightSunIcon.className = "fa-solid fa-moon";
      startTime = sunriseDate;
      endTime = sunsetDate;
      sunriseTime.innerText = sunriseDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      sunsetTime.innerText = sunsetDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const total = endTime - startTime;
      const passed = now - startTime;
      progress = (passed / total) * 100;
      sunIcon.className = "fa-solid fa-sun";
    }
    // NIGHT MODE
    else {
      leftLabel.innerText = "Sunset";
      rightLabel.innerText = "Sunrise";
      leftSunIcon.className = "fa-solid fa-moon";
      rightSunIcon.className = "fa-solid fa-sun";
      startTime = sunsetDate;
      endTime = new Date(sunriseDate);
      endTime.setDate(endTime.getDate() + 1);
      // FIX FOR AFTER MIDNIGHT
      let adjustedNow = new Date(now);
      if (adjustedNow < startTime) {
        adjustedNow.setDate(adjustedNow.getDate() + 1);
      }
      sunriseTime.innerText = sunsetDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      sunsetTime.innerText = endTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const total = endTime - startTime;
      const passed = adjustedNow - startTime;
      progress = (passed / total) * 100;
      sunIcon.className = "fa-solid fa-moon";
    }
    // LIMIT
    progress = Math.max(0, Math.min(100, progress));
    // UPDATE BAR
    sunProgress.style.width = `${progress}%`;
    sunIcon.style.left = `${progress}%`;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}
getWeather("Mumbai");
