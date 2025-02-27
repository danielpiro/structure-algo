import React, { MouseEvent, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ScrollHelper } from "./ScrollHelper";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Logo from "./Logo";
import useTranslations from "../../hooks/useTranslations";

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header: React.FC = () => {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const navigateAndCloseMenu = (path: string) => {
    setMobileAnchorEl(null);
    navigate(path);
  };
  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(246, 249, 248, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative" }}>
          <Toolbar disableGutters>
            {/* Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Logo size="small" />
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: 3,
              }}
            >
              <ScrollHelper>
                {(handleScroll) => (
                  <>
                    <Button
                      color="inherit"
                      sx={{ color: "text.primary" }}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      {t("Home")}
                    </Button>
                    <Button
                      color="inherit"
                      sx={{ color: "text.primary" }}
                      onClick={() => handleScroll("projects")}
                    >
                      {t("Projects")}
                    </Button>
                    <Button
                      color="inherit"
                      sx={{ color: "text.primary" }}
                      component={RouterLink}
                      to="/models"
                    >
                      {t("Models")}
                    </Button>
                    <Button
                      color="inherit"
                      sx={{ color: "text.primary" }}
                      component={RouterLink}
                      to="/results"
                    >
                      {t("Results")}
                    </Button>
                  </>
                )}
              </ScrollHelper>
            </Box>

            {/* Account & Mobile Menu */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                component={RouterLink}
                to="/project/new"
                variant="contained"
                sx={{
                  px: 2,
                  display: { xs: "none", md: "flex" },
                }}
              >
                {t("Start New Project")}
              </Button>

              {/* Account Icon */}
              <IconButton
                color="inherit"
                sx={{ display: { xs: "none", md: "flex" } }}
                onClick={handleAccountMenuOpen}
              >
                <AccountCircleOutlinedIcon />
              </IconButton>

              {/* Mobile Menu Icon */}
              <IconButton
                sx={{ display: { xs: "flex", md: "none" } }}
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Account Menu */}
            <Menu
              anchorEl={accountAnchorEl}
              open={Boolean(accountAnchorEl)}
              onClose={() => setAccountAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem component={RouterLink} to="/account">
                {t("My Account")}
              </MenuItem>
              <MenuItem component={RouterLink} to="/settings">
                {t("Settings")}
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => console.log("Logout")}>
                {t("Logout")}
              </MenuItem>
            </Menu>

            {/* Mobile Menu */}
            <Menu
              anchorEl={mobileAnchorEl}
              open={Boolean(mobileAnchorEl)}
              onClose={() => setMobileAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => navigateAndCloseMenu("/")}>
                {t("Home")}
              </MenuItem>
              <MenuItem onClick={() => navigateAndCloseMenu("/projects")}>
                {t("Projects")}
              </MenuItem>
              <MenuItem onClick={() => navigateAndCloseMenu("/models")}>
                {t("Models")}
              </MenuItem>
              <MenuItem onClick={() => navigateAndCloseMenu("/results")}>
                {t("Results")}
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigateAndCloseMenu("/project/new")}>
                {t("Start New Project")}
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
