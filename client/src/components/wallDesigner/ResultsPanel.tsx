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
import { calculateThermalResistance } from "../../utils/calculations";

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
      const itemMass = (item.thickness / 100) * item.specificMass;
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
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          {t("Algorithm Results")}
        </Typography>

        <Grid container spacing={4}>
          {/* Calculation Results Section */}
          <Grid item xs={12} md={7}>
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
                {/* Success/Error Alert */}
                <Alert
                  severity={isInsulationSufficient ? "success" : "error"}
                  sx={{ mb: 3 }}
                  variant="outlined"
                >
                  {isInsulationSufficient
                    ? t(
                        "Great job! Your insulation meets or exceeds the required standards."
                      )
                    : t(
                        "Consider adding more insulation to meet the required standards."
                      )}
                </Alert>

                {/* Main Metrics Card */}
                <Card
                  elevation={0}
                  sx={{
                    mb: 3,
                    overflow: "visible",
                    border: 1,
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      {/* Thermal Efficiency Gauge */}
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
                              backgroundColor: "rgba(61, 141, 122, 0.1)",
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 5,
                                backgroundColor: theme.palette.primary.main,
                                opacity: isInsulationSufficient ? 1 : 0.6,
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
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              0%
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              50%
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              100%
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              150%+
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Main Values */}
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="h3"
                          component="div"
                          fontWeight="bold"
                          color={theme.palette.primary.main}
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

                {/* Additional Metrics */}
                <Grid container spacing={2}>
                  {/* R-Value */}
                  <Grid item xs={12} sm={4}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: "background.dark",
                        borderRadius: 2,
                        height: "100%",
                        border: 1,
                        borderColor: "divider",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        gutterBottom
                        display="block"
                      >
                        {t("Total R-Value")}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {totalR.toFixed(3)} m²·K/W
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* U-Value */}
                  <Grid item xs={12} sm={4}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: "background.dark",
                        borderRadius: 2,
                        height: "100%",
                        border: 1,
                        borderColor: "divider",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        gutterBottom
                        display="block"
                      >
                        {t("U-Value")}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {uValue.toFixed(3)} W/(m²·K)
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Mass */}
                  <Grid item xs={12} sm={4}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: "background.dark",
                        borderRadius: 2,
                        height: "100%",
                        border: 1,
                        borderColor: "divider",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        gutterBottom
                        display="block"
                      >
                        {t("Total Mass")}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {mass.toFixed(2)} kg/m²
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>

          {/* Project Details Section */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t("Project Details")}
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "background.dark",
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
                mb: 3,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 1,
                },
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
                    {projectType || t("Not set")}
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
                    {projectLocation || t("Not set")}
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
                    {modelType || t("Not set")}
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
                    {isolationType || t("Not set")}
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
                      {wallColor || t("Not set")}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {t("Layer Configuration")}
            </Typography>

            {items.length === 0 ? (
              <Alert severity="info">{t("No items added yet.")}</Alert>
            ) : (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: "background.dark",
                  borderRadius: 2,
                  border: 1,
                  borderColor: "divider",
                  maxHeight: 300,
                  overflow: "auto",
                }}
              >
                <List disablePadding>
                  {items.map((item, index) => (
                    <React.Fragment key={`${item.product}-${index}`}>
                      {index > 0 && <Divider />}
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
                                label={`${t("Mass")}: ${
                                  item.specificMass
                                } kg/m³`}
                                sx={{ mb: 1 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ResultsPanel;
