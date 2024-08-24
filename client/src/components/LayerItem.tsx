import React, { useCallback, useMemo, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { LayerType, Model } from "../types";
import {
  FaTrash,
  FaGripVertical,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import Select from "react-select";
import { getItem, manufacturers, materials, products } from "../data/Materials";
import ColorPicker from "./ColorPicker";
import useTranslations from "../hooks/useTranslations";

interface LayerItemProps {
  layer: LayerType;
  index: number;
  onChange: (
    id: string,
    field: keyof LayerType,
    value: string | number
  ) => void;
  onRemove: (id: string) => void;
  moveLayer: (dragIndex: number, hoverIndex: number) => void;
  isExpanded: boolean;
  toggleExpansion: () => void;
  setItems: React.Dispatch<React.SetStateAction<Model[]>>;
}

const LayerItem: React.FC<LayerItemProps> = React.memo(
  ({
    layer,
    index,
    onChange,
    onRemove,
    moveLayer,
    isExpanded,
    toggleExpansion,
  }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "LAYER",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: "LAYER",
      hover(item: { index: number }) {
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) return;
        moveLayer(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const { t } = useTranslations();

    const handleTypeChange = useCallback(
      (option: { value: string; label: string } | null) => {
        const newType = option?.value || "";
        onChange(layer.id, "material", newType);
        onChange(layer.id, "manufacturer", "");
        onChange(layer.id, "product", "");
      },
      [layer.id, onChange]
    );

    const handleManufacturerChange = useCallback(
      (option: { value: string; label: string } | null) => {
        const newManufacturer = option?.value || "";
        onChange(layer.id, "manufacturer", newManufacturer);
        onChange(layer.id, "product", "");
      },
      [layer.id, onChange]
    );

    const handleThicknessChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (value === "") {
          onChange(layer.id, "thickness", layer.min);
          return;
        }
        let thickness = Number(value);
        if (!isNaN(thickness)) {
          thickness = Math.max(layer.min, Math.min(layer.max, thickness));
          onChange(layer.id, "thickness", thickness);
        }
      },
      [layer.id, layer.min, layer.max, onChange]
    );

    useEffect(() => {
      if (layer.product && layer.material && layer.manufacturer) {
        const newItem = getItem(
          layer.material,
          layer.manufacturer,
          layer.product
        );
        if (newItem) {
          onChange(layer.id, "min", newItem.min);
          onChange(layer.id, "max", newItem.max);
          if (newItem.min === newItem.max) {
            onChange(layer.id, "thickness", newItem.min);
          }
        }
      }
    }, [layer.manufacturer, layer.material, layer.product, layer.id, onChange]);

    const materialOptions = useMemo(
      () => materials.map((value) => ({ value, label: value })),
      []
    );

    const manufacturerOptions = useMemo(
      () =>
        manufacturers(layer.material).map((value) => ({ value, label: value })),
      [layer.material]
    );

    const productOptions = useMemo(
      () =>
        products(layer.material, layer.manufacturer).map((value) => ({
          value,
          label: value,
        })),
      [layer.material, layer.manufacturer]
    );

    return (
      <div
        ref={drop}
        className={`mb-4 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 ${
          isDragging ? "opacity-50" : ""
        } ${isExpanded ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}`}
      >
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={toggleExpansion}
        >
          <div className="flex items-center">
            <span
              ref={drag}
              className="cursor-move mr-3 text-gray-400 hover:text-gray-600"
            >
              <FaGripVertical />
            </span>
            <h3 className="font-semibold text-lg text-gray-800">
              {" "}
              {layer.material || t("Not selected")}
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <ColorPicker
              color={layer.color}
              onChange={(color) => onChange(layer.id, "color", color)}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(layer.id);
              }}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <FaTrash />
            </button>
            <div className="text-gray-400">
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
        </div>
        {isExpanded && (
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("Material")}
                </label>

                <Select
                  isRtl={true}
                  options={materialOptions}
                  value={
                    layer.material
                      ? { value: layer.material, label: layer.material }
                      : null
                  }
                  onChange={handleTypeChange}
                  className="basic-single"
                  classNamePrefix="select"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("Manufacturer")}
                </label>
                <Select
                  isRtl={true}
                  isDisabled={!layer.material}
                  options={manufacturerOptions}
                  value={
                    layer.manufacturer
                      ? { value: layer.manufacturer, label: layer.manufacturer }
                      : null
                  }
                  onChange={handleManufacturerChange}
                  className="basic-single"
                  classNamePrefix="select"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("Product")}
                </label>
                <Select
                  isRtl={true}
                  isDisabled={!layer.material || !layer.manufacturer}
                  options={productOptions}
                  value={
                    layer.product
                      ? { value: layer.product, label: layer.product }
                      : null
                  }
                  onChange={(option) =>
                    onChange(layer.id, "product", option?.value || "")
                  }
                  className="basic-single"
                  classNamePrefix="select"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("Thickness")} (cm)
                </label>
                {layer.min === layer.max ? (
                  <input
                    type="number"
                    value={layer.thickness}
                    disabled
                    className="mt-1 block w-64 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                ) : (
                  <input
                    type="number"
                    disabled={!layer.product}
                    min={layer.min ?? 0}
                    max={layer.max ?? 10}
                    step="0.01"
                    value={layer.thickness}
                    onChange={handleThicknessChange}
                    onBlur={() =>
                      onChange(
                        layer.id,
                        "thickness",
                        Math.max(
                          layer.min,
                          Math.min(layer.max, layer.thickness)
                        )
                      )
                    }
                    className="mt-1 w-64 block p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default LayerItem;
