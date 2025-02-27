import { useState, useCallback, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  LayerType,
  ModelType,
  ModelDetails,
  ProjectSettings,
  WorkflowState,
} from "../types";

export const useWallDesigner = () => {
  const [projectSettings, setProjectSettings] = useState<ProjectSettings>({
    projectType: "",
    projectLocation: "",
    modelType: "",
    isolationType: "",
    wallColor: "",
  });

  const [workflowState, setWorkflowState] = useState<WorkflowState>({
    isProjectConfigured: false,
    isModelConfigured: false,
  });

  const [selectedModel] = useState<ModelType>("Wall");
  const [modelDetails, setModelDetails] = useState<
    Record<ModelType, ModelDetails>
  >({
    Wall: { layers: [] },
  });

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
      min: 0,
      max: 5,
      thermal: 0.1,
      mass: 1,
      color: "#FFFFFF",
      texture: 0,
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

  const updateLayers = useCallback(
    (newLayers: LayerType[]) => {
      setModelDetails((prevDetails) => ({
        ...prevDetails,
        [selectedModel]: {
          ...prevDetails[selectedModel],
          layers: newLayers,
        },
      }));
    },
    [selectedModel]
  );

  const currentLayers = useMemo(
    () => modelDetails[selectedModel].layers,
    [modelDetails, selectedModel]
  );

  // Update workflow state based on project settings
  useEffect(() => {
    setWorkflowState((prev) => ({
      ...prev,
      isProjectConfigured: Boolean(
        projectSettings.projectType && projectSettings.projectLocation
      ),
      isModelConfigured: Boolean(
        projectSettings.modelType &&
          projectSettings.isolationType &&
          (projectSettings.modelType !== "קיר חוץ" || projectSettings.wallColor)
      ), // Wall color required only for external walls
    }));
  }, [projectSettings]);

  const updateProjectSetting = useCallback(
    (field: keyof ProjectSettings, value: string) => {
      setProjectSettings((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const canAddLayer = useMemo(() => {
    return workflowState.isProjectConfigured && workflowState.isModelConfigured;
  }, [workflowState]);

  return {
    selectedModel,
    layers: currentLayers,
    projectSettings,
    workflowState,
    updateProjectSetting,
    handleLayerChange,
    handleAddLayer: canAddLayer ? handleAddLayer : undefined,
    handleRemoveLayer: canAddLayer ? handleRemoveLayer : undefined,
    handleSwapLayers: canAddLayer ? handleSwapLayers : undefined,
    updateLayers: canAddLayer ? updateLayers : undefined,
  };
};
