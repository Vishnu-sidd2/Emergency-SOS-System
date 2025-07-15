import React from "react";
import { motion } from "framer-motion";

const DashboardHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-8"
    >
      <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
        🏛️ Emergency Dispatch Center
      </h1>
      <p className="text-gray-300 text-lg">Advanced 3D Command & Control System</p>
    </motion.div>
  );
};

export default DashboardHeader;