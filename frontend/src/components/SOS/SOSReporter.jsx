import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import SOSHeader from "./SOSHeader";
import NetworkStatus from "./NetworkStatus";
import EmergencyTypeSelector from "./EmergencyTypeSelector";
import LocationSection from "./LocationSection";
import ReporterNameInput from "./ReporterNameInput";
import SubmitButton from "./SubmitButton";
import { useNetwork } from "../../hooks/useNetwork";
import { useLocation } from "../../hooks/useLocation";
import { submitEmergency } from "../../utils/api";

const SOSReporter = ({ onIncidentReported }) => {
  const [selectedType, setSelectedType] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { networkStatus, connectionSpeed } = useNetwork();
  const { location, isGettingLocation, getCurrentLocation } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedType || !location) {
      alert("Please select emergency type and get your location.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitEmergency({
        type: selectedType,
        location: location,
        reporter_name: reporterName || "Anonymous"
      });

      alert("🚨 Emergency reported successfully! Help is on the way.");
      onIncidentReported(response.data);
      
      // Reset form
      setSelectedType("");
      setReporterName("");
      
    } catch (error) {
      console.error("Error reporting emergency:", error);
      alert("Failed to report emergency. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: { tension: 280, friction: 60 }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <SOSHeader />
        
        <NetworkStatus networkStatus={networkStatus} connectionSpeed={connectionSpeed} />

        <animated.div style={springProps}>
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <EmergencyTypeSelector 
                selectedType={selectedType} 
                setSelectedType={setSelectedType} 
              />
              
              <LocationSection 
                location={location}
                isGettingLocation={isGettingLocation}
                getCurrentLocation={getCurrentLocation}
              />
              
              <ReporterNameInput 
                reporterName={reporterName}
                setReporterName={setReporterName}
              />
              
              <SubmitButton 
                isSubmitting={isSubmitting}
                selectedType={selectedType}
                location={location}
                networkStatus={networkStatus}
              />
            </form>
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default SOSReporter;