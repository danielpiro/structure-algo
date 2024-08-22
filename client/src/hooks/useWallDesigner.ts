import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { LayerType, ModelType, ModelDetails } from "../types";

export const useWallDesigner = () => {
  const [selectedModel] = useState<ModelType>("Wall");
  const [modelDetails, setModelDetails] = useState<
    Record<ModelType, ModelDetails>
  >({ Wall: { layers: [] } });

  const handleLayerChange = useCallback(
    (layerId: string, field: keyof LayerType, value: string | number) => {
      setModelDetails((prevDetails) => ({
        ...prevDetails,
        [selectedModel]: {
          layers: prevDetails[selectedModel].layers.map((layer) =>
            layer.id === layerId ? { ...layer, [field]: value } : layer
          ),
        },
      }));
    },
    [selectedModel]
  );

  const handleAddLayer = useCallback(() => {
    const newLayer: LayerType = {
      id: uuidv4(),
      material: "",
      manufacturer: "",
      product: "",
      thickness: 0,
      min: 1,
      max: 10,
      thermal: 0.1,
      mass: 1,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    };
    setModelDetails((prevDetails) => ({
      ...prevDetails,
      [selectedModel]: {
        layers: [...prevDetails[selectedModel].layers, newLayer],
      },
    }));
  }, [selectedModel]);

  const handleRemoveLayer = useCallback(
    (layerId: string) => {
      setModelDetails((prevDetails) => ({
        ...prevDetails,
        [selectedModel]: {
          layers: prevDetails[selectedModel].layers.filter(
            (layer) => layer.id !== layerId
          ),
        },
      }));
    },
    [selectedModel]
  );

  const handleSwapLayers = useCallback(
    (index1: number, index2: number) => {
      setModelDetails((prevDetails) => {
        const newLayers = [...prevDetails[selectedModel].layers];
        [newLayers[index1], newLayers[index2]] = [
          newLayers[index2],
          newLayers[index1],
        ];
        return {
          ...prevDetails,
          [selectedModel]: {
            layers: newLayers,
          },
        };
      });
    },
    [selectedModel]
  );

  return {
    selectedModel,
    modelDetails,
    handleLayerChange,
    handleAddLayer,
    handleRemoveLayer,
    handleSwapLayers,
  };
};
