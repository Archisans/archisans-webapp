import { createTheme } from "@mui/material/styles";
import { brandLightPalette } from "./config/lightPalette";
import { typographyVariants } from "./config/Typography";

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
  palette: brandLightPalette,
  typography: typographyVariants,
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
});

export default theme;
