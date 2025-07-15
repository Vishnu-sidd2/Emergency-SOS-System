import React from "react";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Zap } from "lucide-react";

const SubmitButton = ({ isSubmitting, selectedType, location, networkStatus }) => {
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting || !selectedType || !location || networkStatus === 'offline'}
        className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-6 rounded-2xl font-bold text-2xl transition-all duration-300 hover:from-red-600 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8"
            >
              <Zap className="w-8 h-8" />
            </motion.div>
            <span>Sending Emergency...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-3">
            <ExclamationTriangleIcon className="w-8 h-8" />
            <span>🚨 SEND EMERGENCY ALERT</span>
          </div>
        )}
      </motion.button>
      
      {networkStatus === 'offline' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-4 bg-red-500/20 backdrop-blur-lg rounded-2xl border border-red-500/30"
        >
          <p className="text-red-400 font-medium">
            ⚠️ No network connection. Emergency will be sent when connection is restored.
          </p>
        </motion.div>
      )}
    </>
  );
};

export default SubmitButton;