import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      id="contact"
      sx={{
        bgcolor: "primary.dark",
        py: 8,
        color: "white",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)`,
          opacity: 1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Contact Section */}
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: "white",
              }}
            >
              צור קשר
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: "white",
                opacity: 0.9,
              }}
            >
              יש לך שאלות? נשמח לעזור!
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" sx={{ color: "white", mb: 1 }}>
                טלפון: 03-1234567
              </Typography>
              <Typography variant="body1" sx={{ color: "white", mb: 1 }}>
                אימייל: contact@thermal-design.co.il
              </Typography>
              <Typography variant="body1" sx={{ color: "white" }}>
                כתובת: רחוב הרצל 100, תל אביב
              </Typography>
            </Box>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: "100%",
              height: "1px",
              bgcolor: "rgba(255,255,255,0.1)",
              mb: 6,
            }}
          />

          {/* Social Links */}
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <IconButton
              color="inherit"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  color: "secondary.main",
                  background: `linear-gradient(180deg, ${theme.palette.action.active}20 0%, transparent 100%)`,
                },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  color: "secondary.main",
                  background: `linear-gradient(180deg, ${theme.palette.action.active}20 0%, transparent 100%)`,
                },
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  color: "secondary.main",
                  background: `linear-gradient(180deg, ${theme.palette.action.active}20 0%, transparent 100%)`,
                },
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>

          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              opacity: 0.9,
              textAlign: "center",
              color: "white",
            }}
          >
            © {new Date().getFullYear()} תכנון תרמי. כל הזכויות שמורות.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
