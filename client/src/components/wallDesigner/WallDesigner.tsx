// src/components/wallDesigner/WallDesigner.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  IconButton,
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
import useTranslations from "../../hooks/useTranslations";

const steps = ["הגדרות פרויקט", "בחירת שכבות", "תוצאות"];

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedModels, setSavedModels] = useState<{
    [key: string]: LayerType[];
  }>({});
  const [activeStep, setActiveStep] = useState(0);

  const [projectType, setProjectType] = useState<string>("");
  const [projectLocation, setProjectLocation] = useState<string>("");
  const [modelType, setModelType] = useState<string>("");
  const [isolationType, setIsolationType] = useState<string>("");
  const [wallColor, setWallColor] = useState<string>("");

  const { t } = useTranslations();

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
    updateLayers([]);
    setItems([]);
    setSelectedLayer(null);
    setSidebarOpen(false);
  }, [updateLayers]);

  const saveCurrentModel = useCallback(
    (modelName: string) => {
      setSavedModels((prevModels) => ({
        ...prevModels,
        [modelName]: layers,
      }));
    },
    [layers]
  );

  const loadSavedModel = useCallback(
    (modelName: string) => {
      if (savedModels[modelName]) {
        updateLayers(savedModels[modelName]);
      }
    },
    [savedModels, updateLayers]
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

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        sx={{
          py: 4,
          bgcolor: "background.default",
          minHeight: "calc(100vh - 64px)",
          position: "relative",
        }}
      >
        <Container maxWidth="xl">
          {/* Stepper */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          {/* Settings Panel */}
          <ProjectSettings
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

          {/* Main Content */}
          <Grid container spacing={4}>
            {/* Left Side - Layer Configuration */}
            <Grid item xs={12} md={5}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: "white",
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  height: "100%",
                }}
              >
                <LayerManager
                  layers={layers}
                  onLayerChange={handleLayerChange}
                  onAddLayer={handleAddLayer}
                  onRemoveLayer={handleRemoveLayer}
                  onRemoveAllLayers={handleRemoveAllLayers}
                  onReorderLayers={handleSwapLayers}
                  selectedLayerId={selectedLayer?.id}
                />
              </Paper>
            </Grid>

            {/* Right Side - 3D Model and Results */}
            <Grid item xs={12} md={7}>
              <Grid container direction="column" spacing={4}>
                {/* 3D Model */}
                <Grid item>
                  <Paper
                    sx={{
                      bgcolor: "white",
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Box sx={{ height: 500, width: "100%" }}>
                      <ModelViewer
                        layers={layers}
                        onLayerClick={handleLayerClick}
                        selectedLayerId={selectedLayer?.id}
                      />
                    </Box>

                    {/* Toggle button for the sidebar */}
                    {selectedLayer && !sidebarOpen && (
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "background.paper",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          "&:hover": {
                            bgcolor: "background.paper",
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
                  <ResultsPanel
                    items={items}
                    projectType={projectType}
                    projectLocation={projectLocation}
                    modelType={modelType}
                    isolationType={isolationType}
                    wallColor={wallColor}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 2 }}
            >
              חזרה
            </Button>

            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? undefined : handleNext}
              disabled={activeStep === steps.length - 1}
            >
              {activeStep === steps.length - 1 ? "סיום" : "המשך"}
            </Button>
          </Box>
        </Container>

        {/* Sidebar Panel */}
        <SidebarPanel
          open={sidebarOpen}
          onClose={handleCloseSidebar}
          selectedLayer={selectedLayer}
        />
      </Box>
    </DndProvider>
  );
};

export default WallDesigner;
