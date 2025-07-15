import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import IncidentCard from "./IncidentCard";

const ActiveIncidents = ({ incidents, onStatusUpdate, selectedIncident, setSelectedIncident }) => {
  const activeIncidents = incidents.filter(incident => incident.status !== 'resolved');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800/40 backdrop-blur-lg rounded-3xl p-6 border border-gray-700/50"
    >
      <h2 className="text-3xl font-bold text-white mb-6">🚨 Active Incidents</h2>
      <div className="space-y-4">
        <AnimatePresence>
          {activeIncidents.map((incident, index) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              index={index}
              onStatusUpdate={onStatusUpdate}
              isSelected={selectedIncident === incident.id}
              onSelect={() => setSelectedIncident(incident.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ActiveIncidents;