import React from 'react';
import { useF1Data } from './hooks/useF1Data';
import { useChampionshipData } from './hooks/useChampionshipData';
import Leaderboard from './components/Leaderboard';
import WeatherPanel from './components/WeatherPanel';
import RaceControl from './components/RaceControl';
import DriverStandings from './components/DriverStandings';
import ConstructorStandings from './components/ConstructorStandings';
import Footer from './components/Footer';
import { Activity } from 'lucide-react';
import './index.css';

function App() {
    const { session, positions, weather, raceControl, loading: liveLoading, error: liveError } = useF1Data();
    const { driverStandings, constructorStandings, loading: champLoading, error: champError } = useChampionshipData(
        positions,
        session?.session_type
    );

    const renderContent = () => {
        if (liveLoading && !session) {
            return (
                <div className="loader" style={{ marginTop: '4rem' }}>
                    <div className="spinner"></div>
                    <h2>Connecting to F1 Grid...</h2>
                </div>
            );
        }

        if (liveError) {
            return (
                <div className="glass-panel" style={{ marginTop: '4rem', textAlign: 'center' }}>
                    <h2>Connection Lost</h2>
                    <p>{liveError}</p>
                    <button onClick={() => window.location.reload()} className="btn-primary" style={{ marginTop: '1rem' }}>
                        Retry Connection
                    </button>
                </div>
            );
        }

        return (
            <main className="dashboard-content">
                {/* Section 1: Live Timing & Race Control */}
                <section className="live-session-section">
                    <div className="leaderboard-container">
                        <Leaderboard positions={positions} loading={liveLoading} />
                    </div>
                    <div className="race-control-container">
                        <RaceControl messages={raceControl} />
                    </div>
                </section>

                {/* Section 2: Championship Standings */}
                <section className="championship-section">
                    <DriverStandings standings={driverStandings} loading={champLoading} />
                    <ConstructorStandings standings={constructorStandings} loading={champLoading} />
                </section>
            </main>
        );
    };

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

                {/* Weather inserted in the middle of header if it fits nicely */}
                <WeatherPanel weather={weather} />

                <div className="status-indicator">
                    <Activity className="pulse-icon text-accent" />
                    <span>Tracking Active</span>
                </div>
            </header>

            {renderContent()}

            <Footer />
        </div>
    );
}

export default App;
