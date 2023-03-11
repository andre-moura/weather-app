import './App.css';
import { useState, useEffect } from 'react'
import WeatherSlider from './components/WeatherSlider'
import Geolocation from 'react-geolocation';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseURL = `https://api.openweathermap.org/data/2.5/forecast`

  const [weatherData, setWeatherData] = useState([{}]);
  const options = { weekday: 'long', day: 'numeric', month: 'short' };

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const [typedCity, setTypedCity] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const apiUrl = baseURL + `?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              setWeatherData(data)
              console.log(data)
            })
            .catch((error) => console.log(error));
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const hours = currentDate.getHours() % 12 || 12;
      const minutes = currentDate.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
      setCurrentDate((new Date().toLocaleDateString('en-US', options)).toString());
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const getWeather = (event) => {
    if (event.key === 'Enter') {
      const apiKey = process.env.REACT_APP_API_KEY;
      const apiUrl = baseURL + `?q=${typedCity}&appid=${apiKey}&units=metric`;
      fetch(apiUrl).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          // setCountry(data.city.country);
          // setCity(data.city.name);
          console.log(data.dt_txt)
          console.log(data.list)
          // console.log(data)
          // console.log(data)
        }
      )
    }
  }

  return (
    <div>
      <div className='weather-container'>
        <input className='weather-input' placeholder='Enter City...' onChange={e => setTypedCity(e.target.value)} value={typedCity} onKeyDown={getWeather} />
        <h1>{currentTime}</h1>
        <h3>{currentDate}</h3>
      </div>

        {
          typeof weatherData.list === 'undefined' ? (
            <div>
              <p>
                Welcome to Weather App! Enter in a city to get the weather.
              </p>
            </div>
          ) : (
            <WeatherSlider forecast={weatherData.list}/>
          )}

        {weatherData.cod === '404' ? (
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