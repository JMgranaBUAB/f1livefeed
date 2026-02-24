import { useState, useEffect } from 'react';
import axios from 'axios';

// Ergast-compatible API for historical/current standings
const JOLPI_API_BASE = 'https://api.jolpi.ca/ergast/f1/current';

export const RACE_POINTS = {
    1: 25, 2: 18, 3: 15, 4: 12, 5: 10,
    6: 8, 7: 6, 8: 4, 9: 2, 10: 1
};

export const SPRINT_POINTS = {
    1: 8, 2: 7, 3: 6, 4: 5, 5: 4,
    6: 3, 7: 2, 8: 1
};

export const useChampionshipData = (livePositions, sessionType) => {
    const [baseDriverStandings, setBaseDriverStandings] = useState([]);
    const [baseConstructorStandings, setBaseConstructorStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBaseStandings = async () => {
            try {
                setLoading(true);
                // Fetch driver standings
                const driverRes = await axios.get(`${JOLPI_API_BASE}/driverStandings.json`);
                const dt = driverRes.data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
                setBaseDriverStandings(dt);

                // Fetch constructor standings
                const constructorRes = await axios.get(`${JOLPI_API_BASE}/constructorStandings.json`);
                const ct = constructorRes.data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
                setBaseConstructorStandings(ct);

                setError(null);
            } catch (err) {
                console.error("Error fetching championship standings:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBaseStandings();
    }, []);

    const isRace = sessionType?.toLowerCase().includes('race');
    const isSprint = sessionType?.toLowerCase().includes('sprint');

    // Calculate Live Driver Standings
    const getLiveDriverStandings = () => {
        if (!baseDriverStandings.length) return [];

        let liveData = baseDriverStandings.map(driver => {
            // Find if this driver is currently gaining points in the live session
            const livePos = livePositions.find(p => p.driver_number.toString() === driver.Driver.permanentNumber);
            let livePoints = 0;

            if (livePos) {
                const pos = parseInt(livePos.position);
                if (isRace && RACE_POINTS[pos]) livePoints = RACE_POINTS[pos];
                if (isSprint && SPRINT_POINTS[pos]) livePoints = SPRINT_POINTS[pos];
            }

            return {
                ...driver,
                basePoints: parseFloat(driver.points) || 0,
                livePoints: livePoints,
                totalPoints: (parseFloat(driver.points) || 0) + livePoints,
                currentPos: livePos ? parseInt(livePos.position) : null
            };
        });

        // Sort by total points descending
        liveData.sort((a, b) => b.totalPoints - a.totalPoints);

        // Add updated position
        return liveData.map((d, index) => ({ ...d, projectedPosition: index + 1 }));
    };

    // Calculate Live Constructor Standings
    const getLiveConstructorStandings = () => {
        if (!baseConstructorStandings.length) return [];

        let liveData = baseConstructorStandings.map(constructor => {
            let livePoints = 0;

            // Find all drivers for this constructor in the base standings
            const teamDrivers = baseDriverStandings.filter(d =>
                d.Constructors[0]?.constructorId === constructor.Constructor.constructorId
            );

            // Add up their live points
            teamDrivers.forEach(driver => {
                const livePos = livePositions.find(p => p.driver_number.toString() === driver.Driver.permanentNumber);
                if (livePos) {
                    const pos = parseInt(livePos.position);
                    if (isRace && RACE_POINTS[pos]) livePoints += RACE_POINTS[pos];
                    if (isSprint && SPRINT_POINTS[pos]) livePoints += SPRINT_POINTS[pos];
                }
            });

            return {
                ...constructor,
                basePoints: parseFloat(constructor.points) || 0,
                livePoints: livePoints,
                totalPoints: (parseFloat(constructor.points) || 0) + livePoints
            };
        });

        // Sort by total points descending
        liveData.sort((a, b) => b.totalPoints - a.totalPoints);

        // Add updated position
        return liveData.map((c, index) => ({ ...c, projectedPosition: index + 1 }));
    };

    return {
        driverStandings: getLiveDriverStandings(),
        constructorStandings: getLiveConstructorStandings(),
        loading,
        error
    };
};
