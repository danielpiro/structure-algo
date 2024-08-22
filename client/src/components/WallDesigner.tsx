import React, { useCallback, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WallModel from './WallModel';
import { useWallDesigner } from '../hooks/useWallDesigner';
import { getItem, item } from '../data/Materials';
import { LayerType } from '../types';
import { LayerList } from './LayerList';

export const WallDesigner: React.FC = () => {
  const {
    selectedModel,
    modelDetails,
    handleLayerChange,
    handleAddLayer,
    handleRemoveLayer,
    handleSwapLayers,
  } = useWallDesigner();
  const [items, setItems] = useState<item[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<LayerType | null>(null);
  const [expandedLayers, setExpandedLayers] = useState<string[]>([]);
  const [selectedLayerDetails, setSelectedLayerDetails] = useState<item | null>(null);

  const renderAlgorithmResults = () => {
    const totalRValue = calculateTotalRValue(items);
    const isGoodRValue = totalRValue > 3.5; // Adjust this threshold as needed

    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Algorithm Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Layer Configuration:</h3>
            <div className="max-h-60 overflow-y-auto bg-gray-50 p-4 rounded-md">
              {items.map((item, index) => (
                <div key={`${item.product}-${index}`} className="mb-4 p-3 bg-white rounded shadow">
                  <p><span className="font-medium">Product:</span> {item.product}</p>
                  <p><span className="font-medium">Thickness:</span> {item.thickness?.toFixed(3)} cm</p>
                  <p><span className="font-medium">Thermal Conductivity:</span> {item.thermalConductivity.toFixed(3)} W/(m·K)</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Total R-Value:</h3>
            <div className={`text-4xl font-bold ${isGoodRValue ? 'text-green-600' : 'text-red-600'}`}>
              {totalRValue.toFixed(3)} m²·K/W
            </div>
            <p className="mt-2">
              {isGoodRValue 
                ? "Great job! This R-value meets or exceeds recommended standards."
                : "Consider adding more insulation to improve the R-value."}
            </p>
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">R-Value Guide:</h4>
              <ul className="list-disc list-inside">
                <li>{"< 2.0: Poor insulation"}</li>
                <li>2.0 - 3.5: Moderate insulation</li>
                <li>{"> 3.5: Good insulation"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const calculateTotalRValue = (items: item[]) => {
    return items.reduce((total, item) => {
      if (item.thickness === undefined) return total;
      const rValue = (item.thickness / 100) / item.thermalConductivity;
      return total + rValue;
    }, 0);
  };

  const handleLayerClick = (layer: LayerType) => {
    setSelectedLayer(prevLayer => prevLayer && prevLayer.id === layer.id ? null : layer);
  };

  const handleAddLayerWithCollapse = useCallback(() => {
    handleAddLayer();
    setExpandedLayers([]);
  }, [handleAddLayer]);

  const toggleLayerExpansion = useCallback((layerId: string) => {
    setExpandedLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  }, []);

  useEffect(() => {
    if (selectedLayer) {
      const details = getItem(selectedLayer.material, selectedLayer.manufacturer, selectedLayer.product);
      setSelectedLayerDetails(details || null);
    } else {
      setSelectedLayerDetails(null);
    }
  }, [selectedLayer]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-purple-700">Building Model Designer</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
              <h2 className="text-xl font-semibold p-6 bg-gray-50 border-b">3D Model Visualization</h2>
              <div className="p-6">
                <div className="h-[calc(50vh-300px)] w-full">
                  <Canvas camera={{ position: [0, 0, 450], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <WallModel 
                      layers={modelDetails[selectedModel].layers} 
                      onLayerClick={handleLayerClick}
                      selectedLayerId={selectedLayer?.id}
                    />
                    <OrbitControls enableRotate={true} />
                  </Canvas>
                </div>
                {selectedLayer && selectedLayerDetails && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Layer Details</h3>
                    <p><span className="font-medium">Material:</span> {selectedLayerDetails.material}</p>
                    <p><span className="font-medium">Manufacturer:</span> {selectedLayerDetails.manufacturer}</p>
                    <p><span className="font-medium">Product:</span> {selectedLayerDetails.product}</p>
                    <p><span className="font-medium">Thickness:</span> {selectedLayer.thickness.toFixed(3)} cm</p>
                    <p><span className="font-medium">Thermal Conductivity:</span> {selectedLayerDetails.thermalConductivity.toFixed(3)} W/(m·K)</p>
                    <p><span className="font-medium">Mass:</span> {selectedLayerDetails.specificMass} kg/m³</p>
                    <p><span className="font-medium">Color:</span> <span style={{ backgroundColor: selectedLayer.color, padding: '0 10px', borderRadius: '4px' }}>{selectedLayer.color}</span></p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
              <h2 className="text-xl font-semibold p-6 bg-gray-50 border-b">Layer Details</h2>
              <div className="p-6">
                <LayerList
                  layers={modelDetails[selectedModel].layers}
                  onLayerChange={handleLayerChange}
                  onAddLayer={handleAddLayerWithCollapse}
                  onRemoveLayer={handleRemoveLayer}
                  onReorderLayers={handleSwapLayers}
                  setItems={setItems}
                  items={items}
                  expandedLayers={expandedLayers}
                  toggleLayerExpansion={toggleLayerExpansion}
                />
              </div>
            </div>
          </div>
          {renderAlgorithmResults()}
        </div>
      </div>
    </DndProvider>
  );
};

export default WallDesigner;