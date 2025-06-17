import React from 'react';
import './WeatherInfo.css';

const WeatherInfo = ({ temp, desc, icon, errorMessage }) => {
    let capitalizedDesc = null;
    if(!errorMessage) {
        capitalizedDesc = desc.charAt(0).toUpperCase() + desc.slice(1);
    }
    
    const weatherDiv = (
        <div className="weather-item">
            {errorMessage ? (
                <span>{errorMessage}</span>
            ) : (
                <div className="weather-wrapper">
                    <img
                        className="weather-icon"
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={desc}
                        style={{ verticalAlign: 'middle' }}
                    />

                    <span className="weather-info" style={{ marginLeft: '8px' }}>
                    🌡️ {Math.round(temp)}°C - {capitalizedDesc}
                </span>
                </div>
            )}
        </div>
    );
    
    return weatherDiv;
}

export default WeatherInfo;
