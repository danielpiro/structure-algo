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
  Chip,
  Paper,
} from "@mui/material";
import { getItem } from "../../data/Materials";
import useTranslations from "../../hooks/useTranslations";
import { LayerType } from "../../types";
import { Article as ArticleIcon } from "@mui/icons-material";

interface LayerDetailsProps {
  layer: LayerType;
}

const LayerDetails: React.FC<LayerDetailsProps> = ({ layer }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
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

  const details = [
    { label: t("Material"), value: itemDetails.material },
    { label: t("Manufacturer"), value: itemDetails.manufacturer },
    { label: t("Product"), value: itemDetails.product },
    {
      label: t("Thickness"),
      value: `${layer.thickness.toFixed(3)} ${t("cm")}`,
    },
    {
      label: t("Thermal Conductivity"),
      value: `${itemDetails.thermalConductivity.toFixed(3)} W/(m·K)`,
    },
    { label: t("Mass"), value: `${itemDetails.specificMass} kg/m³` },
  ];

  const documentButtons = ["תו תקן ירוק", "יצור מקומי", "VOC", "LCA/EPD"];

  return (
    <Box>
      <Grid container spacing={2}>
        {details.map(({ label, value }) => (
          <Grid item xs={12} key={label}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                backgroundColor: "background.default",
                borderRadius: 2,
                height: "100%",
              }}
            >
              <Typography variant="caption" color="text.secondary" gutterBottom>
                {label}
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {value}
              </Typography>
            </Box>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArticleIcon />}
              onClick={handleOpenDialog}
            >
              {t("Documents")}
            </Button>
          </Box>
        </Grid>
      </Grid>

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
                  sx={{ height: "100%", textAlign: "center" }}
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
