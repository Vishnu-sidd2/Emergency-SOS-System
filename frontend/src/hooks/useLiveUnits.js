import { useState, useEffect } from "react";

// Mock dispatcher units with enhanced data
const mockDispatcherUnits = [
  {
    id: "amb-001",
    type: "ambulance",
    name: "Ambulance Alpha",
    hospital: "City General Hospital",
    location: { latitude: 40.7589, longitude: -73.9851 },
    status: "available",
    speed: 0,
    heading: 90,
    crew: "Dr. Sarah Chen, EMT Mike Johnson"
  },
  {
    id: "amb-002", 
    type: "ambulance",
    name: "Ambulance Beta",
    hospital: "St. Mary's Hospital",
    location: { latitude: 40.7505, longitude: -73.9934 },
    status: "en_route",
    speed: 45,
    heading: 180,
    crew: "Dr. James Wilson, EMT Lisa Park"
  },
  {
    id: "fire-001",
    type: "fire_truck",
    name: "Engine 19",
    hospital: "Fire Station 19",
    location: { latitude: 40.7614, longitude: -73.9776 },
    status: "available",
    speed: 0,
    heading: 0,
    crew: "Capt. Rodriguez, 4 Firefighters"
  },
  {
    id: "pol-001",
    type: "police",
    name: "Unit 12-Adam",
    hospital: "Police Station 12",
    location: { latitude: 40.7505, longitude: -73.9857 },
    status: "dispatched",
    speed: 40,
    heading: 270,
    crew: "Off. Williams, Off. Thompson"
  }
];

export const useLiveUnits = () => {
  const [liveUnits, setLiveUnits] = useState(mockDispatcherUnits);

  useEffect(() => {
    // Update unit positions every 3 seconds
    const interval = setInterval(() => {
      setLiveUnits(prevUnits => 
        prevUnits.map(unit => {
          if (unit.status === 'en_route' || unit.status === 'dispatched') {
            const newLat = unit.location.latitude + (Math.random() - 0.5) * 0.001;
            const newLng = unit.location.longitude + (Math.random() - 0.5) * 0.001;
            return {
              ...unit,
              location: { latitude: newLat, longitude: newLng },
              speed: Math.random() * 50 + 20,
              heading: Math.random() * 360
            };
          }
          return unit;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { liveUnits };
};