import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Theme,
  Alert,
} from "@mui/material";
import { Settings, Save, FolderOpen } from "@mui/icons-material";
import { LayerType } from "../../types";
import useTranslations from "../../hooks/useTranslations";

interface ProjectSettingsProps {
  projectSettings: {
    projectType: string;
    projectLocation: string;
    modelType: string;
    isolationType: string;
    wallColor: string;
  };
  workflowState: {
    isProjectConfigured: boolean;
    isModelConfigured: boolean;
  };
  updateProjectSetting: (field: string, value: string) => void;
  savedModels: { [key: string]: LayerType[] };
  onSaveModel: (modelName: string) => void;
  onLoadModel: (modelName: string) => void;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({
  projectSettings,
  workflowState,
  updateProjectSetting,
  savedModels,
  onSaveModel,
  onLoadModel,
}) => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [newModelName, setNewModelName] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const { t } = useTranslations();

  const handleSaveClick = () => {
    setActiveDialog("saveModel");
    setNewModelName("");
  };

  const handleLoadClick = () => {
    setActiveDialog("loadModel");
    setSelectedModel("");
  };

  const handleClose = () => {
    setActiveDialog(null);
  };

  const handleSave = () => {
    if (newModelName.trim()) {
      onSaveModel(newModelName.trim());
      handleClose();
    }
  };

  const handleLoad = () => {
    if (selectedModel) {
      onLoadModel(selectedModel);
      handleClose();
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: `0 8px 24px rgba(0,0,0,0.08)`,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: (theme: Theme) =>
              `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            borderRadius: "2px 2px 0 0",
          },
        }}
      >
        <Grid container spacing={3}>
          {/* Project Settings */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              <Settings
                fontSize="small"
                sx={{
                  mr: 1,
                  color: "primary.main",
                }}
              />
              {t("Project Settings")}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                      "&.Mui-focused": {
                        transform: "translateY(-2px)",
                      },
                    },
                  }}
                >
                  <InputLabel id="project-type-label">
                    {t("Project Type")}
                  </InputLabel>
                  <Select
                    labelId="project-type-label"
                    value={projectSettings.projectType}
                    label={t("Project Type")}
                    onChange={(e) =>
                      updateProjectSetting("projectType", e.target.value)
                    }
                  >
                    <MenuItem value="">
                      <em>בחר</em>
                    </MenuItem>
                    <MenuItem value="מגורים">מגורים</MenuItem>
                    <MenuItem value="משרדים">משרדים</MenuItem>
                    <MenuItem value="מסחר">מסחר</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="project-location-label">
                    {t("Project Location")}
                  </InputLabel>
                  <Select
                    labelId="project-location-label"
                    value={projectSettings.projectLocation}
                    label={t("Project Location")}
                    onChange={(e) =>
                      updateProjectSetting("projectLocation", e.target.value)
                    }
                  >
                    <MenuItem value="">
                      <em>בחר</em>
                    </MenuItem>
                    <MenuItem value="א">אזור א</MenuItem>
                    <MenuItem value="ב">אזור ב</MenuItem>
                    <MenuItem value="ג">אזור ג</MenuItem>
                    <MenuItem value="ד">אזור ד</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {!workflowState.isProjectConfigured && (
              <Alert severity="info" sx={{ mt: 2 }}>
                {t("Please complete project settings before proceeding")}
              </Alert>
            )}
          </Grid>

          {/* Model Settings */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              <Settings fontSize="small" sx={{ mr: 1 }} />
              {t("Model Settings")}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  disabled={!workflowState.isProjectConfigured}
                >
                  <InputLabel id="model-type-label">
                    {t("Model Type")}
                  </InputLabel>
                  <Select
                    labelId="model-type-label"
                    value={projectSettings.modelType}
                    label={t("Model Type")}
                    onChange={(e) =>
                      updateProjectSetting("modelType", e.target.value)
                    }
                  >
                    <MenuItem value="">
                      <em>בחר</em>
                    </MenuItem>
                    <MenuItem value="קיר חוץ">קיר חוץ</MenuItem>
                    <MenuItem value="קיר הפרדה">קיר הפרדה</MenuItem>
                    <MenuItem value="גג עליון">גג עליון</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  disabled={!workflowState.isProjectConfigured}
                >
                  <InputLabel id="isolation-type-label">
                    {t("Isolation Type")}
                  </InputLabel>
                  <Select
                    labelId="isolation-type-label"
                    value={projectSettings.isolationType}
                    label={t("Isolation Type")}
                    onChange={(e) =>
                      updateProjectSetting("isolationType", e.target.value)
                    }
                  >
                    <MenuItem value="">
                      <em>בחר</em>
                    </MenuItem>
                    <MenuItem value="בידוד חוץ">בידוד חוץ</MenuItem>
                    <MenuItem value="בידוד פנים">בידוד פנים</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {projectSettings.modelType === "קיר חוץ" && (
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    disabled={!workflowState.isProjectConfigured}
                  >
                    <InputLabel id="wall-color-label">
                      {t("Wall Color")}
                    </InputLabel>
                    <Select
                      labelId="wall-color-label"
                      value={projectSettings.wallColor}
                      label={t("Wall Color")}
                      onChange={(e) =>
                        updateProjectSetting("wallColor", e.target.value)
                      }
                    >
                      <MenuItem value="">
                        <em>בחר</em>
                      </MenuItem>
                      <MenuItem value="גוון בהיר">גוון בהיר</MenuItem>
                      <MenuItem value="גוון כהה">גוון כהה</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
            {workflowState.isProjectConfigured &&
              !workflowState.isModelConfigured && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  {t("Please complete model settings before adding layers")}
                </Alert>
              )}
          </Grid>

          {/* Saved Models Controls */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              <Save fontSize="small" sx={{ mr: 1 }} />
              {t("Saved Models")}
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<Save />}
                onClick={handleSaveClick}
                fullWidth
                disabled={!workflowState.isModelConfigured}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  borderWidth: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderWidth: 2,
                    transform: "translateY(-2px)",
                    boxShadow: (theme: Theme) =>
                      `0 4px 12px ${theme.palette.primary.main}20`,
                  },
                }}
              >
                {t("Save Current Model")}
              </Button>
              <Button
                variant="outlined"
                startIcon={<FolderOpen />}
                onClick={handleLoadClick}
                fullWidth
                disabled={!workflowState.isModelConfigured}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  borderWidth: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderWidth: 2,
                    transform: "translateY(-2px)",
                    boxShadow: (theme: Theme) =>
                      `0 4px 12px ${theme.palette.primary.main}20`,
                  },
                }}
              >
                {t("Load Saved Model")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Save Model Dialog */}
      <Dialog
        open={activeDialog === "saveModel"}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
          },
        }}
      >
        <DialogTitle>{t("Save Current Model")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t("Enter model name")}
            type="text"
            fullWidth
            variant="outlined"
            value={newModelName}
            onChange={(e) => setNewModelName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("Cancel")}</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!newModelName.trim()}
          >
            {t("Save")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Load Model Dialog */}
      <Dialog
        open={activeDialog === "loadModel"}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
          },
        }}
      >
        <DialogTitle>{t("Load Saved Model")}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="saved-model-label">
              {t("Select a model")}
            </InputLabel>
            <Select
              labelId="saved-model-label"
              value={selectedModel}
              label={t("Select a model")}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {Object.keys(savedModels).map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("Cancel")}</Button>
          <Button
            onClick={handleLoad}
            variant="contained"
            disabled={!selectedModel}
          >
            {t("Load")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectSettings;
