import React, { useCallback, useMemo } from "react";
import { LayerType, Model } from "../types";
import LayerItem from "./LayerItem";
import { FaPlus, FaTrash } from "react-icons/fa";
import useTranslations from "../hooks/useTranslations";

interface LayerListProps {
  layers: LayerType[];
  onLayerChange: (
    id: string,
    field: keyof LayerType,
    value: string | number
  ) => void;
  onAddLayer: () => void;
  onRemoveLayer: (id: string) => void;
  onRemoveAllLayers: () => void;
  onReorderLayers: (startIndex: number, endIndex: number) => void;
  setItems: React.Dispatch<React.SetStateAction<Model[]>>;
  items: Model[];
  expandedLayers: string[];
  toggleLayerExpansion: (layerId: string) => void;
}

const LayerList: React.FC<LayerListProps> = React.memo(
  ({
    layers,
    onLayerChange,
    onAddLayer,
    onRemoveLayer,
    onRemoveAllLayers,
    onReorderLayers,
    setItems,
    expandedLayers,
    toggleLayerExpansion,
  }) => {
    const moveLayer = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        onReorderLayers(dragIndex, hoverIndex);
      },
      [onReorderLayers]
    );

    const { t } = useTranslations();

    const memoizedLayers = useMemo(
      () =>
        layers.map((layer, index) => (
          <LayerItem
            key={layer.id}
            layer={layer}
            index={index}
            onChange={onLayerChange}
            onRemove={onRemoveLayer}
            moveLayer={moveLayer}
            isExpanded={expandedLayers.includes(layer.id)}
            toggleExpansion={() => toggleLayerExpansion(layer.id)}
            setItems={setItems}
          />
        )),
      [
        layers,
        onLayerChange,
        onRemoveLayer,
        moveLayer,
        expandedLayers,
        toggleLayerExpansion,
        setItems,
      ]
    );

    return (
      <div className="bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {t("Layer Details")}
        </h2>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onAddLayer}
            className="w-full sm:w-auto py-2 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md transition-all duration-300 flex items-center justify-center shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            {t("Add Layer")} <FaPlus className="mr-2" />
          </button>
          <button
            onClick={onRemoveAllLayers}
            className="w-full sm:w-auto py-2 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md transition-all duration-300 flex items-center justify-center shadow-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            {t("Delete All Layers")} <FaTrash className="mr-2" />
          </button>
        </div>
        {layers.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {t("No layers added. Click 'Add Layer' to get started.")}
          </div>
        ) : (
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2 space-y-4">
            {memoizedLayers}
          </div>
        )}
      </div>
    );
  }
);

export default LayerList;
