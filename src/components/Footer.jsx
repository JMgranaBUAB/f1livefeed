import React from 'react';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>
                    This website is an independent, unofficial project and is not affiliated in any way with the Formula 1 group of companies, the FIA, or any related entity. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX, and other related trademarks are registered trademarks of Formula One Licensing B.V.
                </p>
                <p className="footer-credits">
                    Data provided for free by <a href="https://openf1.org" target="_blank" rel="noreferrer">OpenF1 API</a> and <a href="https://jolpi.ca" target="_blank" rel="noreferrer">Jolpica F1 API</a>.
                </p>
                <p className="footer-license">
                    Licensed under GPL-3.0.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
