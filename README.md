<img src="https://img.shields.io/badge/Node-v18.8.0-green"/> <img src="https://img.shields.io/badge/Javascript-ES6-yellow"/> <img src="https://img.shields.io/badge/React-v18.2.0-blue"/> <img src="https://img.shields.io/badge/HTML-5-orange"/> <img src="https://img.shields.io/badge/CSS-3-purple"/> 
# Weather App

Project created with the aim of consuming the Open Weather API to obtain temperature values from any city in the world. To use this reaction web app, you will need to create your own credential on [Open Weather Map](https://openweathermap.org/api).

<img src="https://github.com/andre-moura/weather-app/blob/master/src/assets/img/index-weather.png?raw=true"/>

## Built using:

- Node
- Javascript
- React
- HTML
- CSS

## How to get started

Clone the repository
```bash
git clone https://github.com/andre-moura/weather-app.git
```

Download the libraries and dependencies
```bash
npm i
```

Replace the Open Weather API Key located on line 14 of [App.js](https://github.com/andre-moura/weather-app/blob/master/src/App.js)
```bash
function App() {
  const apiKey = ''
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("")
  const iconStyle = {
    width: "75px",
  }
```

Run the application in the development mode
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
