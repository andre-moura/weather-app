<img src="https://img.shields.io/badge/Node-v18.8.0-green"/> <img src="https://img.shields.io/badge/Javascript-ES6-yellow"/> <img src="https://img.shields.io/badge/React-v18.2.0-blue"/> <img src="https://img.shields.io/badge/HTML-5-orange"/> <img src="https://img.shields.io/badge/CSS-3-purple"/> 
# Weather App

This project aims to utilize the Open Weather API to fetch temperature data for any city across the globe. To access this web application, you will need to create your own set of credentials using [Open Weather Map](https://openweathermap.org/api).

<img src="https://github.com/andre-moura/weather-app/blob/master/src/assets/img/index-weather-2.png?raw=true"/>

# How to get started

**Clone the repository**
```bash
git clone https://github.com/andre-moura/weather-app.git
```

**Download the libraries and dependencies**
```bash
npm i
```


## Set your API Token and start application

**Windows (cmd.exe)**
```bash
set "REACT_APP_API_KEY=YourSecretKey" && npm start
```

**Windows (Powershell)**
```bash
($env:REACT_APP_API_KEY = "YourSecretKey") -and (npm start)
```

**Linux, macOS (Bash)**
```bash
REACT_APP_API_KEY=YourSecretKey npm start
```
**Open [http://localhost:3000](http://localhost:3000) to view it in your browser.**
