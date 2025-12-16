import {deepBlue, purple, grey as gray, red, green, amber, blue } from "./color.jsx";

/**
 * Brand Light Palette
 * -------------------
 * A structured color system to ensure consistent usage across UI.
 * Each section describes where the colors should be used:
 *
 * - `bg*`     → for backgrounds
 * - `content` → for text/icons
 * - `stroke`  → for borders/dividers
 * - `states`  → interactive UI states (hover, focus, disabled)
 */

export const brandLightPalette = {
  /** Neutral / grayscale tokens used for layout backgrounds, borders, and text */
  neutral: {
    bg: {
      50: gray[50], // Soft background (cards, sheets)
      100: gray[100], // Subtle backgrounds
      200: gray[200], // Table rows, input backgrounds
      800: gray[800], // Dark background for inverse content
      inverse: gray.white, // For dark mode inverse UI
    },

    stroke: {
      default: gray[200], // Standard borders (dividers, input borders)
      dark: gray[300], // Stronger borders (tables, heavy separation)
      light: gray[200], // Light and subtle borders
      inverse: gray.white, // Borders for dark surfaces
    },

    content: {
      300: gray[300], // Disabled text
      400: gray[400], // Muted labels
      500: gray[500], // Secondary text
      600: gray[600], // Medium-emphasis text
      700: gray[700], // High-emphasis text
      800: gray[800], // Strong headings
      900: gray[900], // Strongest dark text
      inverse: gray.white, // Text used on dark backgrounds
    },

    disabled: {
      bg: gray[50], // Disabled button/input background
      stroke: gray[200], // Disabled border
      content: gray[300], // Disabled text/icon
    },
  },

  /** Primary brand color — deep purple (main branding, CTAs, highlights) */
  // primary: {
  //   bg: {
  //     default: deepPurple[600], // Primary button background
  //     hover: deepPurple[700], // Primary button hover
  //     focus: deepPurple[600], // Primary button focus
  //     disabled: deepPurple[300], // Disabled primary background
  //   },

  //   bgLight: {
  //     default: deepPurple[100], // Chip, subtle tag background
  //     hover: deepPurple[200], // Hover for subtle surfaces
  //     focus: deepPurple[100],
  //     disabled: gray[300],
  //   },
  //   content: {
  //     default: deepPurple[700], // Text/icons on light surfaces
  //     hover: deepPurple[800], // Hover text
  //     focus: deepPurple[700],
  //     disabled: deepPurple[300],
  //     inverse: gray.white, // Text on primary surfaces
  //     dark: deepPurple[900], // Stronger emphasis text
  //   },

  //   stroke: {
  //     default: deepPurple[400], // Primary borders
  //     hover: deepPurple[500], // Hovered border
  //     focus: deepPurple[600], // Focus border ring
  //     disabled: deepPurple[200],
  //   },

  //   main: deepPurple[600], // Used for theme.palette.primary.main
  // },

  primary: {
    bg: {
      default: deepBlue[600], // Primary button background
      hover: deepBlue[700],   // Primary button hover
      focus: deepBlue[600],   // Primary button focus
      disabled: deepBlue[300], // Disabled primary background
    },
  
    bgLight: {
      default: deepBlue[100], // Chip, subtle tag background
      hover: deepBlue[200],   // Hover for subtle surfaces
      focus: deepBlue[100],
      disabled: gray[300],
    },
  
    content: {
      default: deepBlue[700], // Text/icons on light surfaces
      hover: deepBlue[800],   // Hover text
      focus: deepBlue[700],
      disabled: deepBlue[300],
      inverse: gray.white,    // Text on primary surfaces
      dark: deepBlue[900],    // Stronger emphasis text
    },
  
    stroke: {
      default: deepBlue[400], // Primary borders
      hover: deepBlue[500],   // Hovered border
      focus: deepBlue[600],   // Focus border ring
      disabled: deepBlue[200],
    },
  
    main: deepBlue[600], // Used for theme.palette.primary.main
  },

  /** Secondary brand color — purple (accents, secondary CTAs, UI highlights) */
  secondary: {
    main: purple[600], // Overall secondary color
    default: purple[600], // Secondary button background
    hover: purple[700], // Secondary button hover
    focus: purple[600],
    stroke: purple[500], // Secondary border color
    content: purple[600], // Text/icons using secondary color
    contentInverse: gray.white, // White text over purple surfaces
    bgLight: purple[100], // Light purple backgrounds
  },

  /** Error color set — for destructive actions, form errors, alerts */
  error: {
    bgLight: red[100], // Light error background
    bgLight2: red[50], // Softer error background
    bg: red[700], // Error button background
    bgDark: red[500], // Stronger variant
    content: red[700], // Error text
    stroke: red[700], // Error border
    states: {
      default: red[700],
      hover: red[800],
      focus: red[700],
      disabled: red[200],
    },
    main: red[700], // theme.palette.error.main
  },

  /** Success color set — for approvals, confirmations, success banners */
  success: {
    bgLight: green[100],
    bgDark: green[700],
    bg: green[700],
    content: green[700],
    stroke: green[700],
    states: {
      default: green[700],
      hover: green[800],
      focus: green[700],
      disabled: green[200],
    },
    main: green[700],
  },

  /** Warning color set — for alerts, risk messages, caution states */
  warning: {
    bgLight: amber[100],
    content: amber[700],
    bgDark: amber[400],
    stroke: amber[500],
    main: amber[600],
  },

  /** Info color set — for informative banners, neutral status messages */
  info: {
    bgLight: blue[100],
    bgDark: blue[600],
    stroke: blue[600],
    content: blue[600],
    main: blue[600],
  },
};
