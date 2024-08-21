import React from 'react';
import { LayerType } from '../types';

interface WallModelProps {
  layers: LayerType[];
}

const WallModel: React.FC<WallModelProps> = ({ layers }) => {
  const totalThickness = layers.reduce((sum, layer) => sum + layer.thickness, 0);
  const scale = 200 / totalThickness;
  let currentPosition = -100;

  const renderedLayers = layers.map((layer) => {
    const scaledThickness = layer.thickness * scale;
    const position = currentPosition + scaledThickness / 2;
    currentPosition += scaledThickness;

    return (
      <mesh key={layer.id} position={[position, 0, 0]}>
        <boxGeometry args={[scaledThickness, 200, 200]} />
        <meshStandardMaterial color={layer.color} />
      </mesh>
    );
  });

  return <group>{renderedLayers}</group>;
};

export default WallModel;