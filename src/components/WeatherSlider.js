import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';


SwiperCore.use([Navigation]);
SwiperCore.use([Navigation]);

const WeatherSlider = ({ forecast }) => {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidesPerView(1);
      } else if (width < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    <div className='container'>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={10}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {forecast.map((data, index) => (
          <SwiperSlide className="cards" key={index}>
            <div>
              <h2>{new Date(data.dt_txt).toLocaleDateString('en-US', options)}</h2>
              <img
                src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
              />
              <p>Max: {data.main.temp_max} &#8451;</p>
              <p>Min: {data.main.temp_min} &#8451;</p>
              <p>Description: {data.weather[0].description}</p>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev custom-nav"></div>
        <div className="swiper-button-next custom-nav"></div>
      </Swiper>
    </div>
  );
};

export default WeatherSlider;
