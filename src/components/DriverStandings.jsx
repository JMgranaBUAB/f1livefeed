import React from 'react';
import { getDriverColor } from '../utils/colors';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const DriverStandings = ({ standings, loading }) => {
    if (loading && !standings.length) {
        return (
            <div className="standings-panel glass-panel skeleton-loader">
                <div className="skeleton-header"></div>
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="skeleton-row"></div>
                ))}
            </div>
        );
    }

    if (!standings || standings.length === 0) {
        return (
            <div className="standings-panel glass-panel">
                <div className="empty-state">
                    <Trophy size={48} opacity={0.5} />
                    <p>Driver Standings unavailable</p>
                </div>
            </div>
        );
    }

    return (
        <div className="standings-panel glass-panel">
            <div className="panel-header">
                <h2>Drivers' Championship</h2>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>POS</th>
                            <th>DRIVER</th>
                            <th>PTS</th>
                            <th>PROJ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((driver) => {
                            const posDiff = parseInt(driver.position) - driver.projectedPosition;

                            return (
                                <tr key={driver.Driver.driverId}>
                                    <td className="pos-col">{driver.projectedPosition}</td>
                                    <td className="driver-col">
                                        <span
                                            className="team-color-bar"
                                            style={{ backgroundColor: getDriverColor(parseInt(driver.Driver.permanentNumber)) }}
                                        />
                                        <div className="driver-info">
                                            <span className="driver-name">{driver.Driver.givenName} {driver.Driver.familyName}</span>
                                            <span className="team-name">{driver.Constructors[0]?.name}</span>
                                        </div>
                                    </td>
                                    <td className="points-col">
                                        {driver.totalPoints}
                                        {driver.livePoints > 0 && <span className="live-points">+{driver.livePoints}</span>}
                                    </td>
                                    <td className="trend-col">
                                        {posDiff > 0 ? <TrendingUp size={16} className="text-success" /> :
                                            posDiff < 0 ? <TrendingDown size={16} className="text-danger" /> :
                                                <Minus size={16} className="text-muted" />}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DriverStandings;
