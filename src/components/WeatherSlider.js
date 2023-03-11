import React, { useState, useEffect } from "react";

const WeatherSlider = ({ forecast }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: "0"
  };

  return (
    <div>
      <h1>Weather Forecast for</h1>
      {/* <Slider {...settings}> */}
        {forecast.map((data, index) => (
          <div key={index}>
            <h2>{new Date(data.dt_txt).toLocaleDateString()}</h2>
            <img
              src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt={data.weather[0].description}
            />
            <p>Temperature: {data.main.temp} &#8451;</p>
            <p>Description: {data.weather[0].description}</p>
          </div>
        ))}
      {/* </Slider> */}
    </div>
  );
};

export default WeatherSlider;