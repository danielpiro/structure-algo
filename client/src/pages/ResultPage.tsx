import React from "react";
import { Box, Typography } from "@mui/material";
import ResultsPanel from "../components/wallDesigner/ResultsPanel";

const ResultPage: React.FC = () => {
  // Note: In a real app, we'd get these values from a global state manager or URL params
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Results
      </Typography>
      <ResultsPanel
        items={[]}
        projectType=""
        projectLocation=""
        modelType=""
        isolationType=""
        wallColor=""
      />
    </Box>
  );
};

export default ResultPage;
