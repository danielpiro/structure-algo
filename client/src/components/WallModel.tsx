import React from 'react';
import { WallDetails } from '../types';

interface WallModelProps {
  details: WallDetails;
}

const WallModel: React.FC<WallModelProps> = ({ details }) => {
  const totalThickness = Object.values(details).reduce((sum, value) => sum + value, 0);
  let currentPosition = -totalThickness / 2;

  const colorMap: Record<keyof WallDetails, number> = {
    plasterboard: 0xE5E7EB, // Tailwind gray-200
    insulation: 0xFCE7F3,   // Tailwind pink-200
    fireWetStop: 0x92400E,  // Tailwind yellow-800
    weathertex: 0x9CA3AF    // Tailwind gray-400
  };

  const layers = Object.entries(details).map(([key, thickness]) => {
    const position = currentPosition + thickness / 2;
    currentPosition += thickness;

    return (
      <mesh key={key} position={[position, 0, 0]}>
        <boxGeometry args={[thickness, 200, 200]} />
        <meshStandardMaterial color={colorMap[key as keyof WallDetails]} />
      </mesh>
    );
  });

  return <group>{layers}</group>;
};

export default WallModel;