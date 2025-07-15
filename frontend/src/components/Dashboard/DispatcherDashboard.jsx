import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import Emergency3DMap from "../3D/Emergency3DMap";
import LiveUnitsGrid from "./LiveUnitsGrid";
import ActiveIncidents from "./ActiveIncidents";
import { useLiveUnits } from "../../hooks/useLiveUnits";
import { fetchStats } from "../../utils/api";

const DispatcherDashboard = ({ incidents, units, onStatusUpdate }) => {
  const [stats, setStats] = useState({});
  const [selectedIncident, setSelectedIncident] = useState(null);
  const { liveUnits } = useLiveUnits();

  useEffect(() => {
    loadStats();
  }, [incidents]);

  const loadStats = async () => {
    try {
      const response = await fetchStats();
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        
        <StatsCards stats={stats} liveUnits={liveUnits} />
        
        <Emergency3DMap incidents={incidents} units={liveUnits} />
        
        <LiveUnitsGrid liveUnits={liveUnits} />
        
        <ActiveIncidents 
          incidents={incidents}
          onStatusUpdate={onStatusUpdate}
          selectedIncident={selectedIncident}
          setSelectedIncident={setSelectedIncident}
        />
      </div>
    </div>
  );
};

export default DispatcherDashboard;