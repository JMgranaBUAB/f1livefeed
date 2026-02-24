import React from 'react';
import { getDriverColor } from '../utils/colors';
import { Trophy, Timer, ChevronRight } from 'lucide-react';

const Leaderboard = ({ positions, loading }) => {
    if (loading && !positions.length) {
        return (
            <div className="leaderboard glass-panel skeleton-loader">
                <div className="skeleton-header"></div>
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="skeleton-row"></div>
                ))}
            </div>
        );
    }

    if (!positions || positions.length === 0) {
        return (
            <div className="leaderboard glass-panel">
                <div className="empty-state">
                    <Trophy size={48} opacity={0.5} />
                    <p>Waiting for position data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="leaderboard glass-panel">
            <div className="panel-header">
                <h2>Live Standings</h2>
                <span className="live-badge">LIVE</span>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>POS</th>
                            <th>DRIVER</th>
                            <th>CAR</th>
                            <th>GAP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((pos) => (
                            <tr key={pos.driver_number} className="driver-row">
                                <td className="pos-col">{pos.position}</td>
                                <td className="driver-col">
                                    <span
                                        className="team-color-bar"
                                        style={{ backgroundColor: getDriverColor(pos.driver_number) }}
                                    />
                                    <span className="driver-number">{pos.driver_number}</span>
                                    {/* Note: The OpenF1 API positions endpoint often doesn't include the driver name directly, 
                      we rely on the number or would need to cross-reference the /drivers endpoint */}
                                </td>
                                <td>🏎️</td>
                                <td className="time-col">
                                    {pos.gap_to_leader ? `+${pos.gap_to_leader}` : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
