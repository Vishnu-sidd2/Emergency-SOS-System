import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Navigation from "./components/UI/Navigation";
import SOSReporter from "./components/SOS/SOSReporter";
import DispatcherDashboard from "./components/Dashboard/DispatcherDashboard";
import { useIncidents } from "./hooks/useIncidents";
import { useUnits } from "./hooks/useUnits";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("sos");
  const { incidents, addIncident, updateIncident } = useIncidents();
  const { units } = useUnits();

  const handleIncidentReported = (newIncident) => {
    addIncident(newIncident);
  };

  const handleStatusUpdate = () => {
    updateIncident();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />

      <main>
        <AnimatePresence mode="wait">
          {currentView === "sos" ? (
            <motion.div
              key="sos"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <SOSReporter onIncidentReported={handleIncidentReported} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <DispatcherDashboard 
                incidents={incidents} 
                units={units} 
                onStatusUpdate={handleStatusUpdate} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;