import React from "react";
import { motion } from "framer-motion";
import { FireIcon, HeartIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

const EmergencyTypeSelector = ({ selectedType, setSelectedType }) => {
  const emergencyTypes = [
    { 
      value: "fire", 
      label: "Fire Emergency", 
      icon: FireIcon,
      color: "from-red-500 to-red-700",
      description: "Building fire, explosion, hazmat"
    },
    { 
      value: "medical", 
      label: "Medical Emergency", 
      icon: HeartIcon,
      color: "from-emerald-500 to-emerald-700",
      description: "Heart attack, injury, overdose"
    },
    { 
      value: "police", 
      label: "Police Emergency", 
      icon: ShieldCheckIcon,
      color: "from-blue-500 to-blue-700",
      description: "Crime, violence, threats"
    }
  ];

  return (
    <div>
      <label className="block text-2xl font-bold mb-6 text-white">
        Select Emergency Type
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {emergencyTypes.map((type) => (
          <motion.div
            key={type.value}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
              selectedType === type.value
                ? 'ring-4 ring-white/50 shadow-2xl'
                : 'hover:shadow-xl'
            }`}
            onClick={() => setSelectedType(type.value)}
          >
            <div className={`bg-gradient-to-br ${type.color} p-6 h-full`}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <type.icon className="w-12 h-12 text-white drop-shadow-lg" />
                  {selectedType === type.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                    >
                      <span className="text-green-500 text-sm">✓</span>
                    </motion.div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">{type.label}</h3>
                <p className="text-white/80 text-sm">{type.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyTypeSelector;