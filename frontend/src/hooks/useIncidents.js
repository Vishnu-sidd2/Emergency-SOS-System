import { useState, useEffect } from "react";
import { fetchIncidents } from "../utils/api";

export const useIncidents = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      const response = await fetchIncidents();
      setIncidents(response.data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  const addIncident = (newIncident) => {
    setIncidents(prev => [...prev, newIncident]);
  };

  const updateIncident = () => {
    loadIncidents();
  };

  return { incidents, addIncident, updateIncident };
};