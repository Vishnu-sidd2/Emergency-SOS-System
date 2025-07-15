import React from "react";
import { motion } from "framer-motion";

const SOSHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-8"
    >
      <div className="relative">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent mb-4">
          🚨 Emergency SOS
        </h1>
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-red-500/20 -z-10"></div>
      </div>
      <p className="text-gray-300 text-lg">Ultra-fast emergency response system</p>
    </motion.div>
  );
};

export default SOSHeader;