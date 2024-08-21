import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { LayerType } from '../types';
import { FaTrash, FaPlus, FaGripVertical } from 'react-icons/fa';
import Select from 'react-select';
import { getItem, item, manufacturers, materials, products } from '../data/Materials';

const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    borderColor: '#d1d5db',
    '&:hover': {
      borderColor: '#9ca3af',
    },
  }),
  option: (provided: any, state: { isSelected: any; }) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#8b5cf6' : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      backgroundColor: '#a78bfa',
      color: 'white',
    },
  }),
};

interface LayerItemProps {
  layer: LayerType;
  index: number;
  onChange: (id: string, field: keyof LayerType, value: string | number) => void;
  onRemove: (id: string) => void;
  moveLayer: (dragIndex: number, hoverIndex: number) => void;
  setItem: (item: item) => void;
}

const LayerItem: React.FC<LayerItemProps> = ({ layer, index, onChange, onRemove, moveLayer , setItem }) => {

  const [typeOption , setTypeOption] = useState<string>('');
  const [manafactureOption , setManafactureOption] = useState<string>('');
  const [values , setValues] = useState<{
    manufacturer: string;
    product: string;
  }>({} as {manufacturer: string, product: string});

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

      if (dragIndex === hoverIndex) {
        return;
      }

      moveLayer(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  useEffect(() => {
    if(values.product) {
      const item  = getItem(typeOption, manafactureOption, values.product);
      setItem(item as item);
    }
  } , [manafactureOption, setItem, typeOption, values])
    

  return (
    <div ref={drop} className={`p-4 mb-2 border rounded ${isDragging ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span ref={drag} className="cursor-move mr-2">
            <FaGripVertical />
          </span>
          <h3 className="font-semibold">Layer {index + 1}</h3>
        </div>
        <button onClick={() => onRemove(layer.id)} className="text-red-500">
          <FaTrash />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <Select
            options={materials.map((value) => ({ value: value, label: value }))}
            value= {{ value: layer.material, label: layer.material }}
            onChange={(option) => {
              onChange(layer.id, 'material', option?.value || '');
              setTypeOption(option?.value || '');
              setValues({manufacturer: '', product: ''});
              
            }}
            styles={customSelectStyles}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Supplier</label>
          <Select
            isDisabled={!typeOption}
            options={manufacturers(typeOption).map((value) => ({ value: value, label: value }))}
            value={{ value: values.manufacturer, label: values.manufacturer }}
            onChange={(option) => {
              onChange(layer.id, 'manufacturer', option?.value || '');
              setManafactureOption(option?.value || '');
              setValues({...values, manufacturer: option?.value || '', product: ''});
            }}
            styles={customSelectStyles}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product</label>
          <Select
            isDisabled={!typeOption || !manafactureOption}
            options={products(typeOption, manafactureOption).map((value) => ({ value: value, label: value }))}
            value={{ value: values.product, label: values.product }}
            onChange={(option) => {
              onChange(layer.id, 'product', option?.value || '');
              setValues({...values, product: option?.value || ''});
            }}
            styles={customSelectStyles}
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
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <input
          type="color"
          value={layer.color}
          onChange={(e) => onChange(layer.id, 'color', e.target.value)}
          className="mt-1 block w-full h-8 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

interface LayerListProps {
  layers: LayerType[];
  onLayerChange: (id: string, field: keyof LayerType, value: string | number) => void;
  onAddLayer: () => void;
  onRemoveLayer: (id: string) => void;
  onReorderLayers: (startIndex: number, endIndex: number) => void;
  setItem: (item: item) => void;
}

const LayerList: React.FC<LayerListProps> = ({
  layers,
  onLayerChange,
  onAddLayer,
  onRemoveLayer,
  onReorderLayers,
  setItem
}) => {
  const moveLayer = (dragIndex: number, hoverIndex: number) => {
    onReorderLayers(dragIndex, hoverIndex);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Layer Details</h2>
        <button
          onClick={onAddLayer}
          className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <FaPlus className="mr-2" /> Add Layer
        </button>
      </div>
      {layers.map((layer, index) => (
        <LayerItem
          key={layer.id}
          layer={layer}
          index={index}
          onChange={onLayerChange}
          onRemove={onRemoveLayer}
          moveLayer={moveLayer}
          setItem={setItem}
        />
      ))}
    </div>
  );
};

export default LayerList;