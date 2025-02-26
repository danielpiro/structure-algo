// src/components/ui/ColorSelector.tsx - Updated version
import React, { useState } from "react";
import { Box, IconButton, Popover, Grid } from "@mui/material";
import { ColorLens as ColorLensIcon } from "@mui/icons-material";

interface ColorSelectorProps {
  color: string;
  onChange: (color: string) => void;
}

const colorOptions = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#F1948A",
  "#82E0AA",
  "#85C1E9",
  "#FF4757",
  "#2ED573",
  "#5352ED",
  "#FF6B81",
  "#1E90FF",
  "#FFA502",
  "#FF6348",
  "#747D8C",
  "#2F3542",
  "#70A1FF",
  "#3742FA",
  "#2F3640",
  "#8C7AE6",
  "#FFC312",
  "#C4E538",
  "#12CBC4",
  "#FDA7DF",
  "#ED4C67",
  "#F79F1F",
  "#A3CB38",
];

// Function to check if a color is a valid hex, rgb, or hsl
const isValidColor = (color: string): boolean => {
  return /^(#[0-9A-F]{3}|#[0-9A-F]{6}|rgb\(|rgba\(|hsl\(|hsla\()/.test(
    color.trim()
  );
};

// Function to get a fallback color if the input color is invalid
const getSafeColor = (color: string): string => {
  if (isValidColor(color)) {
    return color;
  }

  // Map common color names to hex values
  const colorMap: Record<string, string> = {
    blue: "#1E90FF",
    red: "#FF6B6B",
    green: "#4CAF50",
    yellow: "#FFC312",
    purple: "#BB8FCE",
    orange: "#F79F1F",
    black: "#2F3542",
    white: "#FFFFFF",
    gray: "#747D8C",
  };

  return colorMap[color.toLowerCase()] || "#1E90FF"; // Default to blue if no match
};

const ColorSelector: React.FC<ColorSelectorProps> = ({ color, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // Ensure the color is in a valid format
  const safeColor = getSafeColor(color);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "color-popover" : undefined;

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          backgroundColor: safeColor,
          width: 32,
          height: 32,
          "&:hover": {
            backgroundColor: safeColor,
            opacity: 0.9,
          },
        }}
      >
        <ColorLensIcon
          fontSize="small"
          sx={{
            color: "#FFFFFF", // Use white as a safe text color
            opacity: 0.7,
          }}
        />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, width: 250 }}>
          <Grid container spacing={1}>
            {colorOptions.map((c) => (
              <Grid item key={c}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: c,
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: c === safeColor ? "2px solid" : "1px solid",
                    borderColor: c === safeColor ? "primary.main" : "divider",
                    "&:hover": {
                      opacity: 0.8,
                      transform: "scale(1.1)",
                      transition: "all 0.2s",
                    },
                  }}
                  onClick={() => handleColorSelect(c)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Popover>
    </>
  );
};

export default ColorSelector;
