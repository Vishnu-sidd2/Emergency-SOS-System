import React from "react";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon, TruckIcon, ClockIcon } from "@heroicons/react/24/solid";
import { Activity } from "lucide-react";

const StatsCards = ({ stats, liveUnits }) => {
  const statsData = [
    { 
      title: "Total Incidents", 
      value: stats.total_incidents || 0, 
      icon: ExclamationTriangleIcon, 
      color: "from-blue-500 to-blue-700" 
    },
    { 
      title: "Active Incidents", 
      value: stats.active_incidents || 0, 
      icon: Activity, 
      color: "from-red-500 to-red-700" 
    },
    { 
      title: "Available Units", 
      value: liveUnits.filter(u => u.status === 'available').length, 
      icon: TruckIcon, 
      color: "from-green-500 to-green-700" 
    },
    { 
      title: "Avg Response Time", 
      value: `${Math.round(stats.avg_response_time_seconds / 60) || 0}m`, 
      icon: ClockIcon, 
      color: "from-purple-500 to-purple-700" 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;