import React from "react";
import { motion } from "framer-motion";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Navigation, Radar } from "lucide-react";

const LocationSection = ({ location, isGettingLocation, getCurrentLocation }) => {
  return (
    <div>
      <label className="block text-2xl font-bold mb-6 text-white">
        Emergency Location
      </label>
      {location ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <MapPinIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-green-300 font-medium">Location Acquired</p>
              <p className="text-white text-lg">{location.address}</p>
              <p className="text-green-400 text-sm">
                Updated: {new Date(location.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={getCurrentLocation}
            className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
          >
            🔄 Update Location
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isGettingLocation ? (
            <div className="flex items-center justify-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6"
              >
                <Radar className="w-6 h-6" />
              </motion.div>
              <span>Getting Location...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-3">
              <Navigation className="w-6 h-6" />
              <span>📍 Get My Location</span>
            </div>
          )}
        </motion.button>
      )}
    </div>
  );
};

export default LocationSection;