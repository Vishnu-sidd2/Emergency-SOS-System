import React, { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Emergency3DScene from "./Emergency3DScene";

const Emergency3DMap = ({ incidents, units }) => {
  const canvasRef = useRef();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-800/40 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-gray-700/50"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">🌍 3D Emergency Map</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-medium">LIVE</span>
        </div>
      </div>
      
      <div className="h-96 rounded-2xl overflow-hidden" ref={canvasRef}>
        <Canvas camera={{ position: [0, 10, 10], fov: 60 }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0000" />
            <pointLight position={[10, -10, -10]} intensity={0.5} color="#00ff00" />
            <pointLight position={[0, 10, 10]} intensity={0.5} color="#0000ff" />
            
            <Emergency3DScene incidents={incidents} units={units} />
            
            <OrbitControls 
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              minDistance={5}
              maxDistance={20}
            />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="mt-4 text-sm text-gray-400">
        🎮 Use mouse to rotate, zoom, and pan the 3D map
      </div>
    </motion.div>
  );
};

export default Emergency3DMap;