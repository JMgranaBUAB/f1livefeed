# F1 Live Feed React

![F1 Live App Icon](favicon.png)

**Live Demo:** [https://f1livefeed.vercel.app/](https://f1livefeed.vercel.app/)

A real-time Formula 1 application built with React, Vite, and tailwind-style Vanilla CSS. This app connects to OpenF1 and Jolpica APIs to provide a fully live and responsive dashboard containing:
- Live track positions and gaps
- Championship standings (Drivers & Constructors) updating in real-time based on the ongoing race
- Live weather updates
- Race control messages

## Features

- **Live Grid:** Tracks current driver placements, car data, and live gaps.
- **Dynamic Standings:** Driver and Constructor tables recalculate points as the race unfolds.
- **Dark Mode Aesthetics:** Designed with premium real-time dashboards in mind, featuring glassmorphism and modern UI elements.
- **Polling System:** Fetches data respecting API rate limits ensuring stable connections without overwhelming the free-tier API.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

## Data Sources

Data for this project is provided for free by the following APIs:
- [OpenF1 API](https://openf1.org) - Used for real-time race data (positions, distances, weather, and radio).
- [Jolpica F1 API](https://jolpi.ca) - Used for fetching historical and current championship standings.

## Disclaimer

This website is an independent, unofficial project and is not affiliated in any way with the Formula 1 group of companies, the FIA, or any related entity. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX, and other related trademarks are registered trademarks of Formula One Licensing B.V.

## License

This project is licensed under the GPL-3.0 License. 

# f1livefeed
