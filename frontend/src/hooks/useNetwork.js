import { useState, useEffect } from "react";

export const useNetwork = () => {
  const [networkStatus, setNetworkStatus] = useState("online");
  const [connectionSpeed, setConnectionSpeed] = useState("4g");

  const updateNetworkStatusAndSpeed = () => {
    setNetworkStatus(navigator.onLine ? "online" : "offline");

    if ('connection' in navigator) {
      const connection = navigator.connection;
      setConnectionSpeed(connection.effectiveType || "4g");
      // You could also get other properties like connection.rtt (round-trip time)
    } else {
      setConnectionSpeed("N/A"); // Indicate if API is not supported
    }
  };

  useEffect(() => {
    updateNetworkStatusAndSpeed(); // Initial check

    window.addEventListener('online', updateNetworkStatusAndSpeed);
    window.addEventListener('offline', updateNetworkStatusAndSpeed);

    // Add listener for changes in connection properties (e.g., 4G to 5G)
    if ('connection' in navigator) {
      navigator.connection.addEventListener('change', updateNetworkStatusAndSpeed);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatusAndSpeed);
      window.removeEventListener('offline', updateNetworkStatusAndSpeed);
      if ('connection' in navigator) {
        navigator.connection.removeEventListener('change', updateNetworkStatusAndSpeed);
      }
    };
  }, []);

  return { networkStatus, connectionSpeed };
};