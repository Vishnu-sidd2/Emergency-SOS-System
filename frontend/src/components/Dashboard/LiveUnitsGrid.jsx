import React from "react";
import { motion } from "framer-motion";

const LiveUnitsGrid = ({ liveUnits }) => {
  const getStatusBadgeColor = (status) => {
    const colors = {
      available: 'bg-green-500/20 text-green-400',
      en_route: 'bg-blue-500/20 text-blue-400',
      dispatched: 'bg-yellow-500/20 text-yellow-400',
      on_scene: 'bg-purple-500/20 text-purple-400'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800/40 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-gray-700/50"
    >
      <h2 className="text-3xl font-bold text-white mb-6">🚑 Live Dispatcher Units</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {liveUnits.map((unit, index) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-700/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white">{unit.name}</h3>
              <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusBadgeColor(unit.status)}`}>
                {unit.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">{unit.hospital}</p>
            <p className="text-gray-400 text-sm mb-2">{unit.crew}</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">Speed:</span>
                <span className="text-white font-medium">{Math.round(unit.speed)} mph</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">📍</span>
                <span className="text-white text-xs">
                  {unit.location.latitude.toFixed(3)}, {unit.location.longitude.toFixed(3)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LiveUnitsGrid;