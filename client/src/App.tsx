import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme";
import Layout from "./components/layout/Layout";
import WallDesigner from "./components/wallDesigner/WallDesigner";
import LandingPage from "./components/landing/LandingPage";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="designer" element={<WallDesigner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
