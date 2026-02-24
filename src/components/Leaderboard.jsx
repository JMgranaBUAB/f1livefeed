import React from 'react';
import { getDriverColor, getTeamLogoByColor } from '../utils/colors';
import { Trophy, Timer, ChevronRight } from 'lucide-react';

const Leaderboard = ({ positions, loading }) => {
    const getTyreColor = (compound) => {
        const c = compound?.toUpperCase();
        if (c?.includes('SOFT')) return '#FF3333';
        if (c?.includes('MEDIUM')) return '#FFD700';
        if (c?.includes('HARD')) return '#F0F0F0';
        if (c?.includes('INTER')) return '#4CAF50';
        if (c?.includes('WET')) return '#2196F3';
        return '#888';
    };

    const getTyreLabel = (compound) => {
        const c = compound?.toUpperCase();
        if (c?.includes('SOFT')) return 'S';
        if (c?.includes('MEDIUM')) return 'M';
        if (c?.includes('HARD')) return 'H';
        if (c?.includes('INTER')) return 'I';
        if (c?.includes('WET')) return 'W';
        return '?';
    };

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
        <div className="leaderboard glass-panel" style={{ overflow: 'hidden' }}>
            <div className="panel-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h2>Live Standings</h2>
                    <span className="live-badge">TRACK LIVE</span>
                </div>
                {positions[0]?.lap_data && (
                    <span className="time-badge">LAP {positions[0].lap_data.lap_number}</span>
                )}
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>POS</th>
                            <th>DRIVER</th>
                            <th>TYRES</th>
                            <th>INTERVAL</th>
                            <th>GAP</th>
                            <th>LAST LAP</th>
                            <th>PITS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((pos) => (
                            <tr key={pos.driver_number} className="driver-row">
                                <td className="pos-col">{pos.position}</td>
                                <td className="driver-col">
                                    {pos.driver_data && (
                                        <span className="driver-acronym" style={{
                                            fontWeight: 800,
                                            backgroundColor: getDriverColor(pos.driver_number),
                                            color: '#fff',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            minWidth: '42px',
                                            textAlign: 'center',
                                            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                                        }}>
                                            {pos.driver_data.name_acronym}
                                        </span>
                                    )}
                                    <div className="driver-info" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span className="driver-number" style={{ opacity: 0.8, fontSize: '0.8rem' }}>#{pos.driver_number}</span>
                                            {pos.driver_data && (
                                                <span className="driver-full-name" style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                                                    {pos.driver_data.last_name}
                                                </span>
                                            )}
                                            {getTeamLogoByColor(getDriverColor(pos.driver_number)) && (
                                                <img
                                                    src={getTeamLogoByColor(getDriverColor(pos.driver_number))}
                                                    alt="Team Logo"
                                                    style={{ height: '16px', marginLeft: 'auto', opacity: 0.9 }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {pos.tyre_data ? (
                                        <div className="tyre-info" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                border: `2px solid ${getTyreColor(pos.tyre_data.compound)}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.7rem',
                                                fontWeight: 800,
                                                color: getTyreColor(pos.tyre_data.compound)
                                            }}>
                                                {getTyreLabel(pos.tyre_data.compound)}
                                            </div>
                                            <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>({pos.tyre_data.tyre_age_at_start})</span>
                                        </div>
                                    ) : '-'}
                                </td>
                                <td className="time-col" style={{ color: 'var(--text-muted)' }}>
                                    {pos.interval_data?.interval ? `+${pos.interval_data.interval}` : (pos.position === 1 ? 'LEADER' : '-')}
                                </td>
                                <td className="time-col">
                                    {pos.gap_to_leader ? `+${pos.gap_to_leader}` : '-'}
                                </td>
                                <td className="time-col" style={{ fontFamily: 'monospace' }}>
                                    {pos.lap_data?.lap_duration ? pos.lap_data.lap_duration.toFixed(3) : '-'}
                                </td>
                                <td align="center" style={{ fontWeight: 600 }}>
                                    {pos.pit_count}
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
