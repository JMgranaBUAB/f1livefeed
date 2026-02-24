import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
// We need a helper to get constructor colors
export const CONSTRUCTOR_COLORS = {
    'red_bull': '#3671C6',
    'ferrari': '#E80020',
    'mercedes': '#27F4D2',
    'mclaren': '#FF8000',
    'aston_martin': '#229971',
    'alpine': '#52E252',
    'williams': '#005AFF',
    'rb': '#6692FF',
    'sauber': '#00E701',
    'haas': '#B6BABD'
};

export const getConstructorColor = (id) => CONSTRUCTOR_COLORS[id] || '#FFFFFF';

const ConstructorStandings = ({ standings, loading }) => {
    if (loading && !standings.length) {
        return (
            <div className="standings-panel glass-panel skeleton-loader">
                <div className="skeleton-header"></div>
                {[...Array(5)].map((_, i) => (
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
                    <p>Constructor Standings unavailable</p>
                </div>
            </div>
        );
    }

    return (
        <div className="standings-panel glass-panel">
            <div className="panel-header">
                <h2>Constructors' Championship</h2>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>POS</th>
                            <th>TEAM</th>
                            <th>PTS</th>
                            <th>PROJ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((constructor) => {
                            const posDiff = parseInt(constructor.position) - constructor.projectedPosition;

                            return (
                                <tr key={constructor.Constructor.constructorId}>
                                    <td className="pos-col">{constructor.projectedPosition}</td>
                                    <td className="driver-col">
                                        <span
                                            className="team-color-bar"
                                            style={{ backgroundColor: getConstructorColor(constructor.Constructor.constructorId) }}
                                        />
                                        <span className="team-name">{constructor.Constructor.name}</span>
                                    </td>
                                    <td className="points-col">
                                        {constructor.totalPoints}
                                        {constructor.livePoints > 0 && <span className="live-points">+{constructor.livePoints}</span>}
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

export default ConstructorStandings;
