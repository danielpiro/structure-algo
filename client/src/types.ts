export type LayerType = {
  id: string;
  material: string;
  manufacturer: string;
  product: string;
  min: number;
  max: number;
  thickness: number;
  thermal: number;
  mass: number;
  color: string;
};

export type ModelDetails = {
  layers: LayerType[];
};

export type ModelType = "Wall";
