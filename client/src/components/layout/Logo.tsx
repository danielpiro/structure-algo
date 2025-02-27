import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const sizes = {
  small: {
    icon: 24,
    text: "h6",
  },
  medium: {
    icon: 32,
    text: "h5",
  },
  large: {
    icon: 40,
    text: "h4",
  },
};

const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const theme = useTheme();
  const dimensions = sizes[size];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <AccountTreeRoundedIcon
          sx={{
            fontSize: dimensions.icon,
            color: theme.palette.primary.main,
            transform: "rotate(180deg)",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <Typography
          variant={dimensions.text as any}
          component="span"
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "text.primary",
            lineHeight: 1,
          }}
        >
          <Box component="span" sx={{ color: theme.palette.primary.main }}>
            Thermal
          </Box>
          <Box component="span" sx={{ color: theme.palette.text.primary }}>
            Design
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default Logo;
