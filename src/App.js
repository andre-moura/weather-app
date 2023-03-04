import './App.css';
import { useState } from 'react'

import clearIcon from  '../src/assets/img/clear.png'
import rainyIcon from  '../src/assets/img/rainy.png'
import cloudyIcon from  '../src/assets/img/cloudy.png'
import snowIcon from  '../src/assets/img/snow.png'
import scatterCloudIcon from  '../src/assets/img/scatter-cloud.png'
import thunderIcon from  '../src/assets/img/thunderstorm.png'


function App() {
  const apiKey = process.env.REACT_APP_API_KEY ;
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  const iconStyle = {
    width: "75px"
  }

  const getWeather = (event) => {
    if (event.key === "Enter") {  
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          setCity("")
          console.log(weatherData)
          console.log(data)
        }
      )
    }
  }
  
  function WeatherIcon(main){
    switch (toString(main)) {
      case "Clouds":
        return cloudyIcon;
      case "Clear":
        return clearIcon;
      case "Rain":
        return rainyIcon;
      case "Snow":
        return snowIcon;
      case "Thunderstorm":
        return thunderIcon;
      default:
        return scatterCloudIcon;
    }
  }

  return (
    <div className="weather-container">
      <input className="weather-input" placeholder="Enter City..." onChange={e => setCity(e.target.value)} value={city} onKeyPress={getWeather}/>
      {
      typeof weatherData.main === "undefined" ? (
        <div>
          <p>
            Welcome to Weather App! Enter in a city to get the weather.
          </p>
        </div>
      ) : (
        <div className="weather-box">
          <div>
            <p className="city">{weatherData.sys.country}, {weatherData.name}</p>
            <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
            <img src={WeatherIcon(weatherData.weather[0].main)} style={iconStyle} alt={weatherData.weather[0].main}/>
            <div className="box-temp">
              <span className="kpi-temp">Maximum of {Math.round(weatherData.main.temp_max)}°C </span>
              <span className="kpi-temp">Minimum of {Math.round(weatherData.main.temp_min)}°C </span>
              <span className="kpi-temp">Feels like {Math.round(weatherData.main.feels_like)}°C </span>
            </div>
          </div>
        </div>
      )}

      {weatherData.cod === "404" ? (
        <p>
          City not found!
        </p>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;