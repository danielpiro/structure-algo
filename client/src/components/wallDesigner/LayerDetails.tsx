// src/components/wallDesigner/LayerDetails.tsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Tooltip,
  Slider,
  IconButton,
  useTheme,
  Theme,
} from "@mui/material";
import {
  Article as ArticleIcon,
  ColorLens,
  FormatPaint,
  Opacity,
  Info,
  ThreeDRotation,
  Visibility,
} from "@mui/icons-material";
import { getItem } from "../../data/Materials";
import useTranslations from "../../hooks/useTranslations";
import { LayerType } from "../../types";
import ColorSelector from "../../ui/ColorSelector";

interface LayerDetailsProps {
  layer: LayerType;
  onLayerChange?: (
    layerId: string,
    field: keyof LayerType,
    value: string | number
  ) => void;
}

const LayerDetails: React.FC<LayerDetailsProps> = ({
  layer,
  onLayerChange,
}) => {
  const theme = useTheme();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [textureValue, setTextureValue] = React.useState(30);
  const { t } = useTranslations();

  const itemDetails = getItem(
    layer.material,
    layer.manufacturer,
    layer.product
  );

  if (!itemDetails) return null;

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleColorChange = (newColor: string) => {
    if (onLayerChange) {
      onLayerChange(layer.id, "color", newColor);
    }
  };

  const handleTextureChange = (_: Event, value: number | number[]) => {
    const textureValue = value as number;
    setTextureValue(textureValue);
    if (onLayerChange) {
      onLayerChange(layer.id, "texture", textureValue);
    }
  };

  const propertyGroups = [
    {
      title: t("Material Properties"),
      items: [
        {
          label: t("Material"),
          value: itemDetails.material,
          icon: <FormatPaint />,
          tooltip: t("Base material type"),
        },
        {
          label: t("Manufacturer"),
          value: itemDetails.manufacturer,
          icon: <ArticleIcon fontSize="small" />,
        },
        {
          label: t("Product"),
          value: itemDetails.product,
          icon: <ThreeDRotation />,
        },
      ],
    },
    {
      title: t("Physical Properties"),
      items: [
        {
          label: t("Thickness"),
          value: `${layer.thickness.toFixed(3)} ${t("cm")}`,
          icon: <Opacity />,
          tooltip: t("Material thickness in centimeters"),
        },
        {
          label: t("Thermal Conductivity"),
          value: `${itemDetails.thermalConductivity.toFixed(3)} W/(m·K)`,
          icon: <Info />,
          tooltip: t("Rate of heat transfer through the material"),
        },
        {
          label: t("Mass"),
          value: `${itemDetails.specificMass} kg/m³`,
          icon: <Info />,
          tooltip: t("Material density per cubic meter"),
        },
      ],
    },
  ];

  const documentButtons = ["תו תקן ירוק", "יצור מקומי", "VOC", "LCA/EPD"];

  return (
    <Box>
      {/* Material Customization */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          background: (theme: Theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}10 100%)`,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
        >
          <ColorLens sx={{ fontSize: 20 }} />
          {t("Material Customization")}
        </Typography>

        <Grid container spacing={3}>
          {/* Material Color */}
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "text.secondary",
                }}
              >
                {t("Surface Color")}
              </Typography>
              <ColorSelector
                color={layer.color || "#FFFFFF"}
                onChange={handleColorChange}
              />
            </Box>
          </Grid>

          {/* Material Texture */}
          <Grid item xs={12}>
            <Typography
              variant="caption"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
              }}
            >
              {t("Surface Texture")}
            </Typography>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "background.default",
              }}
            >
              <Slider
                size="small"
                value={textureValue}
                onChange={handleTextureChange}
                valueLabelDisplay="auto"
                sx={{
                  "& .MuiSlider-thumb": {
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  },
                }}
              />
              <Tooltip title={t("Preview in 3D model")}>
                <IconButton size="small">
                  <Visibility />
                </IconButton>
              </Tooltip>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Property Groups */}
      {propertyGroups.map((group) => (
        <Box key={group.title} sx={{ mb: 4 }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 2, color: "text.secondary" }}
          >
            {group.title}
          </Typography>
          <Grid container spacing={2}>
            {group.items.map(({ label, value, icon, tooltip }) => (
              <Grid item xs={12} key={label}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "background.default",
                    borderRadius: 2,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}10`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <Box sx={{ color: "text.secondary" }}>{icon}</Box>
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                    {tooltip && (
                      <Tooltip title={tooltip}>
                        <Info sx={{ fontSize: 16, color: "text.disabled" }} />
                      </Tooltip>
                    )}
                  </Box>
                  <Typography variant="body1" fontWeight="medium">
                    {value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Documents Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArticleIcon />}
          onClick={handleOpenDialog}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            background: (theme: Theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
            boxShadow: (theme: Theme) =>
              `0 8px 16px ${theme.palette.primary.main}20`,
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
            },
          }}
        >
          {t("Documents")}
        </Button>
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t("Documents")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {documentButtons.map((button) => (
              <Grid item xs={6} sm={4} key={button}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    borderRadius: 2,
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
                  {button}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t("Close")}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LayerDetails;
