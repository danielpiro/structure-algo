import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WallModel from './WallModel';
import { useWallDesigner } from '../hooks/useWallDesigner';
import { getItem } from '../data/Materials';
import { LayerType, Model } from '../types';
import LayerList from './LayerList';
import SettingsMenu from './SettingsMenu';
import AlgorithmResults from './AlgorithmResults';
import LayerDetails from './LayerDetails';
import useTranslations from '../hooks/useTranslations';

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
  const [savedModels, setSavedModels] = useState<{[key: string]: LayerType[]}>({});

  const [projectType, setProjectType] = useState<string>('');
  const [projectLocation, setProjectLocation] = useState<string>('');
  const [modelType, setModelType] = useState<string>('');
  const [isolationType, setIsolationType] = useState<string>('');
  const [wallColor, setWallColor] = useState<string>('');

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
      setModelType('');
      setIsolationType('');
      setWallColor('');
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
      <div className="min-h-screen py-6 bg-gray-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Settings Menu with new styling */}
            <SettingsMenu
              projectType={projectType}
              projectLocation={projectLocation}
              onProjectTypeChange={setProjectType}
              onProjectLocationChange={setProjectLocation}
              modelType={modelType}
              isolationType={isolationType}
              wallColor={wallColor}
              onModelTypeChange={setModelType}
              onIsolationTypeChange={setIsolationType}
              onWallColorChange={setWallColor}
              savedModels={savedModels}
              onSaveModel={saveCurrentModel}
              onLoadModel={loadSavedModel}
            />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {memoizedLayerList}
            </div>

            {/* Left Panel (3D Visualization) */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-[500px] w-full rounded-lg overflow-hidden">
                    <Canvas camera={{ position: [0, 0, 450], fov: 60 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      {memoizedWallModel}
                      <OrbitControls enableRotate={true} />
                    </Canvas>
                  </div>
              </div>

              {/* Layer Details Panel */}
              {selectedLayer && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <LayerDetails layer={selectedLayer} />
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
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
      </div>
    </DndProvider>
  );
};

export default WallDesigner;