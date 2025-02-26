import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
