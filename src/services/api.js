import axios from 'axios';
import { OPENF1_BASE_URL, ENDPOINTS } from './endpoints';

// Create a configured axios instance
const apiClient = axios.create({
    baseURL: OPENF1_BASE_URL,
    timeout: 10000,
});

// Helper to get the most recent session
export const getLatestSession = async () => {
    try {
        const response = await apiClient.get(`${ENDPOINTS.SESSIONS}?session_key=latest`);
        return response.data[0]; // The API returns an array, we want the first item
    } catch (error) {
        console.error('Error fetching latest session:', error);
        throw error;
    }
};

// Generic fetcher for session-specific data
const fetchSessionData = async (endpoint, sessionKey, extraParams = {}) => {
    try {
        const params = { session_key: sessionKey, ...extraParams };
        const response = await apiClient.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};

export const getPositions = (sessionKey) => fetchSessionData(ENDPOINTS.POSITIONS, sessionKey);
export const getDrivers = (sessionKey) => fetchSessionData(ENDPOINTS.DRIVERS, sessionKey);
export const getWeather = (sessionKey) => fetchSessionData(ENDPOINTS.WEATHER, sessionKey);
export const getRaceControl = (sessionKey) => fetchSessionData(ENDPOINTS.RACE_CONTROL, sessionKey);
export const getTeamRadio = (sessionKey) => fetchSessionData(ENDPOINTS.RADIO, sessionKey);

export const getIntervals = (sessionKey) => fetchSessionData(ENDPOINTS.INTERVALS, sessionKey);
export const getStints = (sessionKey) => fetchSessionData(ENDPOINTS.STINTS, sessionKey);
export const getLaps = (sessionKey) => fetchSessionData(ENDPOINTS.LAPS, sessionKey);
export const getPitStops = (sessionKey) => fetchSessionData(ENDPOINTS.PIT_STOPS, sessionKey);

// Fetch car data with a specific driver number parameter (required for performance)
export const getCarData = (sessionKey, driverNumber) =>
    fetchSessionData(ENDPOINTS.CAR_DATA, sessionKey, { driver_number: driverNumber });

export default apiClient;
