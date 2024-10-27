import React, { useState, useRef } from "react";
import { LayerType } from "../types";
import { getItem } from "../data/Materials";
import useTranslations from "../hooks/useTranslations";

interface LayerDetailsProps {
  layer: LayerType;
}

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-96 max-w-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const LayerDetails: React.FC<LayerDetailsProps> = React.memo(({ layer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemDetails = getItem(
    layer.material,
    layer.manufacturer,
    layer.product
  );
  const { t } = useTranslations();

  if (!itemDetails) return null;

  const details = [
    { label: t("Material"), value: itemDetails.material },
    { label: t("Manufacturer"), value: itemDetails.manufacturer },
    { label: t("Product"), value: itemDetails.product },
    { label: t("Thickness"), value: `${layer.thickness.toFixed(3)} ס"מ` },
    {
      label: t("Thermal Conductivity"),
      value: `${itemDetails.thermalConductivity.toFixed(3)} W/(m·K)`,
    },
    { label: t("Mass"), value: `${itemDetails.specificMass} kg/m³` },
  ];

  const documentButtons = [
    "תו תקן ירוק",
    "יצור מקומי",
    "VOC",
    "LCA/EPD",
  ];

  const groupedButtons = documentButtons.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index / 3);
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as string[][]);

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
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
           {t('Documents')}
          </button>
        </div>
        {/* <div className="md:col-span-2">
          <span className="font-medium text-gray-700">{t("Color")}:</span>{" "}
          <span
            className="inline-block w-24 h-6 align-middle ml-2 rounded"
            style={{ backgroundColor: layer.color }}
            title={layer.color}
          />
        </div> */}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('Documents')}
      >
        <div className="space-y-3">
          {groupedButtons.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-3 gap-2">
              {row.map((buttonText) => (
                <button
                  key={buttonText}
                  className="px-4 py-2 text-center bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  onClick={() => {
                    // Button click handler can be added here
                    console.log(`${buttonText} clicked`);
                  }}
                >
                  {buttonText}
                </button>
              ))}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
});

export default LayerDetails;