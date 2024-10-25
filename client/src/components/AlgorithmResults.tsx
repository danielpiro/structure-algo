import React, { useEffect, useMemo, useState } from "react";
import { Model } from "../types";
import useTranslations from "../hooks/useTranslations";

interface AlgorithmResultsProps {
  items: Model[];
  projectType: string;
  projectLocation: string;
  modelType: string;
  isolationType: string;
  wallColor: string;
}

export const constants: { [key: string]: number } = {
  "קיר חוץ": 0.17,
  "קיר הפרדה": 0.26,
  "גג עליון": 0.14,
};

interface ThermalResistanceData {
  [projectType: string]: {
    [elementType: string]: {
      masses: number[];
      resistanceValues: {
        [location: string]: number[];
      };
    };
  };
}

const thermalResistanceData: ThermalResistanceData = {
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

const linearInterpolate = (
  x: number,
  x0: number,
  x1: number,
  y0: number,
  y1: number
) => {
  return y0 + (x - x0) * ((y1 - y0) / (x1 - x0));
};

const AlgorithmResults: React.FC<AlgorithmResultsProps> = React.memo(
  ({
    items,
    projectType,
    projectLocation,
    modelType,
    isolationType,
    wallColor,
  }) => {
    const { t } = useTranslations();
    const [calculationError, setCalculationError] = useState<string | null>(
      null
    );
    const [isInsulationSufficient, setIsInsulationSufficient] = useState<
      boolean | null
    >(null);
    const [requiredResistance, setRequiredResistance] = useState<number | null>(
      null
    );

    const [calculatedResistance, setCalculatedResistance] = useState<
      number | null
    >(null);

    const thermalResistance = useMemo(() => {
      return items.map((item) => {
        return item.thickness / 100 / item.thermalConductivity;
      });
    }, [items]);

    const totalThermalResistance = useMemo(() => {
      return thermalResistance.reduce((acc, curr) => acc + curr, 0);
    }, [thermalResistance]);

    const R = useMemo(() => {
      return totalThermalResistance + (constants[modelType] || 0);
    }, [totalThermalResistance, modelType]);

    const U = useMemo(() => {
      return 1 / R;
    }, [R]);

    const mass = useMemo(() => {
      const temp = items.reduce((total, item) => {
        const itemMass =
          item.thickness !== undefined
            ? (item.thickness / 100) * item.specificMass
            : 0;
        return total + itemMass;
      }, 0);

      return isolationType === "בידוד פנים" ? temp / 2 : temp;
    }, [isolationType, items]);

    const calculateThermalResistance = (
      projectType: string,
      elementType: string,
      mass: number,
      projectLocation: string,
      wallColor: string
    ): number => {
      const projectData = thermalResistanceData[projectType];
      if (!projectData) {
        throw new Error(`Invalid project type: ${projectType}`);
      }

      const elementData = projectData[elementType];
      if (!elementData) {
        throw new Error(`Invalid element type: ${elementType}`);
      }

      const { masses, resistanceValues } = elementData;
      const locationValues = resistanceValues[projectLocation];
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

    useEffect(() => {
      if (
        items.length > 0 &&
        projectType &&
        projectLocation &&
        modelType &&
        isolationType
      ) {
        try {
          const requiredR = calculateThermalResistance(
            projectType,
            modelType,
            mass,
            projectLocation,
            wallColor
          );
          setRequiredResistance(requiredR);
          setCalculatedResistance(requiredR);
          setIsInsulationSufficient(totalThermalResistance > requiredR);
          setCalculationError(null);
        } catch (error) {
          console.error("Error calculating thermal resistance:", error);
          setCalculationError((error as Error).message);
          setIsInsulationSufficient(null);
          setCalculatedResistance(null);
          setRequiredResistance(null);
        }
      } else {
        setIsInsulationSufficient(null);
        setRequiredResistance(null);
        setCalculationError(
          t("Please select all parameters and add at least one item.")
        );
      }
    }, [
      items,
      projectType,
      projectLocation,
      modelType,
      isolationType,
      wallColor,
      mass,
      totalThermalResistance,
    ]);

    return (
      <div className="bg-white p-8 rounded-lg shadow-lg mt-10 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
          {t("Algorithm Results")}
        </h2>
        <p className="text-lg mb-2">
         {t("Calculated Thermal Resistance")}
          <span className="font-semibold text-blue-600">
            {calculatedResistance ? calculatedResistance.toFixed(3) : "N/A"}{" "}
            m²·K/W  
          </span>
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                {t("Calculation Results")}
              </h3>
              <div className="bg-gray-50 p-5 rounded-md shadow-inner">
                {calculationError ? (
                  <p className="text-red-600">{calculationError}</p>
                ) : isInsulationSufficient === null ? (
                  <p className="text-yellow-600">
                   {t('Waiting for all parameters to be set')}...
                  </p>
                ) : (
                  <>
                    <p className="text-2xl font-bold mb-2">
                    {t('Total Thermal Resistance')}:{" "}
                      <span
                        className={
                          isInsulationSufficient
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {totalThermalResistance.toFixed(3)} m²·K/W
                      </span>
                    </p>
                    <p className="text-lg mb-2">
                    {t('Required Thermal Resistance')}:{" "}
                      <span className="font-semibold">
                        {requiredResistance !== null
                          ? requiredResistance.toFixed(3)
                          : "N/A"}{" "}
                        m²·K/W
                      </span>
                    </p>
                    <p
                      className={`text-sm ${
                        isInsulationSufficient
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {isInsulationSufficient
                        ? "Great job! Your insulation meets or exceeds the required standards."
                        : "Consider adding more insulation to meet the required standards."}
                    </p>
                    <p className="mt-2">
                    {t('Total R-Value')}:
                      <span className="font-semibold">
                        {R.toFixed(3)} m²·K/W
                      </span>
                    </p>
                    <p className="mt-2">
                    {t('U-Value')}:
                      <span className="font-semibold">
                        {U.toFixed(3)} W/(m²·K)
                      </span>
                    </p>
                    <p>
                      {t('Total Mass')}:
                      <span className="font-semibold">
                        {mass.toFixed(2)} kg/m²
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                {t("Project Details")}
              </h3>
              <div className="bg-gray-50 p-5 rounded-md shadow-inner">
                <p>
                  {t('Project Type')}:{" "}
                  <span className="font-semibold">
                    {projectType || "לא נקבע"}
                  </span>
                </p>
                <p>
                {t('Project Location')}:{" "}
                  <span className="font-semibold">
                    {projectLocation || "לא נקבע"}
                  </span>
                </p>
                <p>
                {t('Model Type')}:{" "}
                  <span className="font-semibold">
                    {modelType || "לא נקבע"}
                  </span>
                </p>
                <p>
                {t('Isolation Type')}:{" "}
                  <span className="font-semibold">
                    {isolationType || "לא נקבע"}
                  </span>
                </p>
                <p>
                {t('Wall Color')}:{" "}
                  <span className="font-semibold">
                    {wallColor || "לא נקבע"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              {t("Layer Configuration")}
            </h3>
            <div className="max-h-96 overflow-y-auto bg-gray-50 p-5 rounded-md shadow-inner">
              {items.length === 0 ? (
                <p className="text-yellow-600">{t('No items added yet.')}</p>
              ) : (
                items.map((item, index) => (
                  <div
                    key={`${item.product}-${index}`}
                    className="mb-4 last:mb-0 p-4 bg-white rounded-md shadow transition-all hover:shadow-md"
                  >
                    <p>
                      <span className="font-medium text-gray-600">
                      {t('Product')}:
                      </span>{" "}
                      <span className="text-gray-800">{item.product}</span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                      {t('Thickness')}:
                      </span>{" "}
                      <span className="text-gray-800">
                        {item.thickness?.toFixed(3)} cm
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                      {t('Thermal Conductivity')}:
                      </span>{" "}
                      <span className="text-gray-800">
                        {item.thermalConductivity.toFixed(3)} W/(m·K)
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Mass:</span>{" "}
                      <span className="text-gray-800">
                        {item.specificMass.toFixed(3)} kg/m³
                      </span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 bg-blue-50 p-5 rounded-md shadow-inner">
          <h4 className="text-lg font-semibold mb-3 text-blue-800">
            Thermal Resistance Guide:
          </h4>
          <p className="text-blue-700">
            If your Total Thermal Resistance is greater than the Required
            Thermal Resistance, your insulation meets or exceeds the standards
            for your project type and location.
          </p>
        </div>
      </div>
    );
  }
);

export default AlgorithmResults;
