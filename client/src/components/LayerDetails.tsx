import React from "react";
import { LayerType } from "../types";
import { getItem } from "../data/Materials";
import useTranslations from "../hooks/useTranslations";

interface LayerDetailsProps {
  layer: LayerType;
}

const LayerDetails: React.FC<LayerDetailsProps> = React.memo(({ layer }) => {
  const itemDetails = getItem(
    layer.material,
    layer.manufacturer,
    layer.product
  );
  const { t } = useTranslations();

  if (!itemDetails) return null;

  const details = [
    { label: "Material", value: itemDetails.material },
    { label: "Manufacturer", value: itemDetails.manufacturer },
    { label: "Product", value: itemDetails.product },
    { label: "Thickness", value: `${layer.thickness.toFixed(3)} cm` },
    {
      label: "Thermal Conductivity",
      value: `${itemDetails.thermalConductivity.toFixed(3)} W/(m·K)`,
    },
    { label: "Mass", value: `${itemDetails.specificMass} kg/m³` },
  ];

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
        {t("Layer Details")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map(({ label, value }) => (
          <div key={label} className="mb-2">
            <span className="font-medium text-gray-700">{label}:</span>{" "}
            <span className="text-gray-800">{value}</span>
          </div>
        ))}
        <div className="md:col-span-2">
          <span className="font-medium text-gray-700">{t("Color")}:</span>{" "}
          <span
            className="inline-block w-24 h-6 align-middle ml-2 rounded"
            style={{ backgroundColor: layer.color }}
            title={layer.color}
          ></span>
          <span className="ml-2 text-sm text-gray-600">{layer.color}</span>
        </div>
      </div>
    </div>
  );
});

export default LayerDetails;
