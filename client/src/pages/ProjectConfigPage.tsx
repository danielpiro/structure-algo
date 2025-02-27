import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ProjectSettings from "../components/wallDesigner/ProjectSettings";
import { LayerType } from "../types";

const ProjectConfigPage: React.FC = () => {
  const [projectSettings, setProjectSettings] = useState({
    projectType: "",
    projectLocation: "",
    modelType: "",
    isolationType: "",
    wallColor: "",
  });

  const [workflowState, setWorkflowState] = useState({
    isProjectConfigured: false,
    isModelConfigured: false,
  });

  const updateProjectSetting = (field: string, value: string) => {
    setProjectSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update workflow state when settings change
  React.useEffect(() => {
    setWorkflowState({
      isProjectConfigured: Boolean(
        projectSettings.projectType && projectSettings.projectLocation
      ),
      isModelConfigured: Boolean(
        projectSettings.modelType &&
          projectSettings.isolationType &&
          (projectSettings.modelType !== "קיר חוץ" || projectSettings.wallColor)
      ),
    });
  }, [projectSettings]);
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
        projectSettings={projectSettings}
        workflowState={workflowState}
        updateProjectSetting={updateProjectSetting}
        savedModels={savedModels}
        onSaveModel={handleSaveModel}
        onLoadModel={handleLoadModel}
      />
    </Box>
  );
};

export default ProjectConfigPage;
