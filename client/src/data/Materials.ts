export type item = {
  material: string;
  manufacturer: string;
  product: string;
  min: number;
  max: number;
  thermalConductivity: number;
  specificMass: number;
};

export const db: item[] = [
  {
    material: "טיח תרמי",
    manufacturer: `ת"י`,
    product: "200",
    min: 0.01,
    max: 0.08,
    thermalConductivity: 0.07,
    specificMass: 200,
  },
  {
    material: "טיח תרמי",
    manufacturer: `ת"י`,
    product: "300",
    min: 0.01,
    max: 0.08,
    thermalConductivity: 0.094,
    specificMass: 300,
  },
  {
    material: "טיח תרמי",
    manufacturer: `ת"י`,
    product: "400",
    min: 0.01,
    max: 0.08,
    thermalConductivity: 0.115,
    specificMass: 400,
  },
  {
    material: "טיח תרמי",
    manufacturer: "טמבור",
    product: "200",
    min: 0.01,
    max: 0.08,
    thermalConductivity: 0.0653,
    specificMass: 200,
  },
  {
    material: "טיח תרמי",
    manufacturer: "טמבור",
    product: "86",
    min: 0.01,
    max: 0.08,
    thermalConductivity: 0.124,
    specificMass: 400,
  },
  {
    material: "טיח תרמי",
    manufacturer: "תרמופיקס",
    product: "750",
    min: 0.01,
    max: 0.05,
    thermalConductivity: 0.086,
    specificMass: 300,
  },
  {
    material: "טיח תרמי",
    manufacturer: "תרמופיקס",
    product: "760",
    min: 0.01,
    max: 0.05,
    thermalConductivity: 0.105,
    specificMass: 400,
  },
  {
    material: "בטון",
    manufacturer: "בטון רגיל",
    product: "בטון רגיל",
    min: 0.05,
    max: 1,
    thermalConductivity: 2.1,
    specificMass: 2400,
  },
  {
    material: "בטקל",
    manufacturer: "בטון קל",
    product: "בטון קל 1200",
    min: 0.05,
    max: 0.4,
    thermalConductivity: 0.62,
    specificMass: 1200,
  },
  {
    material: "טיט",
    manufacturer: "טיט",
    product: "מלט צמנטי",
    min: 0.01,
    max: 0.08,
    thermalConductivity: 1,
    specificMass: 1800,
  },
  {
    material: "בלוק",
    manufacturer: "טרמודן",
    product: "פומיס דור 5 - 22",
    min: 0.22,
    max: 0.22,
    thermalConductivity: 0.22,
    specificMass: 1047,
  },
  {
    material: "בלוק",
    manufacturer: "טרמודן",
    product: "פומיס דור 5 - 30",
    min: 0.3,
    max: 0.3,
    thermalConductivity: 0.3,
    specificMass: 772,
  },
  {
    material: "בלוק",
    manufacturer: "טרמודן",
    product: "פומיס דור 5 - 25",
    min: 0.25,
    max: 0.25,
    thermalConductivity: 0.227,
    specificMass: 920,
  },
  {
    material: "בלוק",
    manufacturer: "איטונג",
    product: "בלוק איטונג",
    min: 0.2,
    max: 0.3,
    thermalConductivity: 0.1305,
    specificMass: 400,
  },
  {
    material: "בלוק",
    manufacturer: "בלוק רביד",
    product: "פומיס זהב 22",
    min: 0.22,
    max: 0.22,
    thermalConductivity: 0.191,
    specificMass: 801,
  },
  {
    material: "בלוק",
    manufacturer: "בלוק רביד",
    product: "פומיס זהב 25",
    min: 0.25,
    max: 0.25,
    thermalConductivity: 0.166,
    specificMass: 867,
  },
  {
    material: "לוח מבודד",
    manufacturer: "פוליביד",
    product: "לוח פוליאש 200",
    min: 0.02,
    max: 0.06,
    thermalConductivity: 0.0676,
    specificMass: 200,
  },
  {
    material: "לוח מבודד",
    manufacturer: "פוליביד",
    product: "לוח פוליאש אקסטרה",
    min: 0.02,
    max: 0.06,
    thermalConductivity: 0.0513,
    specificMass: 140,
  },
  {
    material: "לוח מבודד",
    manufacturer: "פוליביד",
    product: "לוח פוליאש פרימיום",
    min: 0.02,
    max: 0.06,
    thermalConductivity: 0.0456,
    specificMass: 100,
  },
  {
    material: "לוח מבודד",
    manufacturer: "מלגול",
    product: "פומגלאס",
    min: 0.03,
    max: 0.1,
    thermalConductivity: 0.043,
    specificMass: 130,
  },
  {
    material: "לוח מבודד",
    manufacturer: "מלגול",
    product: "סולרגלאס",
    min: 0.03,
    max: 0.1,
    thermalConductivity: 0.043,
    specificMass: 120,
  },
  {
    material: "לוח מבודד",
    manufacturer: "קל מוצרי בידוד",
    product: "פיירטופ",
    min: 0.03,
    max: 0.07,
    thermalConductivity: 0.0606,
    specificMass: 180,
  },
  {
    material: "טיח פנים",
    manufacturer: "מיסטרפיקס",
    product: "פיקסימו 640",
    min: 0.01,
    max: 0.05,
    thermalConductivity: 0.87,
    specificMass: 300,
  },
];

export const materials = db.reduce((acc, material) => {
  if (!acc.includes(material.material)) {
    acc.push(material.material);
  }
  return acc;
}, [] as string[]);

export const manufacturers = (material: string) => {
  if (!material) {
    return [];
  }
  return db
    .filter((item) => item.material === material)
    .reduce((acc, item) => {
      if (!acc.includes(item.manufacturer)) {
        acc.push(item.manufacturer);
      }
      return acc;
    }, [] as string[])
    .map((manufacturer) => manufacturer);
};

export const products = (material: string, manufacturer: string) => {
  if (!material || !manufacturer) {
    return [];
  }
  return db
    .filter(
      (item) => item.material === material && item.manufacturer === manufacturer
    )
    .map((item) => item.product);
};

export const getItem = (
  material: string,
  manufacturer: string,
  product: string
) => {
  return db.find(
    (item) =>
      item.material === material &&
      item.manufacturer === manufacturer &&
      item.product === product
  );
};
