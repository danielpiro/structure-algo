import React from 'react';
import { WindowDetails } from '../types';

interface WindowModelProps {
  details: WindowDetails;
}

const WindowModel: React.FC<WindowModelProps> = ({ details }) => {
  const { frameWidth, glassThickness, totalWidth, totalHeight } = details;

  const colorMap = {
    frame: 0x92400E, // Tailwind yellow-800
    glass: 0xE0F2FE  // Tailwind sky-100
  };

  return (
    <group>
      {/* Window frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[totalWidth, totalHeight, frameWidth]} />
        <meshStandardMaterial color={colorMap.frame} />
      </mesh>
      {/* Glass pane */}
      <mesh position={[0, 0, frameWidth / 2 + glassThickness / 2]}>
        <boxGeometry args={[totalWidth - frameWidth * 2, totalHeight - frameWidth * 2, glassThickness]} />
        <meshStandardMaterial color={colorMap.glass} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

export default WindowModel;