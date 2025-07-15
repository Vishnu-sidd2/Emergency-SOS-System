import React from "react";
import { motion } from "framer-motion";
import { updateIncidentStatus } from "../../utils/api";

const IncidentCard = ({ incident, index, onStatusUpdate, isSelected, onSelect }) => {
  const statusColors = {
    reported: "from-red-500 to-red-700",
    dispatched: "from-yellow-500 to-yellow-700",
    en_route: "from-blue-500 to-blue-700",
    on_scene: "from-purple-500 to-purple-700",
    resolved: "from-green-500 to-green-700"
  };

  const getEmergencyIcon = (type) => {
    const icons = {
      fire: "🔥",
      medical: "🚑",
      police: "🚔"
    };
    return icons[type] || "🚨";
  };

  const handleStatusUpdate = async (incidentId, newStatus) => {
    try {
      await updateIncidentStatus(incidentId, newStatus);
      onStatusUpdate();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-gray-700/50 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'border-blue-500/50 shadow-lg shadow-blue-500/20' 
          : 'border-gray-600/50 hover:border-gray-500/50'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
            incident.type === 'fire' ? 'from-red-500 to-red-700' :
            incident.type === 'medical' ? 'from-emerald-500 to-emerald-700' :
            'from-blue-500 to-blue-700'
          } flex items-center justify-center`}>
            <span className="text-2xl">
              {getEmergencyIcon(incident.type)}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white capitalize">
              {incident.type} Emergency
            </h3>
            <p className="text-gray-400">Reporter: {incident.reporter_name || 'Anonymous'}</p>
            <p className="text-gray-400 text-sm">
              📍 {incident.location.address} | 
              🕒 {new Date(incident.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${statusColors[incident.status]} text-white font-medium`}>
          {incident.status.replace('_', ' ').toUpperCase()}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {['dispatched', 'en_route', 'on_scene', 'resolved'].map((status) => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleStatusUpdate(incident.id, status);
            }}
            disabled={incident.status === status}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              incident.status === status
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {status.replace('_', ' ').toUpperCase()}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default IncidentCard;