import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Weather.scss';

const Weather: React.FC = () => {

    interface WeatherInfo {
        location: string;
        country: string;
        description: string; 
        icon: string;
        temp: number;
    }

    const apiKey = '31af0c1704ccbeb990753e45a6465aba';
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                }); 
            } else {
                alert('Geolocation is not supported by this browser.');
            }
    }, []);

    useEffect(() => {
            if (latitude && longitude) {
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
                    .then(response => {
                        setWeatherInfo({
                            location: response.data.name,
                            country: response.data.sys.country,
                            description: response.data.weather[0].description.toUpperCase(), 
                            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                            temp: Math.round(convertKelvinToCelsius(response.data.main.temp))
                        });
                    })
                    .catch(() => alert(`Couldn't find weather informations at your location...`));
                setLoading(false);
            }
    }, [latitude, longitude]);

    const convertKelvinToCelsius = (temperature: number) => {
        return temperature - 273.15;
    }

    let weather = null;
    if (!loading && weatherInfo) {
        weather = (
            <div className="weather">
                <div className="weather-icon">
                    <img src={weatherInfo.icon} alt="weather-icon" /> 
                </div>
                <div className="weather-details">
                    <div className="weather-details-location">
                        <p>{weatherInfo.location}</p>
                        <span>/</span>
                        <p>{weatherInfo.country}</p>
                    </div>
                    <div className="weather-details-description">
                        <p>{weatherInfo.description}</p>
                        <p>{weatherInfo.temp}<span>&deg;C</span></p>
                    </div>
                </div>
            </div>
        );
    }

    return(
        loading 
            ? <p>Loading...</p>
            : weather
    );
}

export default Weather;