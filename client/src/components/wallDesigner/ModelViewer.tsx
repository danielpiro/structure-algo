import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box, Typography } from "@mui/material";
import { LayerType } from "../../types";
import useTranslations from "../../hooks/useTranslations";
import WallModel from "./WallModel";

interface ModelViewerProps {
  layers: LayerType[];
  onLayerClick: (layer: LayerType) => void;
  selectedLayerId?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  layers,
  onLayerClick,
  selectedLayerId,
}) => {
  const { t } = useTranslations();

  const memoizedWallModel = useMemo(
    () => (
      <WallModel
        layers={layers}
        onLayerClick={onLayerClick}
        selectedLayerId={selectedLayerId}
      />
    ),
    [layers, onLayerClick, selectedLayerId]
  );

  return (
    <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
      <Typography
        variant="h5"
        component="h2"
        fontWeight="bold"
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.8)",
          p: 1,
          borderRadius: 1,
        }}
      >
        {t("3D Model Visualization")}
      </Typography>

      {layers.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            {t("Add layers to see the 3D model")}
          </Typography>
        </Box>
      ) : (
        <Canvas camera={{ position: [0, 0, 450], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {memoizedWallModel}
          <OrbitControls enableRotate={true} />
        </Canvas>
      )}
    </Box>
  );
};

export default ModelViewer;
