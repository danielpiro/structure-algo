import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WallModel from './components/WallModel';
import FloorModel from './components/FloorModel';
import CeilingModel from './components/CeilingModel';
import WindowModel from './components/WindowModel';
import { ModelType, WallDetails, FloorDetails, CeilingDetails, WindowDetails, modelOptions, initialWallDetails, initialFloorDetails, initialCeilingDetails, initialWindowDetails } from './types';

type ModelDetails = WallDetails | FloorDetails | CeilingDetails | WindowDetails;

const colorMap: Record<string, string> = {
  plasterboard: 'bg-gray-200',
  insulation: 'bg-pink-200',
  fireWetStop: 'bg-yellow-800',
  weathertex: 'bg-gray-400',
  carpet: 'bg-gray-300',
  underlay: 'bg-yellow-200',
  concrete: 'bg-gray-400',
  paint: 'bg-yellow-50',
  plaster: 'bg-gray-100',
  joists: 'bg-yellow-800',
  frame: 'bg-yellow-800',
  glass: 'bg-sky-100'
};

const calculateWallMetrics = (details: WallDetails) => {
  const totalThickness = Object.values(details).reduce((sum, value) => sum + value, 0);
  const insulationRatio = details.insulation / totalThickness;
  const isWellInsulated = insulationRatio > 0.5;
  return { totalThickness, insulationRatio, isWellInsulated };
};

const calculateFloorMetrics = (details: FloorDetails) => {
  const totalThickness = Object.values(details).reduce((sum, value) => sum + value, 0);
  const concreteRatio = details.concrete / totalThickness;
  const isStable = concreteRatio > 0.4;
  return { totalThickness, concreteRatio, isStable };
};

const calculateCeilingMetrics = (details: CeilingDetails) => {
  const totalThickness = Object.values(details).reduce((sum, value) => sum + value, 0);
  const insulationRatio = details.insulation / totalThickness;
  const isWellInsulated = insulationRatio > 0.4;
  return { totalThickness, insulationRatio, isWellInsulated };
};

const calculateWindowMetrics = (details: WindowDetails) => {
  const area = details.totalWidth * details.totalHeight / 1000000; // in m²
  const glassToFrameRatio = (details.totalWidth - 2 * details.frameWidth) * (details.totalHeight - 2 * details.frameWidth) / (details.totalWidth * details.totalHeight);
  const isEnergyEfficient = details.glassThickness >= 6 && glassToFrameRatio > 0.7;
  return { area, glassToFrameRatio, isEnergyEfficient };
};

export default function App() {
  const [selectedModel, setSelectedModel] = useState<ModelType>('Wall');
  const [wallDetails, setWallDetails] = useState<WallDetails>(initialWallDetails);
  const [floorDetails, setFloorDetails] = useState<FloorDetails>(initialFloorDetails);
  const [ceilingDetails, setCeilingDetails] = useState<CeilingDetails>(initialCeilingDetails);
  const [windowDetails, setWindowDetails] = useState<WindowDetails>(initialWindowDetails);

  const getCurrentDetails = (): ModelDetails => {
    switch (selectedModel) {
      case 'Wall': return wallDetails;
      case 'Floor': return floorDetails;
      case 'Ceiling': return ceilingDetails;
      case 'Window': return windowDetails;
    }
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value as ModelType);
  };

  const handleDetailChange = (detail: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 2000) {
      switch (selectedModel) {
        case 'Wall':
          setWallDetails({ ...wallDetails, [detail]: value });
          break;
        case 'Floor':
          setFloorDetails({ ...floorDetails, [detail]: value });
          break;
        case 'Ceiling':
          setCeilingDetails({ ...ceilingDetails, [detail]: value });
          break;
        case 'Window':
          setWindowDetails({ ...windowDetails, [detail]: value });
          break;
      }
    }
  };

  const renderModel = () => {
    switch (selectedModel) {
      case 'Wall': return <WallModel details={wallDetails} />;
      case 'Floor': return <FloorModel details={floorDetails} />;
      case 'Ceiling': return <CeilingModel details={ceilingDetails} />;
      case 'Window': return <WindowModel details={windowDetails} />;
    }
  };

  const currentDetails = getCurrentDetails();

  const renderAlgorithmResults = () => {
    const ResultItem = ({ label, value, isGood }: { label: string, value: string, isGood: boolean }) => (
      <div className="flex justify-between items-center mb-2">
        <span>{label}:</span>
        <span className={`font-semibold ${isGood ? 'text-green-600' : 'text-red-600'}`}>{value}</span>
      </div>
    );

    switch (selectedModel) {
      case 'Wall':
        const wallMetrics = calculateWallMetrics(wallDetails);
        return (
          <div>
            <ResultItem 
              label="Total Thickness" 
              value={`${wallMetrics.totalThickness.toFixed(2)} mm`} 
              isGood={wallMetrics.totalThickness > 100}
            />
            <ResultItem 
              label="Insulation Ratio" 
              value={`${(wallMetrics.insulationRatio * 100).toFixed(2)}%`} 
              isGood={wallMetrics.insulationRatio > 0.5}
            />
            <ResultItem 
              label="Well Insulated" 
              value={wallMetrics.isWellInsulated ? 'Yes' : 'No'} 
              isGood={wallMetrics.isWellInsulated}
            />
          </div>
        );
      case 'Floor':
        const floorMetrics = calculateFloorMetrics(floorDetails);
        return (
          <div>
            <ResultItem 
              label="Total Thickness" 
              value={`${floorMetrics.totalThickness.toFixed(2)} mm`} 
              isGood={floorMetrics.totalThickness > 150}
            />
            <ResultItem 
              label="Concrete Ratio" 
              value={`${(floorMetrics.concreteRatio * 100).toFixed(2)}%`} 
              isGood={floorMetrics.concreteRatio > 0.4}
            />
            <ResultItem 
              label="Stable" 
              value={floorMetrics.isStable ? 'Yes' : 'No'} 
              isGood={floorMetrics.isStable}
            />
          </div>
        );
      case 'Ceiling':
        const ceilingMetrics = calculateCeilingMetrics(ceilingDetails);
        return (
          <div>
            <ResultItem 
              label="Total Thickness" 
              value={`${ceilingMetrics.totalThickness.toFixed(2)} mm`} 
              isGood={ceilingMetrics.totalThickness > 200}
            />
            <ResultItem 
              label="Insulation Ratio" 
              value={`${(ceilingMetrics.insulationRatio * 100).toFixed(2)}%`} 
              isGood={ceilingMetrics.insulationRatio > 0.4}
            />
            <ResultItem 
              label="Well Insulated" 
              value={ceilingMetrics.isWellInsulated ? 'Yes' : 'No'} 
              isGood={ceilingMetrics.isWellInsulated}
            />
          </div>
        );
      case 'Window':
        const windowMetrics = calculateWindowMetrics(windowDetails);
        return (
          <div>
            <ResultItem 
              label="Area" 
              value={`${windowMetrics.area.toFixed(2)} m²`} 
              isGood={windowMetrics.area > 1}
            />
            <ResultItem 
              label="Glass to Frame Ratio" 
              value={`${(windowMetrics.glassToFrameRatio * 100).toFixed(2)}%`} 
              isGood={windowMetrics.glassToFrameRatio > 0.7}
            />
            <ResultItem 
              label="Energy Efficient" 
              value={windowMetrics.isEnergyEfficient ? 'Yes' : 'No'} 
              isGood={windowMetrics.isEnergyEfficient}
            />
          </div>
        );
    }
  };

  return (
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
                {renderModel()}
                <OrbitControls enableRotate={true} />
              </Canvas>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(currentDetails).map(([key, _]) => (
                <div key={key} className="flex items-center">
                  <div className={`w-6 h-6 ${colorMap[key]} mr-2 rounded`}></div>
                  <span className="text-sm">{key}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4">Model Selection</h2>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedModel}
                onChange={handleModelChange}
              >
                {modelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Model Details</h2>
              {Object.entries(currentDetails).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="block mb-2">{key}</label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="0.5"
                      value={value}
                      onChange={handleDetailChange(key)}
                      className="w-full mr-4"
                    />
                    <input
                      type="number"
                      min="0"
                      max="2000"
                      step="0.5"
                      value={value}
                      onChange={handleDetailChange(key)}
                      className="w-20 p-1 border border-gray-300 rounded"
                    />
                    <span className="ml-2">mm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Algorithm Results</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            {renderAlgorithmResults()}
          </div>
        </div>
      </div>
    </div>
  );
}