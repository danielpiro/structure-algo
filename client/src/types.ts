export interface WallDetails {
  plasterboard: number;
  insulation: number;
  fireWetStop: number;
  weathertex: number;
}

export interface FloorDetails {
  carpet: number;
  underlay: number;
  concrete: number;
  insulation: number;
}

export interface CeilingDetails {
  paint: number;
  plaster: number;
  joists: number;
  insulation: number;
}

export interface WindowDetails {
  frameWidth: number;
  glassThickness: number;
  totalWidth: number;
  totalHeight: number;
}

export type ModelType = "Wall" | "Floor" | "Ceiling" | "Window";

export const modelOptions: ModelType[] = ["Wall", "Floor", "Ceiling", "Window"];

export const initialWallDetails: WallDetails = {
  plasterboard: 10,
  insulation: 90,
  fireWetStop: 16,
  weathertex: 9.5,
};

export const initialFloorDetails: FloorDetails = {
  carpet: 10,
  underlay: 5,
  concrete: 100,
  insulation: 50,
};

export const initialCeilingDetails: CeilingDetails = {
  paint: 1,
  plaster: 10,
  joists: 100,
  insulation: 100,
};

export const initialWindowDetails: WindowDetails = {
  frameWidth: 50,
  glassThickness: 6,
  totalWidth: 1000,
  totalHeight: 1500,
};
