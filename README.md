# 🌦️ Weather Dashboard

A responsive and interactive Weather Dashboard built using **HTML5, CSS3 and JavaScript (ES6)** that provides real-time weather information and forecasts for different cities using the Open-Meteo APIs.

The application allows users to search for any city and view its current weather conditions, hourly and weekly forecasts, air quality information, and sunrise and sunset timings through a modern and visually appealing interface.

## 📸 Screenshots

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/a9067bc6-70b3-45a2-b931-ade14da0642d"
    alt="Weather Dashboard Screenshot"
    width="800"
  />
</p>



*Main dashboard displaying current weather conditions, forecasts and additional weather information.*

## ✨ Features

### 🌡️ Current Weather Information

- Search weather information by city name.
- Display current temperature and weather conditions.
- View feels-like temperature.
- Display humidity, wind speed, atmospheric pressure and visibility.

### 🕒 Weather Forecasts

- **24-Hour Forecast:** View upcoming hourly temperatures and weather conditions.
- **7-Day Forecast:** View daily weather conditions along with maximum and minimum temperatures.
- Display precipitation probability.

### 🌅 Sunrise & Sunset

- Display sunrise and sunset timings.
- Interactive progress indicator showing the progress of the current daylight or nighttime period.

### 🌫️ Air Quality Index (AQI)

- Fetch current Air Quality Index information.
- Classify air quality into different categories such as Good, Moderate, Unhealthy and Hazardous.
- Display AQI using a dynamic circular progress indicator.

### 🎨 User Interface

- Dynamic weather icons based on weather conditions.
- Weather-condition-based animated backgrounds.
- Day/night-aware weather icons.
- Modern glassmorphism UI design.
- Smooth animations and hover effects.
- Responsive layout for different screen sizes.

## 🛠️ Technologies Used

| Technology                 | Purpose                                                  |
| -------------------------- | -------------------------------------------------------- |
| HTML5                      | Structure and layout of the dashboard                    |
| CSS3                       | Styling, Grid, Flexbox, animations and responsive design |
| JavaScript (ES6)           | Application logic, API integration and DOM manipulation  |
| Fetch API                  | Fetching data from external APIs                         |
| Async/Await                | Handling asynchronous API requests                       |
| Open-Meteo Geocoding API   | Converting city names into geographical coordinates      |
| Open-Meteo Forecast API    | Fetching current weather and forecast information        |
| Open-Meteo Air Quality API | Fetching Air Quality Index data                          |
| Font Awesome               | Weather icons and interface icons                        |

## ⚙️ Application Architecture

The application follows a simple frontend-based architecture.

**User Input → Geocoding API → Weather Forecast API & Air Quality API → Data Processing → DOM Manipulation → Dashboard Display**

### How It Works

**1. City Search**

The user enters a city name through the search bar. JavaScript event listeners capture the input when the user clicks the search button or presses Enter.

**2. Geocoding**

The Open-Meteo Geocoding API converts the entered city name into geographical coordinates (latitude and longitude).

**3. Weather Data Retrieval**

The coordinates are passed to the Open-Meteo Forecast API to retrieve:

- Current weather conditions.
- Hourly weather forecast.
- Daily weather forecast.
- Sunrise and sunset timings.

**4. Air Quality Retrieval**

The Open-Meteo Air Quality API is called using the same geographical coordinates to retrieve the current US Air Quality Index (US AQI).

**5. Data Processing**

JavaScript processes the received JSON responses, extracts the required weather parameters, maps numerical weather codes to readable descriptions and icons, and calculates forecast and visual indicators.

**6. Dynamic Dashboard Rendering**

The processed information is displayed using JavaScript DOM manipulation. Forecast cards are generated dynamically, while weather-related CSS classes control the dashboard's visual appearance.

## 📁 Project Structure

```text
Weather-Dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

| File           | Description                                                                               |
| -------------- | ----------------------------------------------------------------------------------------- |
| `index.html`   | Defines the dashboard structure and UI components.                                        |
| `style.css`    | Handles styling, responsive layouts, animations and visual effects.                       |
| `script.js`    | Contains the application logic, API integration, data processing and dynamic DOM updates. |
| `screenshots/` | Contains screenshots of the application for documentation.                                |

## 🚀 Installation and Setup

Follow these steps to run the project locally.

**1. Clone the repository**

```bash
git clone https://github.com/v-anand-raj/Weather-Dashboard.git
```

**2. Navigate to the project directory**

```bash
cd Weather-Dashboard
```

**3. Run the application**

Open `index.html` in your web browser.

Alternatively, use the Live Server extension in Visual Studio Code for local development.

No additional dependencies or backend setup are required.

## 🌐 APIs Used

This project uses the following Open-Meteo APIs:

**1. Geocoding API**

Converts city names into geographical coordinates.

Documentation: [https://open-meteo.com/en/docs/geocoding-api](https://open-meteo.com/en/docs/geocoding-api)

**2. Weather Forecast API**

Provides current weather conditions, hourly forecasts, daily forecasts and sunrise/sunset information.

Documentation: [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)

**3. Air Quality API**

Provides current air quality information, including the US AQI.

Documentation: [https://open-meteo.com/en/docs/air-quality-api](https://open-meteo.com/en/docs/air-quality-api)

## 🔮 Future Improvements

Some features that can be added to enhance the application include:

- Automatic location detection using the browser Geolocation API.
- City search suggestions and autocomplete.
- Weather alerts and severe weather notifications.
- Historical weather data and weather trends.
- Improved error handling and loading indicators.
- Search history and favorite locations.
- Better accessibility and keyboard navigation.

## 👨‍💻 Author

**Anand Raj**

Computer Science & Engineering

[GitHub](https://github.com/v-anand-raj)
