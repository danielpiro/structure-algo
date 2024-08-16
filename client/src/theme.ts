import { createTheme } from "@mui/material/styles";
import { purple, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    background: {
      default: grey[100],
      paper: "#fff",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default theme;
