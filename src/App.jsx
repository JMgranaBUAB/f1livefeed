import React from 'react';
import { useF1Data } from './hooks/useF1Data';
import { useChampionshipData } from './hooks/useChampionshipData';
import Leaderboard from './components/Leaderboard';
import WeatherPanel from './components/WeatherPanel';
import RaceControl from './components/RaceControl';
import DriverStandings from './components/DriverStandings';
import ConstructorStandings from './components/ConstructorStandings';
import { Activity } from 'lucide-react';
import './index.css';

function App() {
    const { session, positions, weather, raceControl, loading: liveLoading, error: liveError } = useF1Data();
    const { driverStandings, constructorStandings, loading: champLoading, error: champError } = useChampionshipData(
        positions,
        session?.session_type
    );

    if (liveLoading && !session) {
        return (
            <div className="app-container loading-state">
                <div className="loader">
                    <div className="spinner"></div>
                    <h2>Connecting to F1 Grid...</h2>
                </div>
            </div>
        );
    }

    if (liveError) {
        return (
            <div className="app-container error-state">
                <div className="glass-panel">
                    <h2>Connection Lost</h2>
                    <p>{liveError}</p>
                    <button onClick={() => window.location.reload()} className="btn-primary">
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            {/* Background Effects */}
            <div className="bg-glow glow-1"></div>
            <div className="bg-glow glow-2"></div>

            <header className="app-header glass-panel">
                <div className="branding">
                    <h1>F1 <span className="text-accent">LIVE</span> FEED</h1>
                    {session && (
                        <p className="session-info">
                            {session.session_name} • {session.country_name} • {session.year}
                        </p>
                    )}
                </div>
                <div className="status-indicator">
                    <Activity className="pulse-icon text-accent" />
                    <span>Tracking Active</span>
                </div>
            </header>

            <main className="dashboard-grid">
                <div className="main-column">
                    <Leaderboard positions={positions} loading={liveLoading} />
                </div>

                <div className="main-column" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <DriverStandings standings={driverStandings} loading={champLoading} />
                    <ConstructorStandings standings={constructorStandings} loading={champLoading} />
                </div>

                <div className="side-column">
                    <WeatherPanel weather={weather} />
                    <RaceControl messages={raceControl} />
                </div>
            </main>
        </div>
    );
}

export default App;
