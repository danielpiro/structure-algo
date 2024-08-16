import React from 'react';
import { FloorDetails } from '../types';

interface FloorModelProps {
  details: FloorDetails;
}

const FloorModel: React.FC<FloorModelProps> = ({ details }) => {
  const totalThickness = Object.values(details).reduce((sum, value) => sum + value, 0);
  let currentPosition = -totalThickness / 2;

  const colorMap: Record<keyof FloorDetails, number> = {
    carpet: 0xD1D5DB,    // Tailwind gray-300
    underlay: 0xFDE68A,  // Tailwind yellow-200
    concrete: 0x9CA3AF,  // Tailwind gray-400
    insulation: 0xFCE7F3 // Tailwind pink-200
  };

  const layers = Object.entries(details).map(([key, thickness]) => {
    const position = currentPosition + thickness / 2;
    currentPosition += thickness;

    return (
      <mesh key={key} position={[0, position, 0]}>
        <boxGeometry args={[200, thickness, 200]} />
        <meshStandardMaterial color={colorMap[key as keyof FloorDetails]} />
      </mesh>
    );
  });

  return <group>{layers}</group>;
};

export default FloorModel;