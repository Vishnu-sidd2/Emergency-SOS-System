import React from "react";
import { motion } from "framer-motion";
import { Wifi, WifiOff } from "lucide-react";

const NetworkStatus = ({ networkStatus, connectionSpeed }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-gray-700/50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {networkStatus === 'online' ? (
            <Wifi className="w-5 h-5 text-green-400" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-400" />
          )}
          <span className="text-gray-300">Network Status</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${networkStatus === 'online' ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className={`text-sm font-medium ${networkStatus === 'online' ? 'text-green-400' : 'text-red-400'}`}>
            {networkStatus === 'online' ? 'ONLINE' : 'OFFLINE'} ({connectionSpeed})
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default NetworkStatus;