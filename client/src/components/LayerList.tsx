import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { LayerType } from '../types';
import { FaTrash, FaPlus, FaGripVertical, FaPalette, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import Select from 'react-select';
import { getItem, item, manufacturers, materials, products } from '../data/Materials';

const colorOptions = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#F1948A', '#82E0AA', '#85C1E9',
  '#FF4757', '#2ED573', '#5352ED', '#FF6B81', '#1E90FF',
  '#FFA502', '#FF6348', '#747D8C', '#2F3542', '#70A1FF',
  '#3742FA', '#2F3640', '#8C7AE6', '#FFC312', '#C4E538',
  '#12CBC4', '#FDA7DF', '#ED4C67', '#F79F1F', '#A3CB38'
];

interface LayerItemProps {
  layer: LayerType;
  index: number;
  onChange: (id: string, field: keyof LayerType, value: string | number) => void;
  onRemove: (id: string) => void;
  moveLayer: (dragIndex: number, hoverIndex: number) => void;
  isExpanded: boolean;
  toggleExpansion: () => void;
}

const LayerItem: React.FC<LayerItemProps> = ({ 
  layer, 
  index, 
  onChange, 
  onRemove, 
  moveLayer, 
  isExpanded,
  toggleExpansion
}) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'LAYER',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'LAYER',
    hover(item: { index: number }) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveLayer(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const handleTypeChange = (option: { value: string; label: string } | null) => {
    const newType = option?.value || '';
    onChange(layer.id, 'material', newType);
    // Reset subsequent fields
    onChange(layer.id, 'manufacturer', '');
    onChange(layer.id, 'product', '');
  };

  const handleManufacturerChange = (option: { value: string; label: string } | null) => {
    const newManufacturer = option?.value || '';
    onChange(layer.id, 'manufacturer', newManufacturer);
    // Reset product when manufacturer changes
    onChange(layer.id, 'product', '');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setIsColorPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const ColorPicker = () => (
    <div className="relative" ref={colorPickerRef}>
      <button
        className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        style={{ backgroundColor: layer.color }}
        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
      >
        <FaPalette className="text-white w-4 h-4 m-auto" />
      </button>
      {isColorPickerOpen && (
        <div className="absolute z-10 right-0 mt-2 p-2 bg-white rounded-md shadow-lg" style={{ width: '200px' }}>
          <div className="grid grid-cols-6 gap-1">
            {colorOptions.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(layer.id, 'color', color);
                  setIsColorPickerOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div ref={drop} className={`mb-2 border rounded ${isDragging ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-center p-3 bg-gray-100 cursor-pointer" onClick={toggleExpansion}>
        <div className="flex items-center">
          <span ref={drag} className="cursor-move mr-2">
            <FaGripVertical />
          </span>
          <h3 className="font-semibold">Layer {index + 1}: {layer.material}</h3>
        </div>
        <div className="flex items-center">
          <ColorPicker />
          <button onClick={(e) => { e.stopPropagation(); onRemove(layer.id); }} className="text-red-500 ml-2">
            <FaTrash />
          </button>
          {isExpanded ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
        </div>
      </div>
      {isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 gap-2">
          <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <Select
                options={materials.map((value) => ({ value: value, label: value }))}
                value={layer.material ? { value: layer.material, label: layer.material } : null}
                onChange={handleTypeChange}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Supplier</label>
              <Select
                isDisabled={!layer.material}
                options={manufacturers(layer.material).map((value) => ({ value: value, label: value }))}
                value={layer.manufacturer ? { value: layer.manufacturer, label: layer.manufacturer } : null}
                onChange={handleManufacturerChange}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Product</label>
              <Select
                isDisabled={!layer.material || !layer.manufacturer}
                options={products(layer.material, layer.manufacturer).map((value) => ({ value: value, label: value }))}
                value={{ value: layer.product, label: layer.product }}
                onChange={(option) => onChange(layer.id, 'product', option?.value || '')}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Thickness (cm): {layer.thickness}</label>
              <input
                type="range"
                min={layer.min}
                max={layer.max}
                step="0.01"
                value={layer.thickness}
                onChange={(e) => onChange(layer.id, 'thickness', parseFloat(e.target.value))}
                className="mt-1 w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface LayerListProps {
  layers: LayerType[];
  onLayerChange: (id: string, field: keyof LayerType, value: string | number) => void;
  onAddLayer: () => void;
  onRemoveLayer: (id: string) => void;
  onReorderLayers: (startIndex: number, endIndex: number) => void;
  setItems: React.Dispatch<React.SetStateAction<item[]>>;
  items: item[];
  expandedLayers: string[];
  toggleLayerExpansion: (layerId: string) => void;
}

const LayerList: React.FC<LayerListProps> = ({
  layers,
  onLayerChange,
  onAddLayer,
  onRemoveLayer,
  onReorderLayers,
  setItems,
  items,
  expandedLayers,
  toggleLayerExpansion
}) => {
  const moveLayer = (dragIndex: number, hoverIndex: number) => {
    onReorderLayers(dragIndex, hoverIndex);
  };

  const updateItems = useCallback((updatedLayer: LayerType) => {
    const newItem = getItem(updatedLayer.material, updatedLayer.manufacturer, updatedLayer.product);
    if (newItem) {
      setItems((prevItems: item[]) => {
        const updatedItems = prevItems.map(item => 
          item.id === updatedLayer.id 
            ? { ...newItem, thickness: updatedLayer.thickness, id: updatedLayer.id }
            : item
        );

        if (!updatedItems.some(item => item.id === updatedLayer.id)) {
          updatedItems.push({ ...newItem, thickness: updatedLayer.thickness, id: updatedLayer.id });
        }

        return updatedItems;
      });
    } else {
      // If the item doesn't exist (e.g., incomplete selection), remove it from the items array
      setItems((prevItems: item[]) => prevItems.filter(item => item.id !== updatedLayer.id));
    }
  }, [setItems]);

  const handleLayerChange = (id: string, field: keyof LayerType, value: string | number) => {
    onLayerChange(id, field, value);
    const updatedLayer = layers.find(layer => layer.id === id);
    if (updatedLayer) {
      updateItems({ ...updatedLayer, [field]: value });
    }
  };

  const handleLayerRemove = (id: string) => {
    onRemoveLayer(id);
    // Remove the corresponding item from the algorithm results
    setItems((prevItems: item[]) => prevItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Layer Details</h2>
      <button
        onClick={onAddLayer}
        className="w-full py-3 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md hover:from-green-500 hover:to-blue-600 transition-colors duration-300 flex items-center justify-center shadow-md mb-4"
      >
        <FaPlus className="mr-2" /> Add Layer
      </button>
      <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {layers.map((layer, index) => (
          <LayerItem
            key={layer.id}
            layer={layer}
            index={index}
            onChange={handleLayerChange}
            onRemove={handleLayerRemove}
            moveLayer={moveLayer}
            isExpanded={expandedLayers.includes(layer.id)}
            toggleExpansion={() => toggleLayerExpansion(layer.id)}
          />
        ))}
      </div>
    </div>
  );
};

export { LayerList, LayerItem };