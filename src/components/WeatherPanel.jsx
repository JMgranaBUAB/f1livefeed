import React from 'react';
import { CloudRain, Wind, ThermometerSun, Thermometer } from 'lucide-react';

const WeatherPanel = ({ weather }) => {
    if (!weather || Object.keys(weather).length === 0) {
        return null; // Don't render if no weather data is available yet
    }

    return (
        <div className="header-weather-block">
            <div className="weather-header-grid">
                <div className="weather-header-item">
                    <ThermometerSun className="weather-header-icon text-accent" />
                    <div className="weather-header-data">
                        <span className="weather-header-label">Track</span>
                        <span className="weather-header-value">{weather.track_temperature}°C</span>
                    </div>
                </div>

                <div className="weather-header-item">
                    <Thermometer className="weather-header-icon text-accent" />
                    <div className="weather-header-data">
                        <span className="weather-header-label">Air</span>
                        <span className="weather-header-value">{weather.air_temperature}°C</span>
                    </div>
                </div>

                <div className="weather-header-item">
                    <Wind className="weather-header-icon text-accent" />
                    <div className="weather-header-data">
                        <span className="weather-header-label">Wind</span>
                        <span className="weather-header-value">{weather.wind_speed} m/s</span>
                    </div>
                </div>

                <div className="weather-header-item">
                    <CloudRain className="weather-header-icon text-accent" />
                    <div className="weather-header-data">
                        <span className="weather-header-label">Rain</span>
                        <span className="weather-header-value">{weather.rainfall ? 'Yes' : 'No'}</span>
                    </div>
                </div>
            </div>
            <span className="time-badge" style={{ marginLeft: 'auto' }}>
                {new Date(weather.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>
    );
};

export default WeatherPanel;
