import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useTranslations from "../../hooks/useTranslations";

const HeroSection: React.FC = () => {
  const { t } = useTranslations();
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "background.dark",
        color: "text.light",
        height: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Animated background effect */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.1,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 5%, transparent 6%)",
          backgroundSize: "30px 30px",
          animation: "moveBackground 60s linear infinite",
          "@keyframes moveBackground": {
            "0%": { backgroundPosition: "0 0" },
            "100%": { backgroundPosition: "1000px 1000px" },
          },
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
              to="/designer"
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
              <Typography
                variant="h3"
                sx={{ color: "text.primary", fontWeight: "bold", opacity: 0.7 }}
              >
                הדמיית קיר תלת-מימדית
              </Typography>

              {/* Glowing effect */}
              <Box
                sx={{
                  position: "absolute",
                  width: "150%",
                  height: "150%",
                  background:
                    "radial-gradient(circle, rgba(179, 216, 168, 0.4) 0%, transparent 70%)",
                  animation: "pulse 4s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
                    "50%": { opacity: 0.7, transform: "scale(1.05)" },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
