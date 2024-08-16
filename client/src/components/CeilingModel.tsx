import React from 'react';
import { CeilingDetails } from '../types';

interface CeilingModelProps {
  details: CeilingDetails;
}

const CeilingModel: React.FC<CeilingModelProps> = ({ details }) => {
  const totalThickness = Object.values(details).reduce((sum, value) => sum + value, 0);
  let currentPosition = -totalThickness / 2;

  const colorMap: Record<keyof CeilingDetails, number> = {
    paint: 0xFFFBEB,     // Tailwind yellow-50
    plaster: 0xF3F4F6,   // Tailwind gray-100
    joists: 0x92400E,    // Tailwind yellow-800
    insulation: 0xFCE7F3 // Tailwind pink-200
  };

  const layers = Object.entries(details).map(([key, thickness]) => {
    const position = currentPosition + thickness / 2;
    currentPosition += thickness;

    return (
      <mesh key={key} position={[0, position, 0]}>
        <boxGeometry args={[200, thickness, 200]} />
        <meshStandardMaterial color={colorMap[key as keyof CeilingDetails]} />
      </mesh>
    );
  });

  return <group>{layers}</group>;
};

export default CeilingModel;