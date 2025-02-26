import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ProjectSettings from "../components/wallDesigner/ProjectSettings";
import { LayerType } from "../types";

const ProjectConfigPage: React.FC = () => {
  const [projectType, setProjectType] = useState<string>("");
  const [projectLocation, setProjectLocation] = useState<string>("");
  const [modelType, setModelType] = useState<string>("");
  const [isolationType, setIsolationType] = useState<string>("");
  const [wallColor, setWallColor] = useState<string>("");
  const [savedModels, setSavedModels] = useState<{
    [key: string]: LayerType[];
  }>({});

  const handleSaveModel = (modelName: string) => {
    setSavedModels((prevModels) => ({
      ...prevModels,
      [modelName]: [], // In a real app, this would save current layers
    }));
  };

  const handleLoadModel = (modelName: string) => {
    // In a real app, this would load the selected model's layers
    console.log("Loading model:", modelName);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Project Configuration
      </Typography>
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
        onSaveModel={handleSaveModel}
        onLoadModel={handleLoadModel}
      />
    </Box>
  );
};

export default ProjectConfigPage;
