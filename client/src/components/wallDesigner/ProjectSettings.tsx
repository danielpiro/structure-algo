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
  IconButton,
} from "@mui/material";
import { Settings, Save, FolderOpen } from "@mui/icons-material";
import { LayerType } from "../../types";
import useTranslations from "../../hooks/useTranslations";

interface ProjectSettingsProps {
  projectType: string;
  projectLocation: string;
  onProjectTypeChange: (value: string) => void;
  onProjectLocationChange: (value: string) => void;
  modelType: string;
  isolationType: string;
  wallColor: string;
  onModelTypeChange: (value: string) => void;
  onIsolationTypeChange: (value: string) => void;
  onWallColorChange: (value: string) => void;
  savedModels: { [key: string]: LayerType[] };
  onSaveModel: (modelName: string) => void;
  onLoadModel: (modelName: string) => void;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({
  projectType,
  projectLocation,
  onProjectTypeChange,
  onProjectLocationChange,
  modelType,
  isolationType,
  wallColor,
  onModelTypeChange,
  onIsolationTypeChange,
  onWallColorChange,
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
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Grid container spacing={3}>
          {/* Project Settings */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              <Settings fontSize="small" sx={{ mr: 1 }} />
              {t("Project Settings")}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="project-type-label">
                    {t("Project Type")}
                  </InputLabel>
                  <Select
                    labelId="project-type-label"
                    value={projectType}
                    label={t("Project Type")}
                    onChange={(e) => onProjectTypeChange(e.target.value)}
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
                    value={projectLocation}
                    label={t("Project Location")}
                    onChange={(e) => onProjectLocationChange(e.target.value)}
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
                <FormControl fullWidth>
                  <InputLabel id="model-type-label">
                    {t("Model Type")}
                  </InputLabel>
                  <Select
                    labelId="model-type-label"
                    value={modelType}
                    label={t("Model Type")}
                    onChange={(e) => onModelTypeChange(e.target.value)}
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
                <FormControl fullWidth>
                  <InputLabel id="isolation-type-label">
                    {t("Isolation Type")}
                  </InputLabel>
                  <Select
                    labelId="isolation-type-label"
                    value={isolationType}
                    label={t("Isolation Type")}
                    onChange={(e) => onIsolationTypeChange(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>בחר</em>
                    </MenuItem>
                    <MenuItem value="בידוד חוץ">בידוד חוץ</MenuItem>
                    <MenuItem value="בידוד פנים">בידוד פנים</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {modelType === "קיר חוץ" && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="wall-color-label">
                      {t("Wall Color")}
                    </InputLabel>
                    <Select
                      labelId="wall-color-label"
                      value={wallColor}
                      label={t("Wall Color")}
                      onChange={(e) => onWallColorChange(e.target.value)}
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
              >
                {t("Save Current Model")}
              </Button>
              <Button
                variant="outlined"
                startIcon={<FolderOpen />}
                onClick={handleLoadClick}
                fullWidth
              >
                {t("Load Saved Model")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Save Model Dialog */}
      <Dialog open={activeDialog === "saveModel"} onClose={handleClose}>
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
      <Dialog open={activeDialog === "loadModel"} onClose={handleClose}>
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
