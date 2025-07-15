import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const Unit3D = ({ position, type, status, speed = 0 }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const colorMap = {
    ambulance: '#10b981',
    fire_truck: '#ef4444',
    police: '#3b82f6'
  };

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed > 0 ? 0.02 : 0.005;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.4, 0.4, 0.8]} />
        <meshStandardMaterial 
          color={colorMap[type]} 
          emissive={colorMap[type]}
          emissiveIntensity={hovered ? 0.4 : 0.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      
      {/* Movement Trail */}
      {speed > 0 && (
        <mesh position={[position[0], position[1] - 0.1, position[2] - 1]}>
          <planeGeometry args={[0.2, 2]} />
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#10b981"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}
    </Float>
  );
};

export default Unit3D;