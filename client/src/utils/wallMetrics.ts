import { LayerType } from "../types";

export const calculateWallMetrics = (layers: LayerType[]) => {
  const totalThickness = layers.reduce(
    (sum, layer) => sum + layer.thickness,
    0
  );
  const insulationLayer = layers.find((layer) =>
    layer.material.toLowerCase().includes("insulation")
  );
  const insulationRatio = insulationLayer
    ? insulationLayer.thickness / totalThickness
    : 0;
  const isWellInsulated = insulationRatio > 0.5;
  return { totalThickness, insulationRatio, isWellInsulated };
};
