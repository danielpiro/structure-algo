import React from "react";
import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";

const LandingPage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
    </Box>
  );
};

export default LandingPage;
