import { useState, useEffect, useCallback } from 'react';
import {
    getLatestSession,
    getPositions,
    getDrivers,
    getWeather,
    getRaceControl,
    getIntervals,
    getStints,
    getLaps,
    getPitStops
} from '../services/api';

const POLLING_INTERVAL_MS = 8000; // 8 seconds to stay under 30 req/min (OpenF1 free tier limit)

export const useF1Data = () => {
    const [session, setSession] = useState(null);
    const [driversInfo, setDriversInfo] = useState({});
    const [positions, setPositions] = useState([]);
    const [weather, setWeather] = useState([]);
    const [raceControl, setRaceControl] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial load: get session details & drivers info
    useEffect(() => {
        let mounted = true;

        const init = async () => {
            try {
                setLoading(true);
                const latestSession = await getLatestSession();

                if (mounted && latestSession) {
                    setSession(latestSession);

                    // Fetch drivers for this session
                    try {
                        const driversRes = await getDrivers(latestSession.session_key);
                        const driversMap = {};
                        driversRes.forEach(d => {
                            driversMap[d.driver_number] = d;
                        });
                        setDriversInfo(driversMap);
                    } catch (err) {
                        console.error('Failed to fetch drivers metadata', err);
                    }
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
                const sessionKey = session.session_key;

                // Fire all requests in parallel
                const [
                    posRes,
                    weatherRes,
                    rcRes,
                    intRes,
                    stintsRes,
                    lapsRes,
                    pitsRes
                ] = await Promise.allSettled([
                    getPositions(sessionKey),
                    getWeather(sessionKey),
                    getRaceControl(sessionKey),
                    getIntervals(sessionKey),
                    getStints(sessionKey),
                    getLaps(sessionKey),
                    getPitStops(sessionKey)
                ]);

                if (posRes.status === 'fulfilled') {
                    let latestPositions = filterLatestDriverData(posRes.value);

                    // Maps for efficient merging
                    const intervalsMap = intRes.status === 'fulfilled' ? mapLatestByDriver(intRes.value) : {};
                    const stintsMap = stintsRes.status === 'fulfilled' ? mapLatestByDriver(stintsRes.value) : {};
                    const lapsMap = lapsRes.status === 'fulfilled' ? mapLatestByDriver(lapsRes.value) : {};
                    const pitsMap = pitsRes.status === 'fulfilled' ? mapByDriverCount(pitsRes.value) : {};

                    // Merge all metadata into the position object
                    latestPositions = latestPositions.map(pos => {
                        const driverNum = pos.driver_number;
                        return {
                            ...pos,
                            driver_data: driversInfo[driverNum] || null,
                            interval_data: intervalsMap[driverNum] || null,
                            tyre_data: stintsMap[driverNum] || null,
                            lap_data: lapsMap[driverNum] || null,
                            pit_count: pitsMap[driverNum] || 0
                        };
                    });

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

                if (rcRes.status === 'fulfilled') {
                    // Race control messages can be large; we keep the whole array but usually only render the latest
                    setRaceControl(rcRes.value);
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
    }, [session, driversInfo]);

    return { session, positions, weather, raceControl, loading, error };
};

// --- Helpers ---

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

// Generic helper to get the absolute last entry for each driver in a timeline
const mapLatestByDriver = (dataArray) => {
    if (!dataArray || dataArray.length === 0) return {};
    const map = {};
    dataArray.forEach(entry => {
        const dNum = entry.driver_number;
        if (!map[dNum] || new Date(entry.date) > new Date(map[dNum].date)) {
            map[dNum] = entry;
        }
    });
    return map;
};

// Specialist helper for pit stops (count per driver)
const mapByDriverCount = (dataArray) => {
    if (!dataArray || dataArray.length === 0) return {};
    const countMap = {};
    dataArray.forEach(entry => {
        const dNum = entry.driver_number;
        countMap[dNum] = (countMap[dNum] || 0) + 1;
    });
    return countMap;
};
