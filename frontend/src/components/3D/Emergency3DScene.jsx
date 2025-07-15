import React from "react";
import { Plane } from "@react-three/drei";
import Emergency3DSphere from "./Emergency3DSphere";
import Unit3D from "./Unit3D";

const Emergency3DScene = ({ incidents, units }) => {
  return (
    <group>
      {/* Ground Plane */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial 
          color="#1a1a2e" 
          emissive="#0f0f23"
          emissiveIntensity={0.1}
          roughness={0.8}
          metalness={0.2}
        />
      </Plane>
      
      {/* Grid Lines */}
      {Array.from({ length: 21 }).map((_, i) => (
        <React.Fragment key={i}>
          <mesh position={[i - 10, -1.9, 0]}>
            <boxGeometry args={[0.02, 0.02, 20]} />
            <meshStandardMaterial color="#333366" emissive="#333366" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0, -1.9, i - 10]}>
            <boxGeometry args={[20, 0.02, 0.02]} />
            <meshStandardMaterial color="#333366" emissive="#333366" emissiveIntensity={0.2} />
          </mesh>
        </React.Fragment>
      ))}
      
      {/* Emergency Incidents */}
      {incidents.filter(incident => incident.status !== 'resolved').map((incident, index) => (
        <Emergency3DSphere
          key={incident.id}
          position={[
            (index % 4) * 3 - 4.5,
            Math.sin(index * 0.5) * 0.5,
            Math.floor(index / 4) * 3 - 2
          ]}
          type={incident.type}
          status={incident.status}
          pulsing={incident.status === 'reported'}
        />
      ))}
      
      {/* Emergency Units */}
      {units.map((unit, index) => (
        <Unit3D
          key={unit.id}
          position={[
            (index % 3) * 4 - 4,
            0.5,
            -6 + Math.floor(index / 3) * 2
          ]}
          type={unit.type}
          status={unit.status}
          speed={unit.speed}
        />
      ))}
    </group>
  );
};

export default Emergency3DScene;