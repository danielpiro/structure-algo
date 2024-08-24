import React, { useMemo } from "react";
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

const AlgorithmResults: React.FC<AlgorithmResultsProps> = React.memo(
  ({
    items,
    projectType,
    projectLocation,
    modelType,
    isolationType,
    wallColor,
  }) => {
    const totalRValue = useMemo(() => {
      return items.reduce((total, item) => {
        if (item.thickness === undefined) return total;
        const rValue = item.thickness / 100 / item.thermalConductivity;
        return total + rValue;
      }, 0);
    }, [items]);

    const { t } = useTranslations();

    const isGoodRValue = totalRValue > 3.5;

    return (
      <div className="bg-white p-8 rounded-lg shadow-lg mt-10 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
          {t("Algorithm Results")}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                {t("Calculation Results")}
              </h3>
              <div className="bg-gray-50 p-5 rounded-md shadow-inner">
                <p className="text-2xl font-bold mb-2">
                  Total R-Value:{" "}
                  <span
                    className={`${
                      isGoodRValue ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {totalRValue.toFixed(3)} m²·K/W
                  </span>
                </p>
                <p
                  className={`text-sm ${
                    isGoodRValue ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {isGoodRValue
                    ? "Great job! This R-value meets or exceeds recommended standards."
                    : "Consider adding more insulation to improve the R-value."}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              {t("Layer Configuration")}
            </h3>
            <div className="max-h-96 overflow-y-auto bg-gray-50 p-5 rounded-md shadow-inner">
              {items.map((item, index) => (
                <div
                  key={`${item.product}-${index}`}
                  className="mb-4 last:mb-0 p-4 bg-white rounded-md shadow transition-all hover:shadow-md"
                >
                  {[
                    { label: "Product", value: item.product },
                    {
                      label: "Thickness",
                      value: `${item.thickness?.toFixed(3)} cm`,
                    },
                    {
                      label: "Thermal Conductivity",
                      value: `${item.thermalConductivity.toFixed(3)} W/(m·K)`,
                    },
                    {
                      label: "Mass",
                      value: `${item.specificMass.toFixed(3)} kg/m³`,
                    },
                  ].map(({ label, value }) => (
                    <p key={label} className="mb-1 last:mb-0">
                      <span className="font-medium text-gray-600">
                        {label}:
                      </span>{" "}
                      <span className="text-gray-800">{value}</span>
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 bg-blue-50 p-5 rounded-md shadow-inner">
          <h4 className="text-lg font-semibold mb-3 text-blue-800">
            R-Value Guide:
          </h4>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>{"< 2.0: Poor insulation"}</li>
            <li>2.0 - 3.5: Moderate insulation</li>
            <li>{"> 3.5: Good insulation"}</li>
          </ul>
        </div>
      </div>
    );
  }
);

export default AlgorithmResults;
