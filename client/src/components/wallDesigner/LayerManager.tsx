// src/components/wallDesigner/LayerManager.tsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Alert,
  Stack,
  Divider,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useDrop } from "react-dnd";
import { LayerType } from "../../types";
import LayerForm from "./LayerForm";
import useTranslations from "../../hooks/useTranslations";

interface LayerManagerProps {
  layers: LayerType[];
  onLayerChange: (
    id: string,
    field: keyof LayerType,
    value: string | number
  ) => void;
  onAddLayer?: () => void;
  onRemoveLayer?: (id: string) => void;
  onRemoveAllLayers?: () => void;
  onReorderLayers?: (startIndex: number, endIndex: number) => void;
  selectedLayerId?: string;
}

const LayerManager: React.FC<LayerManagerProps> = ({
  layers,
  onLayerChange,
  onAddLayer,
  onRemoveLayer,
  onRemoveAllLayers,
  onReorderLayers,
  selectedLayerId,
}) => {
  const { t } = useTranslations();

  const [, drop] = useDrop({
    accept: "LAYER",
    drop: () => ({ name: "LayerManager" }),
  });

  return (
    <Box ref={drop}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h2" fontWeight="bold">
          {t("Layer Details")}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={onAddLayer || undefined}
            disabled={!onAddLayer}
          >
            {t("Add Layer")}
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={onRemoveAllLayers || undefined}
            disabled={layers.length === 0 || !onRemoveAllLayers}
          >
            {t("Delete All Layers")}
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {layers.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          {t("No layers added. Click 'Add Layer' to get started.")}
        </Alert>
      ) : (
        <List
          sx={{ maxHeight: "calc(100vh - 350px)", overflow: "auto", pr: 1 }}
        >
          {layers.map((layer, index) => (
            <ListItem
              key={layer.id}
              sx={{
                display: "block",
                p: 0,
                mb: 2,
                backgroundColor:
                  layer.id === selectedLayerId
                    ? "rgba(61, 141, 122, 0.05)"
                    : "transparent",
                borderRadius: 2,
                border: layer.id === selectedLayerId ? "1px solid" : "none",
                borderColor: "primary.main",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              // Remove the onClick handler here
            >
              <LayerForm
                layer={layer}
                index={index}
                onChange={onLayerChange}
                onRemove={onRemoveLayer}
                moveLayer={onReorderLayers}
                isSelected={layer.id === selectedLayerId}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default LayerManager;
