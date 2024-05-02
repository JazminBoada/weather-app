import React, { useState, useEffect } from "react";
import "./WeatherApp.css";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import search_icon from "../assets/search.svg";

export const WeatherApp = () => {
  let api_key = "90b9c66324d2953d4da44aab0165f59a";
  // Defino los estados
  const [wicon, setWicon] = useState(cloud_icon);
  const [humidity, setHumidity] = useState("27%");
  const [wind, setWind] = useState("18 km/h");
  const [temperature, setTemperature] = useState("30°C");
  const [location, setLocation] = useState("Buenos Aires");
  const [city, setCity] = useState("Buenos Aires"); // Nuevo estado para almacenar la ciudad

  const search = async () => {
    if (city.trim() === "") {
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();

    // Actualizar el estado con los datos recibidos de la API
    setHumidity(data.main.humidity + " %");
    setWind(data.wind.speed + " km");
    setTemperature(data.main.temp + "°");
    setLocation(data.name);

    // Condiciones para establecer el icono correspondiente
    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  useEffect(() => {
    // Al montar el componente, hacer una búsqueda inicial con la ciudad predeterminada
    search();
  }, []);

  return (
    <main className="container">
      <div className="top-bar">
        {/* Usar el estado "city" para el valor del input */}
        <input
          type="text"
          className="cityInput"
          placeholder="Buscar"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="search icon" />
        </div>
      </div>

      <div className="weather-image">
        <img src={wicon} alt="weather icon" />
      </div>
      <div className="weather-temp">{temperature}</div>
      <div className="weather-location">{location}</div>

      <footer className="data-container">
        <div className="element">
          <img src={humidity_icon} className="icon" alt="humidity icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}</div>
            <div className="text">Humedad</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} className="icon" alt="wind icon" />
          <div className="data">
            <div className="wind-rate">{wind}</div>
            <div className="text">Viento</div>
          </div>
        </div>
      </footer>
    </main>
  );
};
