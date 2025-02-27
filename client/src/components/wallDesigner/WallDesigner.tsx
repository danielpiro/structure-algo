// src/components/wallDesigner/WallDesigner.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  Box,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useWallDesigner } from "../../hooks/useWallDesigner";
import { getItem } from "../../data/Materials";
import { LayerType, Model } from "../../types";
import ModelViewer from "./ModelViewer";
import LayerManager from "./LayerManager";
import ResultsPanel from "./ResultsPanel";
import ProjectSettings from "./ProjectSettings";
import SidebarPanel from "./SidebarPanel";

export const WallDesigner: React.FC = () => {
  const {
    layers,
    projectSettings,
    workflowState,
    updateProjectSetting,
    handleLayerChange,
    handleAddLayer,
    handleRemoveLayer,
    handleSwapLayers,
    updateLayers,
  } = useWallDesigner();

  // Properly type the updateProjectSetting function
  const handleProjectSettingUpdate = (field: string, value: string) => {
    updateProjectSetting(field as keyof typeof projectSettings, value);
  };

  const [items, setItems] = useState<Model[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<LayerType | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedModels, setSavedModels] = useState<{
    [key: string]: LayerType[];
  }>({});

  // Handler for when a layer is clicked in the 3D model
  const handleLayerClick = useCallback((layer: LayerType) => {
    setSelectedLayer(layer);
    setSidebarOpen(true);
  }, []);

  // Handler to close the sidebar
  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleRemoveAllLayers = useCallback(() => {
    if (updateLayers) {
      updateLayers([]);
      setItems([]);
      setSelectedLayer(null);
      setSidebarOpen(false);
    }
  }, [updateLayers]);

  const saveCurrentModel = useCallback(
    (modelName: string) => {
      if (workflowState.isModelConfigured) {
        setSavedModels((prevModels) => ({
          ...prevModels,
          [modelName]: layers,
        }));
      }
    },
    [layers, workflowState.isModelConfigured]
  );

  const loadSavedModel = useCallback(
    (modelName: string) => {
      if (
        workflowState.isModelConfigured &&
        savedModels[modelName] &&
        updateLayers
      ) {
        updateLayers(savedModels[modelName]);
      }
    },
    [savedModels, updateLayers, workflowState.isModelConfigured]
  );

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

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
          bgcolor: "background.default",
          position: "relative",
        }}
      >
        {/* Main Content Area */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Container maxWidth="xl">
            {/* Settings Panel */}
            <ProjectSettings
              projectSettings={projectSettings}
              workflowState={workflowState}
              updateProjectSetting={handleProjectSettingUpdate}
              savedModels={savedModels}
              onSaveModel={saveCurrentModel}
              onLoadModel={loadSavedModel}
            />
            {/* Main Content */}
            <Grid container spacing={4}>
              {/* Left Side - Layer Manager */}
              <Grid item xs={12} md={5}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 0,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    height: "100%",
                    overflow: "hidden",
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Box
                    sx={{
                      p: 3,
                      borderBottom: 1,
                      borderColor: "divider",
                      bgcolor: "background.dark",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="text.primary"
                        fontWeight={500}
                      >
                        Layer Configuration
                      </Typography>
                      {workflowState.isProjectConfigured &&
                        !workflowState.isModelConfigured && (
                          <Typography
                            variant="caption"
                            color="primary"
                            sx={{ fontStyle: "italic" }}
                          >
                            Complete model settings to start
                          </Typography>
                        )}
                    </Box>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <LayerManager
                      layers={layers}
                      onLayerChange={handleLayerChange}
                      onAddLayer={
                        workflowState.isModelConfigured
                          ? handleAddLayer
                          : undefined
                      }
                      onRemoveLayer={
                        workflowState.isModelConfigured
                          ? handleRemoveLayer
                          : undefined
                      }
                      onRemoveAllLayers={
                        workflowState.isModelConfigured
                          ? handleRemoveAllLayers
                          : undefined
                      }
                      onReorderLayers={
                        workflowState.isModelConfigured
                          ? handleSwapLayers
                          : undefined
                      }
                      selectedLayerId={selectedLayer?.id}
                    />
                  </Box>
                </Paper>
              </Grid>

              {/* Right Side - 3D Model and Results */}
              <Grid item xs={12} md={7}>
                <Grid container direction="column" spacing={3}>
                  {/* 3D Model */}
                  <Grid item>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        overflow: "hidden",
                        position: "relative",
                        border: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Box
                        sx={{
                          p: 3,
                          borderBottom: 1,
                          borderColor: "divider",
                          bgcolor: "background.dark",
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="text.primary"
                          fontWeight={500}
                        >
                          Model Preview
                        </Typography>
                      </Box>
                      <Box sx={{ p: 3 }}>
                        <Box
                          sx={{
                            height: 450,
                            width: "100%",
                            bgcolor:
                              layers.length === 0
                                ? "background.dark"
                                : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {layers.length === 0 ? (
                            <Typography color="text.secondary">
                              Add layers to see the 3D model
                            </Typography>
                          ) : (
                            <ModelViewer
                              layers={layers}
                              onLayerClick={handleLayerClick}
                              selectedLayerId={selectedLayer?.id}
                            />
                          )}
                        </Box>
                      </Box>

                      {/* Toggle button for the sidebar */}
                      {selectedLayer && !sidebarOpen && (
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            bgcolor: "background.paper",
                            border: 1,
                            borderColor: "divider",
                            "&:hover": {
                              bgcolor: "background.dark",
                            },
                          }}
                          onClick={() => setSidebarOpen(true)}
                          aria-label="Show details"
                        >
                          <MenuIcon />
                        </IconButton>
                      )}
                    </Paper>
                  </Grid>

                  {/* Results Panel */}
                  <Grid item>
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        overflow: "hidden",
                        border: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Box
                        sx={{
                          p: 3,
                          borderBottom: 1,
                          borderColor: "divider",
                          bgcolor: "background.dark",
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="text.primary"
                          fontWeight={500}
                        >
                          Results
                        </Typography>
                      </Box>
                      <Box sx={{ p: 3 }}>
                        <ResultsPanel
                          items={items}
                          projectType={projectSettings.projectType}
                          projectLocation={projectSettings.projectLocation}
                          modelType={projectSettings.modelType}
                          isolationType={projectSettings.isolationType}
                          wallColor={projectSettings.wallColor}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>

          {/* Sidebar Panel */}
          <SidebarPanel
            open={sidebarOpen}
            onClose={handleCloseSidebar}
            selectedLayer={selectedLayer}
            onLayerChange={handleLayerChange}
          />
        </Box>
      </Box>
    </DndProvider>
  );
};

export default WallDesigner;
