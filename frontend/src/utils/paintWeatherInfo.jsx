import React from 'react';

export function WeatherInfo({ temp, desc, icon, errorMessage }) {
    let capitalizedDesc = null;
    if(!errorMessage) {
        capitalizedDesc = desc.charAt(0).toUpperCase() + desc.slice(1);
    }
    
    const weatherDiv = (
        <div className="weather-item">
            {errorMessage ? (
                <span>{errorMessage}</span>
            ) : (
                <>
                <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={desc}
                    style={{ verticalAlign: 'middle' }}
                />
                <span style={{ marginLeft: '8px' }}>
                    🌡️ {Math.round(temp)}°C - {capitalizedDesc}
                </span>
                </>
            )}
        </div>
    );
    
    return weatherDiv;
}
