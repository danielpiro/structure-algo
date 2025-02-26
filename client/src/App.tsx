import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme";
import Layout from "./components/layout/Layout";
import LandingPage from "./components/landing/LandingPage";
import ProjectConfigPage from "./pages/ProjectConfigPage";
import ModelConfigPage from "./pages/ModelConfigPage";
import BuilderPage from "./pages/BuilderPage";
import ResultPage from "./pages/ResultPage";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="project-config" element={<ProjectConfigPage />} />
            <Route path="model-config" element={<ModelConfigPage />} />
            <Route path="builder" element={<BuilderPage />} />
            <Route path="result" element={<ResultPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
