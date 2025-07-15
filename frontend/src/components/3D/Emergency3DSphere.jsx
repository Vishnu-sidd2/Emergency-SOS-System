import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";

const Emergency3DSphere = ({ position, type, status, pulsing = false }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const colorMap = {
    fire: '#ef4444',
    medical: '#10b981', 
    police: '#3b82f6'
  };
  
  const statusColorMap = {
    reported: '#ef4444',
    dispatched: '#f59e0b',
    en_route: '#3b82f6',
    on_scene: '#8b5cf6',
    resolved: '#10b981'
  };

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (pulsing) {
        meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 
          1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={hovered ? statusColorMap[status] : colorMap[type]} 
          emissive={colorMap[type]}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Status Ring */}
      <mesh position={position}>
        <torusGeometry args={[0.8, 0.05, 16, 32]} />
        <meshStandardMaterial 
          color={statusColorMap[status]} 
          emissive={statusColorMap[status]}
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* 3D Text Label */}
      <Text
        position={[position[0], position[1] + 1, position[2]]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {type.toUpperCase()}
      </Text>
    </Float>
  );
};

export default Emergency3DSphere;