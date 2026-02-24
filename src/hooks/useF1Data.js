import { useState, useEffect, useCallback } from 'react';
import { getLatestSession, getPositions, getWeather, getRaceControl } from '../services/api';

const POLLING_INTERVAL_MS = 8000; // 8 seconds to stay under 30 req/min (OpenF1 free tier limit)

export const useF1Data = () => {
    const [session, setSession] = useState(null);
    const [positions, setPositions] = useState([]);
    const [weather, setWeather] = useState([]);
    const [raceControl, setRaceControl] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial load: get session details
    useEffect(() => {
        let mounted = true;

        const init = async () => {
            try {
                setLoading(true);
                const latestSession = await getLatestSession();
                if (mounted) {
                    setSession(latestSession);
                }
            } catch (err) {
                if (mounted) setError(err.message);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        init();
        return () => { mounted = false; };
    }, []);

    // Polling mechanism
    useEffect(() => {
        if (!session) return;

        let intervalId;
        let isFetching = false;

        const fetchLiveData = async () => {
            if (isFetching) return; // Prevent overlapping requests
            isFetching = true;

            try {
                // We use Promise.allSettled to ensure one failure doesn't crash the whole poll
                const [positionsRes, weatherRes, raceControlRes] = await Promise.allSettled([
                    getPositions(session.session_key),
                    getWeather(session.session_key),
                    getRaceControl(session.session_key)
                ]);

                if (positionsRes.status === 'fulfilled') {
                    // Keep only the most recent position for each driver.
                    // The API often returns historical arrays; we want the latest sequence
                    const latestPositions = filterLatestDriverData(positionsRes.value);
                    setPositions(latestPositions);
                }

                if (weatherRes.status === 'fulfilled') {
                    // Weather is an array of updates, get the last one
                    const latestWeather = weatherRes.value[weatherRes.value.length - 1];
                    // Update only if changed
                    setWeather(prev =>
                        prev?.date === latestWeather?.date ? prev : latestWeather
                    );
                }

                if (raceControlRes.status === 'fulfilled') {
                    // Race control messages can be large; we keep the whole array but usually only render the latest
                    setRaceControl(raceControlRes.value);
                }

                setError(null);
            } catch (err) {
                console.error("Polling error:", err);
            } finally {
                isFetching = false;
            }
        };

        // Immediate first fetch
        fetchLiveData();

        // Start polling
        intervalId = setInterval(fetchLiveData, POLLING_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [session]);

    return { session, positions, weather, raceControl, loading, error };
};

// Helper function to extract only the most recent position per driver
const filterLatestDriverData = (dataArray) => {
    if (!dataArray || dataArray.length === 0) return [];

    const latestByDriver = {};

    dataArray.forEach(entry => {
        const driverNum = entry.driver_number;
        // Assume later entries in the array or entries with higher sequence numbers are newer
        if (!latestByDriver[driverNum] || new Date(entry.date) > new Date(latestByDriver[driverNum].date)) {
            latestByDriver[driverNum] = entry;
        }
    });

    // Convert object back to array and sort by position
    return Object.values(latestByDriver).sort((a, b) => a.position - b.position);
};
