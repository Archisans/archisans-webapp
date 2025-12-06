import { createTheme } from "@mui/material/styles";

// Global radius token scales (numbers in px) for consistent usage across the app
const radiiScale = {
  none: 0,
  xxs:2,
  xs: 4,
  sm: 6,
  md: 8,
  mds:10,
  lg: 12,
  xl: 16,
  xxl: 24,
  pill: 9999,
};

const bottomRadiiScale = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  pill: 9999,
};

const getRadiusValue = (size) => {
  if (typeof size === "number") return size;
  return radiiScale?.[size] ?? radiiScale.md;
};

const getBottomRadiusValue = (size) => {
  if (typeof size === "number") return size;
  return bottomRadiiScale?.[size] ?? bottomRadiiScale.md;
};


const theme = createTheme({
  palette: {
    primary: {
      main: "#0c136fff",
      light: "#F1E6DD",
      mainLight: "#000763db",
      transparentLight: "#12164b28",
      dark: "#060a42ff",
      chipLight: "#02063bff",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#677489",
      light: "#E7E9EF",
      dark: "#4A5567",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#434966",
      secondary: "#82889C",
    },
    background: {
      default: "#F1E6DD",
      paper: "#FFFFFF",
      landingGradient: "radial-gradient(ellipse at center, #1a1a2e 0%, #0d1117 100%)",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: 700, color: "#434966" },
    h2: { fontSize: "2rem", fontWeight: 600, color: "#434966" },
    body1: { fontSize: "1rem", fontWeight: 400, color: "#434966" },
    body2: { fontSize: "0.875rem", fontWeight: 400, color: "#82889C" },
    button: { fontWeight: 500, textTransform: "none" },
  },
  shape: {
    borderRadius: 12,
    // Access tokens like: theme.shape.radii.lg
    radii: radiiScale,
    // Bottom-only tokens like: theme.shape.bottomRadii.md
    bottomRadii: bottomRadiiScale,
  },
  // Helper mixins for easy use with sx/styled: theme.mixins.borderRadius('lg')
  mixins: {
    borderRadius: (size = "md") => ({ borderRadius: getRadiusValue(size) }),
    bottomRadius: (size = "md") => {
      const v = getBottomRadiusValue(size);
      return { borderBottomLeftRadius: v, borderBottomRightRadius: v };
    },
    bottomLeftRadius: (size = "md") => ({
      borderBottomLeftRadius: getBottomRadiusValue(size),
    }),
    bottomRightRadius: (size = "md") => ({
      borderBottomRightRadius: getBottomRadiusValue(size),
    }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          padding: "8px 16px",
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          userSelect: "none",
        },
      },
    },
  },
});

export default theme;
