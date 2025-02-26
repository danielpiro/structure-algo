import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Alert,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Model } from "../../types";
import useTranslations from "../../hooks/useTranslations";
import {
  calculateThermalResistance,
  linearInterpolate,
} from "../../utils/calculations";

interface ResultsPanelProps {
  items: Model[];
  projectType: string;
  projectLocation: string;
  modelType: string;
  isolationType: string;
  wallColor: string;
}

// Constants from original code
const constants: { [key: string]: number } = {
  "קיר חוץ": 0.17,
  "קיר הפרדה": 0.26,
  "גג עליון": 0.14,
};

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  items,
  projectType,
  projectLocation,
  modelType,
  isolationType,
  wallColor,
}) => {
  const { t } = useTranslations();
  const theme = useTheme();

  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [isInsulationSufficient, setIsInsulationSufficient] = useState<
    boolean | null
  >(null);
  const [requiredResistance, setRequiredResistance] = useState<number | null>(
    null
  );
  const [calculatedResistance, setCalculatedResistance] = useState<
    number | null
  >(null);

  const thermalResistanceValues = useMemo(() => {
    return items.map((item) => {
      return item.thickness / 100 / item.thermalConductivity;
    });
  }, [items]);

  const totalThermalResistance = useMemo(() => {
    return thermalResistanceValues.reduce((acc, curr) => acc + curr, 0);
  }, [thermalResistanceValues]);

  const totalR = useMemo(() => {
    return totalThermalResistance + (constants[modelType] || 0);
  }, [totalThermalResistance, modelType]);

  const uValue = useMemo(() => {
    return 1 / totalR;
  }, [totalR]);

  const mass = useMemo(() => {
    const temp = items.reduce((total, item) => {
      const itemMass =
        item.thickness !== undefined
          ? (item.thickness / 100) * item.specificMass
          : 0;
      return total + itemMass;
    }, 0);

    return isolationType === "בידוד פנים" ? temp / 2 : temp;
  }, [isolationType, items]);

  useEffect(() => {
    if (
      items.length > 0 &&
      projectType &&
      projectLocation &&
      modelType &&
      isolationType
    ) {
      try {
        const requiredR = calculateThermalResistance(
          projectType,
          modelType,
          mass,
          projectLocation,
          wallColor
        );
        setRequiredResistance(requiredR);
        setCalculatedResistance(requiredR);
        setIsInsulationSufficient(totalThermalResistance > requiredR);
        setCalculationError(null);
      } catch (error) {
        console.error("Error calculating thermal resistance:", error);
        setCalculationError((error as Error).message);
        setIsInsulationSufficient(null);
        setCalculatedResistance(null);
        setRequiredResistance(null);
      }
    } else {
      setIsInsulationSufficient(null);
      setRequiredResistance(null);
      setCalculationError(
        t("Please select all parameters and add at least one item.")
      );
    }
  }, [
    items,
    projectType,
    projectLocation,
    modelType,
    isolationType,
    wallColor,
    mass,
    totalThermalResistance,
    t,
  ]);

  // Calculate thermal efficiency percentage
  const efficiencyPercentage = useMemo(() => {
    if (requiredResistance && totalThermalResistance) {
      const percentage = (totalThermalResistance / requiredResistance) * 100;
      return Math.min(percentage, 150); // Cap at 150% for display purposes
    }
    return 0;
  }, [requiredResistance, totalThermalResistance]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
        {t("Algorithm Results")}
      </Typography>

      <Grid container spacing={4}>
        {/* Calculation Results Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {t("Calculation Results")}
          </Typography>

          {calculationError ? (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {calculationError}
            </Alert>
          ) : isInsulationSufficient === null ? (
            <Alert severity="info" sx={{ mb: 3 }}>
              {t("Waiting for all parameters to be set")}...
            </Alert>
          ) : (
            <Box>
              {/* Thermal Resistance Gauge */}
              <Card sx={{ mb: 3, overflow: "visible" }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {t("Thermal Efficiency")}
                      </Typography>

                      <Box sx={{ position: "relative", pt: 1, pb: 3 }}>
                        <LinearProgress
                          variant="determinate"
                          value={efficiencyPercentage}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            mb: 1,
                            backgroundColor: theme.palette.grey[200],
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 5,
                              backgroundColor: isInsulationSufficient
                                ? theme.palette.success.main
                                : theme.palette.error.main,
                            },
                          }}
                        />

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            position: "absolute",
                            width: "100%",
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            0%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            50%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            100%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            150%+
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="h3"
                        component="div"
                        fontWeight="bold"
                        color={
                          isInsulationSufficient ? "success.main" : "error.main"
                        }
                      >
                        {totalThermalResistance.toFixed(2)}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {t("Total Thermal Resistance")} (m²·K/W)
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="h3"
                        component="div"
                        fontWeight="bold"
                      >
                        {requiredResistance !== null
                          ? requiredResistance.toFixed(2)
                          : "N/A"}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {t("Required Thermal Resistance")} (m²·K/W)
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Status Message */}
              <Alert
                severity={isInsulationSufficient ? "success" : "error"}
                sx={{ mb: 3 }}
              >
                {isInsulationSufficient
                  ? t(
                      "Great job! Your insulation meets or exceeds the required standards."
                    )
                  : t(
                      "Consider adding more insulation to meet the required standards."
                    )}
              </Alert>

              {/* Additional Metrics */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "background.default",
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      gutterBottom
                    >
                      {t("Total R-Value")}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {totalR.toFixed(3)} m²·K/W
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "background.default",
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      gutterBottom
                    >
                      {t("U-Value")}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {uValue.toFixed(3)} W/(m²·K)
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: "background.default",
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      gutterBottom
                    >
                      {t("Total Mass")}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {mass.toFixed(2)} kg/m²
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>

        {/* Project Configuration & Layer Info Section */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {t("Project Details")}
          </Typography>

          <Box
            sx={{
              p: 2,
              backgroundColor: "background.default",
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                  display="block"
                >
                  {t("Project Type")}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {projectType || "לא נקבע"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                  display="block"
                >
                  {t("Project Location")}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {projectLocation || "לא נקבע"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                  display="block"
                >
                  {t("Model Type")}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {modelType || "לא נקבע"}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                  display="block"
                >
                  {t("Isolation Type")}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {isolationType || "לא נקבע"}
                </Typography>
              </Grid>

              {modelType === "קיר חוץ" && (
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    gutterBottom
                    display="block"
                  >
                    {t("Wall Color")}
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {wallColor || "לא נקבע"}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {t("Layer Configuration")}
          </Typography>

          {items.length === 0 ? (
            <Alert severity="info">{t("No items added yet.")}</Alert>
          ) : (
            <Box
              sx={{
                maxHeight: 300,
                overflow: "auto",
                p: 2,
                backgroundColor: "background.default",
                borderRadius: 2,
              }}
            >
              <List disablePadding>
                {items.map((item, index) => (
                  <React.Fragment key={`${item.product}-${index}`}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" fontWeight="bold">
                            {item.product}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Chip
                              size="small"
                              label={`${t(
                                "Thickness"
                              )}: ${item.thickness?.toFixed(1)} ${t("cm")}`}
                              sx={{ mr: 1, mb: 1 }}
                            />
                            <Chip
                              size="small"
                              label={`λ: ${item.thermalConductivity.toFixed(
                                3
                              )} W/(m·K)`}
                              sx={{ mr: 1, mb: 1 }}
                            />
                            <Chip
                              size="small"
                              label={`${t("Mass")}: ${item.specificMass} kg/m³`}
                              sx={{ mb: 1 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResultsPanel;
