// src/components/wallDesigner/SidebarPanel.tsx
import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { LayerType } from "../../types";
import LayerDetails from "./LayerDetails";
import useTranslations from "../../hooks/useTranslations";

interface SidebarPanelProps {
  open: boolean;
  onClose: () => void;
  selectedLayer: LayerType | null;
  onLayerChange: (
    layerId: string,
    field: keyof LayerType,
    value: string | number
  ) => void;
  anchor?: "left" | "right";
  width?: number;
}

const SidebarPanel: React.FC<SidebarPanelProps> = ({
  open,
  onClose,
  selectedLayer,
  onLayerChange,
  anchor = "right",
  width = 320,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslations();

  const drawerWidth = isMobile ? "100%" : width;

  return (
    <Drawer
      variant="persistent"
      anchor={anchor}
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderLeft: "none",
          boxShadow: (theme: Theme) =>
            `0 0 32px ${theme.palette.primary.main}20`,
          bgcolor: "background.paper",
          backgroundImage: (theme: Theme) =>
            `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      <Box>
        {/* Header with gradient background */}
        <Box
          sx={{
            p: 3,
            background: (theme: Theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" component="div" fontWeight="bold">
              {t("Layer Details")}
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  bgcolor: "action.hover",
                },
              }}
            >
              {anchor === "right" ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Box>

          {selectedLayer && (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                }}
              />
              {selectedLayer.material} - {selectedLayer.manufacturer}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            p: 3,
            overflow: "auto",
            flexGrow: 1,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: (theme: Theme) => theme.palette.action.active + "40",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: (theme: Theme) => theme.palette.action.active + "60",
            },
          }}
        >
          {selectedLayer ? (
            <LayerDetails layer={selectedLayer} onLayerChange={onLayerChange} />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "text.secondary",
                p: 4,
                gap: 2,
                background: (theme: Theme) => theme.palette.action.hover + "20",
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "action.hover",
                  color: "primary.main",
                  mb: 2,
                }}
              >
                <ChevronLeft sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {t("Select a layer from the model to view details")}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.disabled" }}>
                {t(
                  "Click on any layer in the 3D model to view and edit its properties"
                )}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default SidebarPanel;
