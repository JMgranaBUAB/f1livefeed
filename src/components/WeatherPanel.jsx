import React from 'react';
import { CloudRain, Wind, ThermometerSun, Thermometer } from 'lucide-react';

const WeatherPanel = ({ weather }) => {
    if (!weather || Object.keys(weather).length === 0) {
        return null; // Don't render if no weather data is available yet
    }

    return (
        <div className="weather-panel glass-panel">
            <div className="panel-header">
                <h2>Conditions</h2>
                <span className="time-badge">
                    {new Date(weather.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            <div className="weather-grid">
                <div className="weather-item">
                    <ThermometerSun className="weather-icon text-accent" />
                    <div className="weather-data">
                        <span className="weather-label">Track</span>
                        <span className="weather-value">{weather.track_temperature}°C</span>
                    </div>
                </div>

                <div className="weather-item">
                    <Thermometer className="weather-icon text-accent" />
                    <div className="weather-data">
                        <span className="weather-label">Air</span>
                        <span className="weather-value">{weather.air_temperature}°C</span>
                    </div>
                </div>

                <div className="weather-item">
                    <Wind className="weather-icon text-accent" />
                    <div className="weather-data">
                        <span className="weather-label">Wind</span>
                        <span className="weather-value">{weather.wind_speed} m/s</span>
                    </div>
                </div>

                <div className="weather-item">
                    <CloudRain className="weather-icon text-accent" />
                    <div className="weather-data">
                        <span className="weather-label">Rain</span>
                        <span className="weather-value">{weather.rainfall ? 'Yes' : 'No'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherPanel;
