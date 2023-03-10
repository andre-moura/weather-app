import './App.css';
import { useState, useEffect } from 'react'
import Geolocation from 'react-geolocation';

import clearIcon from '../src/assets/img/clear.png'
import rainyIcon from '../src/assets/img/rainy.png'
import cloudyIcon from '../src/assets/img/cloudy.png'
import snowIcon from '../src/assets/img/snow.png'
import scatterCloudIcon from '../src/assets/img/scatter-cloud.png'
import thunderIcon from '../src/assets/img/thunderstorm.png'


function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseURL = `https://api.openweathermap.org/data/2.5/weather`

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
          const apiUrl = baseURL +`?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
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
      const apiUrl = baseURL +`?q=${typedCity}&appid=${apiKey}&units=metric`;
      fetch(apiUrl).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          setCountry(data.sys.country);
          setCity(data.name);
          console.log(data)
        }
      )
    }
  }

  // function WeatherIcon(main) {
  //   switch (toString(main)) {
  //     case 'Clouds':
  //       return cloudyIcon;
  //     case 'Clear':
  //       return clearIcon;
  //     case 'Rain':
  //       return rainyIcon;
  //     case 'Snow':
  //       return snowIcon;
  //     case 'Thunderstorm':
  //       return thunderIcon;
  //     default:
  //       return scatterCloudIcon;
  //   }
  // }

  return (
    <div className='weather-container'>
      <input className='weather-input' placeholder='Enter City...' onChange={e => setTypedCity(e.target.value)} value={typedCity} onKeyDown={getWeather} />
      <h1>{currentTime}</h1>
      <h3>{currentDate}</h3>
      {
        typeof weatherData.main === 'undefined' ? (
          <div>
            <p>
              Welcome to Weather App! Enter in a city to get the weather.
            </p>
          </div>
        ) : (
          <div className='container'>
            <div className='days-container'>
              <div className='box'>
                <div className='day'>Mon</div>
                <div className='min'>Min - 23ºC</div>
                <div className='max'>Max - 23ºC</div>
              </div>
              <div className='box'>
                <div className='day'>Mon</div>
                <div className='min'>Min - 23ºC</div>
                <div className='max'>Max - 23ºC</div>
              </div>
              <div className='box'>
                <div className='day'>Mon</div>
                <div className='min'>Min - 23ºC</div>
                <div className='max'>Max - 23ºC</div>
              </div>
              <div className='box'>
                <div className='day'>Mon</div>
                <div className='min'>Min - 23ºC</div>
                <div className='max'>Max - 23ºC</div>
              </div>
              <div className='box'>
                <div className='day'>Mon</div>
                <div className='min'>Min - 23ºC</div>
                <div className='max'>Max - 23ºC</div>
              </div>
              <div className='box'>
                <div className='day'>Mon</div>
                <div className='min'>Min - 23ºC</div>
                <div className='max'>Max - 23ºC</div>
              </div>
              <div className='box'>
                <div className='day'>Mon</div>
                <div className='min'>Min - 23ºC</div>
                <div className='max'>Max - 23ºC</div>
              </div>
            </div>
          </div>
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