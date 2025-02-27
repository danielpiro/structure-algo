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
  color?: string;
  texture?: number;
};

export type Model = {
  id: string;
  material: string;
  manufacturer: string;
  product: string;
  min: number;
  max: number;
  thickness: number;
  thermalConductivity: number;
  specificMass: number;
};

export type ModelDetails = {
  layers: LayerType[];
};

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export type ModelType = "Wall";

export interface ProjectSettings {
  projectType: string;
  projectLocation: string;
  modelType: string;
  isolationType: string;
  wallColor: string;
}

export interface WorkflowState {
  isProjectConfigured: boolean;
  isModelConfigured: boolean;
}
