import './App.css';
import { useState, useEffect } from 'react'
import WeatherSlider from './components/WeatherSlider'
import Geolocation from 'react-geolocation';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseURL = `https://api.openweathermap.org/data/2.5/forecast?`

  const [weatherData, setWeatherData] = useState([{}]);
  const [weatherForecast, setWeatherForecast] = useState([{}]);
  const options = { weekday: 'long', day: 'numeric', month: 'short' };

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const [typedCity, setTypedCity] = useState('');

  const getWeather = (event) => {
    if (event.key === 'Enter') {
      const apiKey = process.env.REACT_APP_API_KEY;
      const apiUrl = baseURL + `q=${typedCity}&appid=${apiKey}&units=metric`;
      fetch(apiUrl).then(
        response => response.json()
      ).then(
        data => {
          const groupedData = data.list.reduce((acc, current) => {
            const date = new Date(current.dt_txt).toDateString(); // create new Date object and convert to string
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(current);
            return acc;
          }, {});

          // use map() to extract the relevant data for each day
          const relevantData = Object.keys(groupedData).map((date) => {
            const dayData = groupedData[date];
            const minTemp = Math.min(...dayData.map((d) => d.main.temp_min));
            const maxTemp = Math.max(...dayData.map((d) => d.main.temp_max));
            const weatherDescription = dayData[0].weather[0].description;
            const icon = dayData[0].weather[0].icon;
            return {
              date,
              minTemp,
              maxTemp,
              weatherDescription,
              icon,
            };
          });
          setWeatherForecast(relevantData)
          setWeatherData(data)
          console.log(data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const apiUrl = baseURL + `lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
          fetch(apiUrl)
            .then((response) => response.json())
            .then(data => {
              const groupedData = data.list.reduce((acc, current) => {
                const date = new Date(current.dt_txt).toDateString(); // create new Date object and convert to string
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(current);
                return acc;
              }, {});

              // use map() to extract the relevant data for each day
              const relevantData = Object.keys(groupedData).map((date) => {
                const dayData = groupedData[date];
                const minTemp = Math.min(...dayData.map((d) => d.main.temp_min));
                const maxTemp = Math.max(...dayData.map((d) => d.main.temp_max));
                const weatherDescription = dayData[0].weather[0].description;
                const icon = dayData[0].weather[0].icon;
                return {
                  date,
                  minTemp,
                  maxTemp,
                  weatherDescription,
                  icon,
                };
              });
              setWeatherForecast(relevantData)
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
      const minutes = currentDate.getMinutes()
        .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
      setCurrentDate((new Date().toLocaleDateString('en-US', options)).toString());
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='weather-container'>
        <input className='weather-input' placeholder='Search City...' onChange={e => setTypedCity(e.target.value)} value={typedCity} onKeyDown={getWeather} />
        {
          typeof weatherData.list !== 'undefined' ? (
            <div>
              <h4>{weatherData.city.country}, {weatherData.city.name}</h4>
              <h1>{Math.round(weatherData.list[0].main.temp)}&#8451;</h1>
              <div>
                <img
                  src={`https://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png`}
                  alt={weatherData.list[0].weather[0].description}
                  width={50}
                />
              </div>
              <h4>{currentDate}</h4>
              <h4>{currentTime}</h4>
            </div>
          )
            :
            (<div></div>)
        }
      </div>

      {
        typeof weatherForecast[0].minTemp === 'undefined' ? (
          <div>
            <p className='welcome-message'>
              Welcome to Weather App! Enter in a city to get the weather.
            </p>
          </div>
        ) : (
          <div className='analysis-container'>
            <h3>Week Forecast</h3>
            <WeatherSlider forecast={weatherForecast} />
            <h3>Today's Analysis</h3>
            <div className='container-data'>
              <div className='today-card'>
                <span className='tag'>Visibility</span>
                <span>{weatherData.list[0].visibility}</span>
              </div>
              <div className='today-card'>
                <span>Wind Speed</span>
                <span>{weatherData.list[0].wind.speed}</span>
              </div>
              <div className='today-card'>
                <span>Humidity</span>
                <span>{weatherData.list[0].main.humidity}%</span>
              </div>
              <div className='today-card'>
                <span>Pressure</span>
                <span>{weatherData.list[0].main.pressure}</span>
              </div>
            </div>
          </div>
        )}

      {weatherData.cod === '404' ? (
        <div>
          City not found!
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;