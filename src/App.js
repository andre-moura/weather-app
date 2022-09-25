import './App.css';
import { useState } from 'react'

function App() {


  const apiKey = ''
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("")
  
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
  
  return (
    <div className="weather-container">
      <input className="weather-input" placeholder="Enter City..." onChange={e => setCity(e.target.value)} value={city} onKeyPress={getWeather}/>
      {
      typeof weatherData.main === "undefined" ? (
        <div>
          <p>
            Welcome to Weather World! Enter in a city to get the weather.
          </p>
        </div>
      ) : (
        <div>
          <p>{weatherData.name}</p>
          <p>{Math.round(weatherData.main.temp)}°C</p>
          <p>{weatherData.weather[0].main}</p>
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