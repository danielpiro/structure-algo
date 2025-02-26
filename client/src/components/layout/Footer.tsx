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
      sx={{
        bgcolor: "background.default",
        borderTop: `1px solid ${theme.palette.action.active}20`,
        py: 4,
        color: "text.light",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(180deg, ${theme.palette.background.paper}80 0%, ${theme.palette.background.default} 100%)`,
          opacity: 0.7,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
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
              opacity: 0.8,
              textAlign: { xs: "center", sm: "right" },
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
