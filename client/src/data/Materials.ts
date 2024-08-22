export type item = {
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

export const db: item[] = [
  {
    material: "טיח תרמי",
    manufacturer: `ת"י`,
    product: "200",
    min: 0.01,
    max: 0.08,
    thickness: 1,
    thermalConductivity: 0.07,
    specificMass: 200,
    id: "1",
  },
  {
    material: "טיח תרמי",
    manufacturer: `ת"י`,
    product: "300",
    min: 0.01,
    max: 0.08,
    thickness: 1,
    thermalConductivity: 0.094,
    specificMass: 300,
    id: "2",
  },
  {
    material: "טיח תרמי",
    manufacturer: `ת"י`,
    product: "400",
    min: 0.01,
    max: 0.08,
    thickness: 1,
    thermalConductivity: 0.115,
    specificMass: 400,
    id: "3",
  },
  {
    material: "טיח תרמי",
    manufacturer: "טמבור",
    product: "200",
    min: 0.01,
    max: 0.08,
    thickness: 1,
    thermalConductivity: 0.0653,
    specificMass: 200,
    id: "4",
  },
  {
    material: "טיח תרמי",
    manufacturer: "טמבור",
    product: "86",
    min: 0.01,
    max: 0.08,
    thickness: 1,
    thermalConductivity: 0.124,
    specificMass: 400,
    id: "5",
  },
  {
    material: "טיח תרמי",
    manufacturer: "תרמופיקס",
    product: "750",
    min: 0.01,
    max: 0.05,
    thickness: 1,
    thermalConductivity: 0.086,
    specificMass: 300,
    id: "6",
  },
  {
    material: "טיח תרמי",
    manufacturer: "תרמופיקס",
    product: "760",
    min: 0.01,
    max: 0.05,
    thickness: 1,
    thermalConductivity: 0.105,
    specificMass: 400,
    id: "7",
  },
  {
    material: "בטון",
    manufacturer: "בטון רגיל",
    product: "בטון רגיל",
    min: 0.05,
    max: 1,
    thickness: 1,
    thermalConductivity: 2.1,
    specificMass: 2400,
    id: "8",
  },
  {
    material: "בטקל",
    manufacturer: "בטון קל",
    product: "בטון קל 1200",
    min: 0.05,
    max: 0.4,
    thickness: 1,
    thermalConductivity: 0.62,
    specificMass: 1200,
    id: "9",
  },
  {
    material: "טיט",
    manufacturer: "טיט",
    product: "מלט צמנטי",
    min: 0.01,
    max: 0.08,
    thickness: 1,
    thermalConductivity: 1,
    specificMass: 1800,
    id: "10",
  },
  {
    material: "בלוק",
    manufacturer: "טרמודן",
    product: "פומיס דור 5 - 22",
    min: 0.22,
    max: 0.22,
    thickness: 1,
    thermalConductivity: 0.22,
    specificMass: 1047,
    id: "11",
  },
  {
    material: "בלוק",
    manufacturer: "טרמודן",
    product: "פומיס דור 5 - 30",
    min: 0.3,
    max: 0.3,
    thickness: 1,
    thermalConductivity: 0.3,
    specificMass: 772,
    id: "12",
  },
  {
    material: "בלוק",
    manufacturer: "טרמודן",
    product: "פומיס דור 5 - 25",
    min: 0.25,
    max: 0.25,
    thickness: 1,
    thermalConductivity: 0.227,
    specificMass: 920,
    id: "13",
  },
  {
    material: "בלוק",
    manufacturer: "איטונג",
    product: "בלוק איטונג",
    min: 0.2,
    max: 0.3,
    thickness: 1,
    thermalConductivity: 0.1305,
    specificMass: 400,
    id: "14",
  },
  {
    material: "בלוק",
    manufacturer: "בלוק רביד",
    product: "פומיס זהב 22",
    min: 0.22,
    max: 0.22,
    thickness: 1,
    thermalConductivity: 0.191,
    specificMass: 801,
    id: "15",
  },
  {
    material: "בלוק",
    manufacturer: "בלוק רביד",
    product: "פומיס זהב 25",
    min: 0.25,
    max: 0.25,
    thickness: 1,
    thermalConductivity: 0.166,
    specificMass: 867,
    id: "16",
  },
  {
    material: "לוח מבודד",
    manufacturer: "פוליביד",
    product: "לוח פוליאש 200",
    min: 0.02,
    max: 0.06,
    thickness: 1,
    thermalConductivity: 0.0676,
    specificMass: 200,
    id: "17",
  },
  {
    material: "לוח מבודד",
    manufacturer: "פוליביד",
    product: "לוח פוליאש אקסטרה",
    min: 0.02,
    max: 0.06,
    thickness: 1,
    thermalConductivity: 0.0513,
    specificMass: 140,
    id: "18",
  },
  {
    material: "לוח מבודד",
    manufacturer: "פוליביד",
    product: "לוח פוליאש פרימיום",
    min: 0.02,
    max: 0.06,
    thickness: 1,
    thermalConductivity: 0.0456,
    specificMass: 100,
    id: "19",
  },
  {
    material: "לוח מבודד",
    manufacturer: "מלגול",
    product: "פומגלאס",
    min: 0.03,
    max: 0.1,
    thickness: 1,
    thermalConductivity: 0.043,
    specificMass: 130,
    id: "20",
  },
  {
    material: "לוח מבודד",
    manufacturer: "מלגול",
    product: "סולרגלאס",
    min: 0.03,
    max: 0.1,
    thickness: 1,
    thermalConductivity: 0.043,
    specificMass: 120,
    id: "21",
  },
  {
    material: "לוח מבודד",
    manufacturer: "קל מוצרי בידוד",
    product: "פיירטופ",
    min: 0.03,
    max: 0.07,
    thickness: 1,
    thermalConductivity: 0.0606,
    specificMass: 180,
    id: "22",
  },
  {
    material: "טיח פנים",
    manufacturer: "מיסטרפיקס",
    product: "פיקסימו 640",
    min: 0.01,
    max: 0.05,
    thickness: 1,
    thermalConductivity: 0.87,
    specificMass: 300,
    id: "23",
  },
  {
    material: "אבן",
    manufacturer: "גרניט",
    product: "גרניט",
    min: 0.01,
    max: 0.05,
    thickness: 1,
    thermalConductivity: 2.8,
    specificMass: 2700,
    id: "24",
  },
  {
    material: "אבן",
    manufacturer: "שיש",
    product: "שיש",
    min: 0.01,
    max: 0.05,
    thickness: 1,
    thermalConductivity: 3.5,
    specificMass: 2800,
    id: "25",
  },
  {
    material: "אבן",
    manufacturer: "אבן גיר",
    product: "אבן גיר",
    min: 0.01,
    max: 0.05,
    thickness: 1,
    thermalConductivity: 2.3,
    specificMass: 2600,
    id: "26",
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
