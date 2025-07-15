import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Emergency API functions
export const submitEmergency = async (emergencyData) => {
  return await axios.post(`${API}/incidents`, emergencyData);
};

export const fetchIncidents = async () => {
  return await axios.get(`${API}/incidents`);
};

export const fetchUnits = async () => {
  return await axios.get(`${API}/units`);
};

export const fetchStats = async () => {
  return await axios.get(`${API}/dashboard/stats`);
};

export const updateIncidentStatus = async (incidentId, newStatus) => {
  return await axios.put(`${API}/incidents/${incidentId}`, {
    status: newStatus
  });
};

// Unit API functions
export const createUnit = async (unitData) => {
  return await axios.post(`${API}/units`, unitData);
};

export const updateUnit = async (unitId, updateData) => {
  return await axios.put(`${API}/units/${unitId}`, updateData);
};