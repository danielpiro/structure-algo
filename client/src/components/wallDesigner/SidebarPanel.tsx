// src/components/wallDesigner/SidebarPanel.tsx
import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { LayerType } from "../../types";
import LayerDetails from "./LayerDetails";
import useTranslations from "../../hooks/useTranslations";

interface SidebarPanelProps {
  open: boolean;
  onClose: () => void;
  selectedLayer: LayerType | null;
  anchor?: "left" | "right";
  width?: number;
}

const SidebarPanel: React.FC<SidebarPanelProps> = ({
  open,
  onClose,
  selectedLayer,
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
          borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "-4px 0 8px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="div" fontWeight="medium">
          {t("Layer Details")}
        </Typography>
        <IconButton onClick={onClose}>
          {anchor === "right" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ p: 2, overflow: "auto", flexGrow: 1 }}>
        {selectedLayer ? (
          <LayerDetails layer={selectedLayer} />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "text.secondary",
            }}
          >
            <Typography variant="body1">
              {t("Select a layer from the model to view details")}
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default SidebarPanel;
