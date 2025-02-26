import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HeroSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "background.default",
        color: "text.light",
        height: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          opacity: 0.7,
        },
      }}
    >
      {/* Enhanced animated glow effect */}
      <Box
        sx={{
          position: "absolute",
          width: "200%",
          height: "200%",
          background: `radial-gradient(circle at center, ${theme.palette.action.active}40 0%, transparent 50%)`,
          animation:
            "rotate 20s linear infinite, pulse 8s ease-in-out infinite",
          "@keyframes rotate": {
            "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
            "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
          },
          "@keyframes pulse": {
            "0%, 100%": { opacity: 0.3 },
            "50%": { opacity: 0.5 },
          },
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Text content */}
          <Box
            sx={{
              flex: "1",
              zIndex: 1,
              textAlign: { xs: "center", md: "right" },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              תכנון תרמי חכם
            </Typography>

            <Typography variant="h4" sx={{ mb: 4 }}>
              פלטפורמה מתקדמת לתכנון קירות ולחישוב ביצועים תרמיים לפי תקן ישראלי
              1045
            </Typography>

            <Button
              component={RouterLink}
              to="/builder"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 2,
                px: 4,
                fontSize: "1.2rem",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                boxShadow: "0 8px 16px rgba(61, 141, 122, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 12px 20px rgba(61, 141, 122, 0.3)",
                  transform: "translateY(-3px)",
                },
              }}
            >
              התחל לתכנן עכשיו
            </Button>
          </Box>

          {/* 3D Model/Image */}
          <Box
            sx={{
              flex: "1",
              height: { xs: "300px", md: "500px" },
              position: "relative",
              animation: "float 5s ease-in-out infinite",
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-15px)" },
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, rgba(179, 216, 168, 0.3) 0%, rgba(163, 209, 198, 0.3) 100%)",
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* This would ideally be replaced with a proper 3D model using Three.js */}
              {/* 3D Model Container with enhanced effects */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  perspective: "1000px",
                }}
              >
                {/* 3D Model Placeholder with isometric effect */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform:
                      "translate(-50%, -50%) rotateX(15deg) rotateY(15deg)",
                    width: "80%",
                    height: "80%",
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    borderRadius: "15px",
                    boxShadow: `
                      0 10px 30px rgba(0,0,0,0.3),
                      inset 0 0 20px ${theme.palette.primary.light}80,
                      0 0 50px ${theme.palette.action.active}40
                    `,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "-2px",
                      left: "-2px",
                      right: "-2px",
                      bottom: "-2px",
                      background: `linear-gradient(45deg, ${theme.palette.action.active}, ${theme.palette.secondary.main})`,
                      borderRadius: "17px",
                      zIndex: -1,
                      opacity: 0.5,
                      filter: "blur(10px)",
                    },
                  }}
                />

                {/* Animated accent lines */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `
                      linear-gradient(90deg, transparent 50%, ${theme.palette.action.active}20 50%),
                      linear-gradient(0deg, transparent 50%, ${theme.palette.action.active}20 50%)
                    `,
                    backgroundSize: "20px 20px",
                    animation: "moveLines 20s linear infinite",
                    "@keyframes moveLines": {
                      "0%": { backgroundPosition: "0 0" },
                      "100%": { backgroundPosition: "20px 20px" },
                    },
                    opacity: 0.3,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
