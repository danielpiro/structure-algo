import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WallModel from "./WallModel";
import { useWallDesigner } from "../hooks/useWallDesigner";
import { getItem } from "../data/Materials";
import { LayerType, Model } from "../types";
import LayerList from "./LayerList";
import SavedModelsManager from "./SavedModelsManager";
import AlgorithmResults from "./AlgorithmResults";
import ProjectSettings from "./ProjectSettings";
import LayerDetails from "./LayerDetails";
import useTranslations from "../hooks/useTranslations";
import SelectField from "./SelectField";

export const WallDesigner: React.FC = () => {
  const {
    layers,
    handleLayerChange,
    handleAddLayer,
    handleRemoveLayer,
    handleSwapLayers,
    updateLayers,
  } = useWallDesigner();

  const [items, setItems] = useState<Model[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<LayerType | null>(null);
  const [expandedLayers, setExpandedLayers] = useState<string[]>([]);
  const [savedModels, setSavedModels] = useState<{
    [key: string]: LayerType[];
  }>({});

  const [projectType, setProjectType] = useState("");
  const [projectLocation, setProjectLocation] = useState("");

  const [modelType, setModelType] = useState("");
  const [isolationType, setIsolationType] = useState("");
  const [wallColor, setWallColor] = useState("");

  const { t } = useTranslations();

  const handleLayerClick = useCallback((layer: LayerType) => {
    setSelectedLayer((prevLayer) =>
      prevLayer && prevLayer.id === layer.id ? null : layer
    );
  }, []);

  const handleAddLayerWithCollapse = useCallback(() => {
    handleAddLayer();
    setExpandedLayers([]);
  }, [handleAddLayer]);

  const toggleLayerExpansion = useCallback((layerId: string) => {
    setExpandedLayers((prev) =>
      prev.includes(layerId)
        ? prev.filter((id) => id !== layerId)
        : [...prev, layerId]
    );
  }, []);

  const saveCurrentModel = useCallback(
    (modelName: string) => {
      setSavedModels((prevModels) => ({
        ...prevModels,
        [modelName]: layers,
      }));
      updateLayers([]);
      setModelType("");
      setIsolationType("");
      setWallColor("");
    },
    [layers, updateLayers]
  );

  const loadSavedModel = useCallback(
    (modelName: string) => {
      if (savedModels[modelName]) {
        updateLayers(savedModels[modelName]);
      }
    },
    [savedModels, updateLayers]
  );

  const handleRemoveAllLayers = useCallback(() => {
    updateLayers([]);
    setItems([]);
    setSelectedLayer(null);
    setExpandedLayers([]);
  }, [updateLayers]);

  useEffect(() => {
    const newItems = layers
      .map((layer) => {
        const itemDetails = getItem(
          layer.material,
          layer.manufacturer,
          layer.product
        );
        return itemDetails
          ? { ...itemDetails, id: layer.id, thickness: layer.thickness }
          : null;
      })
      .filter((item): item is Model => item !== null);
    setItems(newItems);
  }, [layers]);

  const memoizedWallModel = useMemo(
    () => (
      <WallModel
        layers={layers}
        onLayerClick={handleLayerClick}
        selectedLayerId={selectedLayer?.id}
      />
    ),
    [layers, handleLayerClick, selectedLayer]
  );

  const memoizedLayerList = useMemo(
    () => (
      <LayerList
        layers={layers}
        onLayerChange={handleLayerChange}
        onAddLayer={handleAddLayerWithCollapse}
        onRemoveLayer={handleRemoveLayer}
        onRemoveAllLayers={handleRemoveAllLayers}
        onReorderLayers={handleSwapLayers}
        setItems={setItems}
        items={items}
        expandedLayers={expandedLayers}
        toggleLayerExpansion={toggleLayerExpansion}
      />
    ),
    [
      layers,
      handleLayerChange,
      handleAddLayerWithCollapse,
      handleRemoveLayer,
      handleRemoveAllLayers,
      handleSwapLayers,
      items,
      expandedLayers,
      toggleLayerExpansion,
    ]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10">
        <div className="container mx-auto px-4 space-y-10">
          <ProjectSettings
            projectType={projectType}
            projectLocation={projectLocation}
            onProjectTypeChange={setProjectType}
            onProjectLocationChange={setProjectLocation}
          />

          <div className="mt-10 bg-gradient-to-r from-green-50 to-green-50 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-gray-700">
              {t("Model Settings")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SelectField
                label={t("Model Type")}
                options={["קיר חוץ", "קיר הפרדה", "גג עליון"]}
                value={modelType}
                onChange={setModelType}
              />
              <SelectField
                label={t("Isolation Type")}
                options={["בידוד חוץ", "בידוד פנים"]}
                value={isolationType}
                onChange={setIsolationType}
              />
              {modelType === "קיר חוץ" && (
                <SelectField
                  label={t("Wall Color")}
                  options={["גוון בהיר", "גוון כהה"]}
                  value={wallColor}
                  onChange={setWallColor}
                />
              )}
            </div>
          </div>

          <SavedModelsManager
            savedModels={savedModels}
            onSaveModel={saveCurrentModel}
            onLoadModel={loadSavedModel}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">{memoizedLayerList}</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <h2 className="text-2xl font-semibold p-6 bg-gray-50 border-b">
                {t("3D Model Visualization")}
              </h2>
              <div className="p-6">
                <div className="h-[calc(75vh-300px)] w-full rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [0, 0, 450], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    {memoizedWallModel}
                    <OrbitControls enableRotate={true} />
                  </Canvas>
                </div>
                {selectedLayer && <LayerDetails layer={selectedLayer} />}
              </div>
            </div>
          </div>

          <AlgorithmResults
            items={items}
            projectType={projectType}
            projectLocation={projectLocation}
            modelType={modelType}
            isolationType={isolationType}
            wallColor={wallColor}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default WallDesigner;
