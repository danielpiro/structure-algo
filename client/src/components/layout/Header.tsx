import React, { MouseEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ScrollHelper } from "./ScrollHelper";
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
        <Container maxWidth="xl" sx={{ position: "relative" }}>
          <Toolbar disableGutters sx={{ justifyContent: "center" }}>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                width: "160px",
                display: { xs: "none", md: "block" },
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  textDecoration: "none",
                }}
              >
                Insulation
              </Typography>
            </Box>

            <ScrollHelper>
              {(handleScroll) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: "600px",
                    position: "relative",
                    right: "30px",
                  }}
                >
                  <Button
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    color="primary"
                    sx={{ color: "text.primary" }}
                  >
                    בית
                  </Button>
                  <Button
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      handleScroll("features");
                    }}
                    color="primary"
                    sx={{ color: "text.primary" }}
                  >
                    תכונות
                  </Button>
                  <Button
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      handleScroll("contact");
                    }}
                    color="primary"
                    sx={{ color: "text.primary" }}
                  >
                    צור קשר
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/builder"
                    variant="contained"
                    startIcon={<CalculateIcon />}
                    sx={{
                      position: "absolute",
                      right: "-150px",
                      px: 3,
                    }}
                  >
                    בונה קירות
                  </Button>
                </Box>
              )}
            </ScrollHelper>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
