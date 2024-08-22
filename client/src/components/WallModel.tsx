import React, { useMemo } from "react";
import { LayerType } from "../types";
import { ThreeEvent } from "@react-three/fiber";

interface WallModelProps {
  layers: LayerType[];
  onLayerClick: (layer: LayerType) => void;
  selectedLayerId: string | undefined;
}

const WallModel: React.FC<WallModelProps> = ({
  layers,
  onLayerClick,
  selectedLayerId,
}) => {
  const wallWidth = 300;
  const wallHeight = 200;
  const maxWallThickness = 50; // Maximum thickness of the wall

  const { scaledLayers, totalThickness } = useMemo(() => {
    const totalThickness = layers.reduce(
      (sum, layer) => sum + layer.thickness,
      0
    );
    const scale = maxWallThickness / totalThickness;

    const scaledLayers = layers.map((layer) => ({
      ...layer,
      scaledThickness: layer.thickness * scale,
    }));
    return { scaledLayers, totalThickness: maxWallThickness };
  }, [layers]);

  const renderedLayers = scaledLayers.map((layer, index) => {
    const previousLayersThickness = scaledLayers
      .slice(0, index)
      .reduce((sum, l) => sum + l.scaledThickness, 0);
    const position =
      -totalThickness / 2 + previousLayersThickness + layer.scaledThickness / 2;

    return (
      <mesh
        key={layer.id}
        position={[position, 0, 0]}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation();
          onLayerClick(layer);
        }}
      >
        <boxGeometry args={[layer.scaledThickness, wallHeight, wallWidth]} />
        <meshStandardMaterial color={layer.color} />
      </mesh>
    );
  });

  return <group rotation={[0, Math.PI / 2, 0]}>{renderedLayers}</group>;
};

export default WallModel;
