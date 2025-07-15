import { useState, useEffect } from "react";
import { fetchUnits } from "../utils/api";

export const useUnits = () => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    loadUnits();
  }, []);

  const loadUnits = async () => {
    try {
      const response = await fetchUnits();
      setUnits(response.data);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  return { units };
};