import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";

// Create a theme instance
let theme = createTheme({
  palette,
  typography,
  direction: "rtl", // RTL support for Hebrew
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(61, 141, 122, 0.15)",
          },
        },
        contained: {
          "&:hover": {
            transform: "translateY(-1px)",
            transition: "all 0.2s ease-in-out",
          },
        },
        containedPrimary: {
          background: `linear-gradient(160deg, ${palette.primary.main} 0%, ${palette.primary.dark} 100%)`,
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 2px 8px rgba(61, 141, 122, 0.08)",
          overflow: "hidden",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0px 4px 12px rgba(61, 141, 122, 0.12)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        elevation1: {
          boxShadow: "0px 2px 8px rgba(61, 141, 122, 0.08)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 4px rgba(61, 141, 122, 0.08)",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(246, 249, 248, 0.8)", // Using our background.paper color with transparency
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 6,
            transition: "transform 0.2s ease-in-out",
            "&.Mui-focused": {
              transform: "translateY(-2px)",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        standardInfo: {
          backgroundColor: "rgba(61, 141, 122, 0.08)",
          color: palette.primary.dark,
        },
      },
    },
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
