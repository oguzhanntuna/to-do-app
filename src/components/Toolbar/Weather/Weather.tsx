import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Weather.scss';

const Weather: React.FC = () => {

    interface WeatherInfo {
        location: string;
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

    let weather = <div className="weather"></div>;
    if (!loading && weatherInfo) {
        weather = (
            <div className="weather fetched">
                <div className="weather-icon">
                    <img src={weatherInfo.icon} alt="weather-icon" /> 
                </div>
                <div className="weather-temperature">
                    {weatherInfo.temp}<sup>&deg;C</sup>
                </div>
                <div className="weather-details">
                    <div className="weather-details-location">
                        <p>{weatherInfo.location}</p>
                    </div>
                    <div className="weather-details-description">{weatherInfo.description}</div>
                </div>
            </div>
        );
    }

    return(
        weather
    );
}

export default Weather;