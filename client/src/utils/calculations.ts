const thermalResistanceData = {
  מגורים: {
    "קיר חוץ": {
      masses: [300, 200, 150, 100],
      resistanceValues: {
        א: [0.6, 0.8, 1.0, 1.25],
        ב: [0.7, 0.9, 1.1, 1.5],
        ג: [0.8, 1.0, 1.2, 1.5],
        ד: [0.9, 1.0, 1.2, 1.5],
      },
    },
    "קיר הפרדה": {
      masses: [200, 100, 50],
      resistanceValues: {
        א: [0.45, 0.6, 1.25],
        ב: [0.55, 0.8, 1.25],
        ג: [0.75, 1.0, 1.25],
        ד: [0.6, 1.0, 1.5],
      },
    },
    "גג עליון": {
      masses: [0],
      resistanceValues: {
        א: [1.5],
        ב: [1.5],
        ג: [1.5],
        ד: [1.5],
      },
    },
    "רצפה מעל אוויר": {
      masses: [0],
      resistanceValues: {
        א: [1.25],
        ב: [1.25],
        ג: [1.25],
        ד: [1.65],
      },
    },
  },
  משרדים: {
    "קיר חוץ": {
      masses: [300, 200, 100],
      resistanceValues: {
        א: [0.4, 0.75, 1.3],
        ב: [0.65, 0.95, 1.5],
        ג: [0.8, 1.0, 1.5],
        ד: [0.9, 1.1, 1.7],
      },
    },
    "קיר הפרדה": {
      masses: [200, 100],
      resistanceValues: {
        א: [0.3, 1.25],
        ב: [0.4, 1.25],
        ג: [0.4, 1.25],
        ד: [0.4, 1.25],
      },
    },
    "גג עליון": {
      masses: [300, 100],
      resistanceValues: {
        א: [1.0, 1.4],
        ב: [1.3, 1.6],
        ג: [1.4, 1.6],
        ד: [1.6, 2.0],
      },
    },
    "רצפה מעל חללים פתוחים": {
      masses: [300, 100],
      resistanceValues: {
        א: [0.7, 1.25],
        ב: [0.9, 1.35],
        ג: [1.0, 1.4],
        ד: [1.1, 1.65],
      },
    },
    "רצפה מעל חללים סגורים שאינם מחוממים או מקוררים": {
      masses: [300, 100],
      resistanceValues: {
        א: [0.45, 1.0],
        ב: [0.6, 1.0],
        ג: [0.7, 1.1],
        ד: [0.8, 1.1],
      },
    },
  },
};

export const linearInterpolate = (
  x: number,
  x0: number,
  x1: number,
  y0: number,
  y1: number
): number => {
  return y0 + (x - x0) * ((y1 - y0) / (x1 - x0));
};

export const calculateThermalResistance = (
  projectType: string,
  elementType: string,
  mass: number,
  projectLocation: string,
  wallColor: string
): number => {
  const projectData =
    thermalResistanceData[projectType as keyof typeof thermalResistanceData];
  if (!projectData) {
    throw new Error(`Invalid project type: ${projectType}`);
  }

  const elementData = projectData[elementType as keyof typeof projectData];
  if (!elementData) {
    throw new Error(`Invalid element type: ${elementType}`);
  }

  const { masses, resistanceValues } = elementData;
  const locationValues =
    resistanceValues[projectLocation as keyof typeof resistanceValues];

  if (!locationValues) {
    throw new Error(`Invalid project location: ${projectLocation}`);
  }

  let baseResistance: number;

  if (mass >= masses[0]) {
    baseResistance = locationValues[0];
  } else if (mass <= masses[masses.length - 1]) {
    baseResistance = locationValues[locationValues.length - 1];
  } else {
    const lowerIndex = masses.findIndex((m) => m <= mass);
    const upperIndex = lowerIndex - 1;

    const lowerMass = masses[lowerIndex];
    const upperMass = masses[upperIndex];
    const lowerResistance = locationValues[lowerIndex];
    const upperResistance = locationValues[upperIndex];

    baseResistance = linearInterpolate(
      mass,
      lowerMass,
      upperMass,
      lowerResistance,
      upperResistance
    );
  }

  if (wallColor === "גוון כהה") {
    if (projectType === "מגורים") {
      if (elementType === "קיר חוץ") {
        if (["א", "ב", "ג"].includes(projectLocation)) {
          baseResistance += 0.3;
        } else if (projectLocation === "ד") {
          baseResistance += 0.5;
        }
      } else if (elementType === "גג עליון") {
        baseResistance += 0.2;
      }
    }
  }

  return baseResistance;
};
