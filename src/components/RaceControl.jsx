import React from 'react';
import {
    Flag,
    MessageSquare,
    AlertTriangle
} from 'lucide-react';

const RaceControl = ({ messages }) => {
    if (!messages || messages.length === 0) {
        return (
            <div className="race-control-panel glass-panel">
                <div className="empty-state small">
                    <Flag opacity={0.5} />
                    <p>No race control messages</p>
                </div>
            </div>
        );
    }

    // Display all messages reversed (newest at top)
    const allMessages = [...messages].reverse();

    const getMessageCategory = (msg) => {
        const text = msg.message?.toUpperCase() || '';
        const cat = msg.category;

        if (cat === 'SafetyCar' || text.includes('SAFETY CAR')) return 'SAFETY_CAR';
        if (text.includes('GREEN LIGHT') || text.includes('CLEAR IN TRACK') || text.includes('TRACK CLEAR') || text.includes('PIT LANE ENTRY OPEN')) return 'GREEN_LIGHT';
        if (text.includes('SESSION STARTED') || text.includes('SESSION FINISHED') || text.includes('STANDING START')) return 'CHECKERED_FLAG';
        if (text.includes('YELLOW') || cat === 'Flag') {
            if (text.includes('DOUBLE YELLOW')) return 'DOUBLE_YELLOW';
            return 'YELLOW_FLAG';
        }
        if (text.includes('RED FLAG') || text.includes('SESSION ABORTED')) return 'RED_FLAG';
        if (text.includes('WAVED BLUE FLAG')) return 'BLUE_FLAG';
        if (text.includes('BLACK AND WHITE FLAG')) return 'BLACK_WHITE_FLAG';
        if (text.includes('PENALTY') || text.includes('TIME PENALTY')) return 'PENALTY';
        if (text.includes('INVESTIGATION') || text.includes('UNDER INVESTIGATION')) return 'INVESTIGATION';
        if (text.includes('TRACK LIMITS')) return 'TRACK_LIMITS';
        if (text.includes('LAP DELETED')) return 'LAP_DELETED';
        if (text.includes('TECHNICAL')) return 'TECHNICAL';
        if (text.includes('DRS ENABLED')) return 'DRS_ON';
        if (text.includes('DRS DISABLED')) return 'DRS_OFF';
        if (text.includes('RACE WILL RESUME') ||
            text.includes('SESSION WILL RESUME') ||
            text.includes('OVERTAKE ENABLED') ||
            text.includes('PINK HEAD PADDING MATERIAL') ||
            text.includes('STRAIGHT MODE') ||
            text.includes('EXTRA FORMATION LAP')) return 'INFO';

        return 'OTHER';
    };

    const getIcon = (category) => {
        switch (category) {
            case 'YELLOW_FLAG': return <img src="/yellow_flag.png" alt="Yellow Flag" className="msg-icon" style={{ width: '20px', height: '12px', borderRadius: '2px' }} />;
            case 'DOUBLE_YELLOW': return <img src="/double_yellow.svg" alt="Double Yellow" className="msg-icon" style={{ width: '20px', height: '16px', borderRadius: '2px' }} />;
            case 'RED_FLAG': return <img src="/red_flag.svg" alt="Red Flag" className="msg-icon" style={{ width: '20px', height: '12px', borderRadius: '2px' }} />;
            case 'GREEN_LIGHT': return <img src="/green_light.png" alt="Green Light" className="msg-icon" style={{ width: '20px', height: '20px', borderRadius: '4px' }} />;
            case 'CHECKERED_FLAG': return <img src="/checkered_flag.png" alt="Session Status" className="msg-icon" style={{ width: '20px', height: '12px', borderRadius: '2px' }} />;
            case 'BLUE_FLAG': return <img src="/blue_flag.svg" alt="Blue Flag" className="msg-icon" style={{ width: '20px', height: '12px', borderRadius: '2px' }} />;
            case 'BLACK_WHITE_FLAG': return <img src="/black_white_flag.svg" alt="Black and White Flag" className="msg-icon" style={{ width: '20px', height: '12px', borderRadius: '2px' }} />;
            case 'SAFETY_CAR': return <AlertTriangle className="msg-icon" style={{ color: '#EF4444' }} />;
            case 'PENALTY':
            case 'INVESTIGATION':
            case 'TRACK_LIMITS':
            case 'LAP_DELETED':
            case 'TECHNICAL':
            case 'DRS_ON':
            case 'DRS_OFF':
            case 'INFO':
                return <img src="/info_icon.svg" alt="Info" className="msg-icon" style={{ width: '20px', height: '20px' }} />;
            default: return <MessageSquare className="msg-icon text-accent" />;
        }
    };

    const getBorderColor = (category) => {
        switch (category) {
            case 'SAFETY_CAR':
            case 'PENALTY': return '#EF4444';
            case 'GREEN_LIGHT': return '#10B981';
            case 'CHECKERED_FLAG': return '#FFFFFF';
            case 'YELLOW_FLAG':
            case 'DOUBLE_YELLOW': return '#FBBF24';
            case 'RED_FLAG': return '#EF4444';
            case 'INVESTIGATION': return '#3B82F6';
            case 'DRS_ON': return '#10B981';
            case 'TRACK_LIMITS': return '#FBBF24';
            case 'BLUE_FLAG': return '#0000FF';
            case 'BLACK_WHITE_FLAG': return '#FFFFFF';
            case 'INFO': return '#0053A0';
            default: return 'var(--accent-red)';
        }
    };

    return (
        <div className="race-control-panel glass-panel">
            <div className="panel-header">
                <h2>Race Control</h2>
                <span className="live-badge">RC</span>
            </div>

            <div className="messages-list">
                {allMessages.map((msg, index) => {
                    const category = getMessageCategory(msg);
                    return (
                        <div key={index} className="message-item" style={{ borderLeftColor: getBorderColor(category) }}>
                            <div className="message-icon-wrapper">
                                {getIcon(category)}
                            </div>
                            <div className="message-content">
                                <span className="message-time">
                                    {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                                <p className="message-text">{msg.message}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RaceControl;
