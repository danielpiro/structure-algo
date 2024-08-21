import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WallModel from './WallModel';
import LayerList from './LayerList';
import { useWallDesigner } from '../hooks/useWallDesigner';
import { item } from '../data/Materials';

export const WallDesigner: React.FC = () => {
  const {
    selectedModel,
    modelDetails,
    handleLayerChange,
    handleAddLayer,
    handleRemoveLayer,
    handleSwapLayers,
  } = useWallDesigner();

  const [item , setItem] = React.useState<item>({} as item);



  const renderAlgorithmResults = () => {
      return (
        <div>
         {item.product}
        </div>
      )
    
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-purple-700">Building Model Designer</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">3D Model Visualization</h2>
              <div className="h-96 w-full mb-4">
                <Canvas camera={{ position: [0, 0, 400], fov: 60 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <WallModel layers={modelDetails[selectedModel].layers} />
                  <OrbitControls enableRotate={true} />
                </Canvas>
              </div>
            </div>
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <LayerList
                  layers={modelDetails[selectedModel].layers}
                  onLayerChange={handleLayerChange}
                  onAddLayer={handleAddLayer}
                  onRemoveLayer={handleRemoveLayer}
                  onReorderLayers={handleSwapLayers}
                  setItem={setItem}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Algorithm Results</h2>
            {renderAlgorithmResults()}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};