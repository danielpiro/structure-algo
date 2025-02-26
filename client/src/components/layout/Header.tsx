import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalculateIcon from "@mui/icons-material/Calculate";

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
  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        color="default"
        sx={{ bgcolor: "background.paper" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "primary.main",
                textDecoration: "none",
                flexGrow: { xs: 0, md: 1 },
              }}
            >
              תכנון תרמי
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            ></Box>

            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                color: "primary.main",
                textDecoration: "none",
              }}
            >
              תכנון תרמי
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                component={RouterLink}
                to="/project-config"
                sx={{ mx: 1 }}
              >
                הגדרות פרויקט
              </Button>

              <Button component={RouterLink} to="/model-config" sx={{ mx: 1 }}>
                הגדרות מודל
              </Button>

              <Button
                component={RouterLink}
                to="/builder"
                startIcon={<CalculateIcon />}
                sx={{ mx: 1 }}
              >
                בונה קירות
              </Button>

              <Button component={RouterLink} to="/result" sx={{ mx: 1 }}>
                תוצאות
              </Button>

              <Button startIcon={<LanguageIcon />} sx={{ mx: 1 }}>
                עברית
              </Button>

              <Button startIcon={<AccountCircleIcon />} sx={{ mx: 1 }}>
                התחברות
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
