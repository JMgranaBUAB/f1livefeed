import React from 'react';
import { Flag, AlertTriangle, MessageSquare } from 'lucide-react';

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

    // Display only the 5 most recent messages
    const recentMessages = [...messages].reverse().slice(0, 5);

    const getIcon = (category) => {
        switch (category) {
            case 'Flag': return <Flag className="msg-icon text-yellow" />;
            case 'SafetyCar': return <AlertTriangle className="msg-icon text-red" />;
            default: return <MessageSquare className="msg-icon text-accent" />;
        }
    };

    return (
        <div className="race-control-panel glass-panel">
            <div className="panel-header">
                <h2>Race Control</h2>
                <span className="live-badge">RC</span>
            </div>

            <div className="messages-list">
                {recentMessages.map((msg, index) => (
                    <div key={index} className="message-item">
                        <div className="message-icon-wrapper">
                            {getIcon(msg.category)}
                        </div>
                        <div className="message-content">
                            <span className="message-time">
                                {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                            <p className="message-text">{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RaceControl;
