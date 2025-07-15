import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import IncidentCard from "./IncidentCard";

const ActiveIncidents = ({ incidents, onStatusUpdate, selectedIncident, setSelectedIncident }) => {
  // Defensive check: Ensure incidents is an array before filtering.
  // If incidents is null, undefined, or not an array, it defaults to an empty array.
  const incidentsArray = Array.isArray(incidents) ? incidents : [];

  const activeIncidents = incidentsArray.filter(incident => incident.status !== 'resolved');

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
          {activeIncidents.length > 0 ? ( // Only map if there are active incidents
            activeIncidents.map((incident, index) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                index={index}
                onStatusUpdate={onStatusUpdate}
                isSelected={selectedIncident === incident.id}
                onSelect={() => setSelectedIncident(incident.id)}
              />
            ))
          ) : (
            // Display a message when no active incidents are found
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-center py-4"
            >
              No active incidents to display.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ActiveIncidents;