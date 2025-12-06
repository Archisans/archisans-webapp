import React from "react";
import Box from "@mui/material/Box";
import { Typography, Paper } from "@mui/material";

/** Utility: Safely read theme color tokens */
// const getColor = (theme, path) => path.split(".").reduce((acc, key) => acc?.[key], theme.palette);

/** Single Color Block */
const ColorBlock = ({ label, token }) => (
  <Box sx={{ textAlign: "center", width: 150 }}>
    <Box
      sx={{
        width: "100%",
        height: 70,
        bgcolor: token,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "neutral.stroke.default",
      }}
    />
    <Typography variant="caption10" sx={{ mt: 1, display: "block" }}>
      {label}
    </Typography>
    <Typography variant="caption10Medium" color="neutral.content.600">
      {token}
    </Typography>
  </Box>
);

/** Section Wrapper */
const Section = ({ title, children }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      mt: 3,
      borderRadius: 3,
      border: "1px solid",
      borderColor: "neutral.stroke.default",
    }}
  >
    <Typography
      variant="heading18"
      sx={{ mb: 2, color: "primary.content.default" }}
    >
      {title}
    </Typography>
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>{children}</Box>
  </Paper>
);

/**
 * FULL PALETTE SHOWCASE WITH ALL TOKENS
 */
export default function PaletteFullShowcase() {
  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      {/* Neutral */}
      <Section title="Neutral Palette">
        {/* <ColorBlock label="neutral.bg.0" token="neutral.bg.0" /> */}
        <ColorBlock label="neutral.bg.50" token="neutral.bg.50" />
        <ColorBlock label="neutral.bg.100" token="neutral.bg.100" />
        <ColorBlock label="neutral.bg.200" token="neutral.bg.200" />
        <ColorBlock label="neutral.bg.800" token="neutral.bg.800" />
        <ColorBlock label="neutral.bg.inverse" token="neutral.bg.inverse" />
        <ColorBlock
          label="neutral.stroke.default"
          token="neutral.stroke.default"
        />
        <ColorBlock label="neutral.stroke.dark" token="neutral.stroke.dark" />
        <ColorBlock label="neutral.stroke.light" token="neutral.stroke.light" />
        <ColorBlock
          label="neutral.stroke.inverse"
          token="neutral.stroke.inverse"
        />
        <ColorBlock label="neutral.content.300" token="neutral.content.300" />
        <ColorBlock label="neutral.content.400" token="neutral.content.400" />
        <ColorBlock label="neutral.content.500" token="neutral.content.500" />
        <ColorBlock label="neutral.content.600" token="neutral.content.600" />
        <ColorBlock label="neutral.content.700" token="neutral.content.700" />
        <ColorBlock label="neutral.content.800" token="neutral.content.800" />
        <ColorBlock label="neutral.content.900" token="neutral.content.900" />
        <ColorBlock
          label="neutral.content.inverse"
          token="neutral.content.inverse"
        />
        <ColorBlock label="neutral.disabled.bg" token="neutral.disabled.bg" />
        <ColorBlock
          label="neutral.disabled.stroke"
          token="neutral.disabled.stroke"
        />
        <ColorBlock
          label="neutral.disabled.content"
          token="neutral.disabled.content"
        />
      </Section>

      {/* Primary */}
      <Section title="Primary Palette">
        <ColorBlock label="primary.bg.default" token="primary.bg.default" />
        <ColorBlock label="primary.bg.hover" token="primary.bg.hover" />
        <ColorBlock label="primary.bg.focus" token="primary.bg.focus" />
        <ColorBlock label="primary.bg.disabled" token="primary.bg.disabled" />
        <ColorBlock
          label="primary.bgLight.default"
          token="primary.bgLight.default"
        />
        <ColorBlock
          label="primary.bgLight.hover"
          token="primary.bgLight.hover"
        />
        <ColorBlock
          label="primary.bgLight.focus"
          token="primary.bgLight.focus"
        />
        <ColorBlock
          label="primary.bgLight.disabled"
          token="primary.bgLight.disabled"
        />
        <ColorBlock
          label="primary.content.default"
          token="primary.content.default"
        />
        <ColorBlock
          label="primary.content.hover"
          token="primary.content.hover"
        />
        <ColorBlock
          label="primary.content.focus"
          token="primary.content.focus"
        />
        <ColorBlock
          label="primary.content.disabled"
          token="primary.content.disabled"
        />
        <ColorBlock
          label="primary.content.inverse"
          token="primary.content.inverse"
        />
        <ColorBlock label="primary.content.dark" token="primary.content.dark" />
        <ColorBlock
          label="primary.stroke.default"
          token="primary.stroke.default"
        />
        <ColorBlock label="primary.stroke.hover" token="primary.stroke.hover" />
        <ColorBlock label="primary.stroke.focus" token="primary.stroke.focus" />
        <ColorBlock
          label="primary.stroke.disabled"
          token="primary.stroke.disabled"
        />
        <ColorBlock label="primary.main" token="primary.main" />
      </Section>

      {/* Secondary */}
      <Section title="Secondary Palette">
        <ColorBlock label="secondary.main" token="secondary.main" />
        <ColorBlock label="secondary.default" token="secondary.default" />
        <ColorBlock label="secondary.hover" token="secondary.hover" />
        <ColorBlock label="secondary.focus" token="secondary.focus" />
        <ColorBlock label="secondary.stroke" token="secondary.stroke" />
        <ColorBlock label="secondary.content" token="secondary.content" />
        <ColorBlock
          label="secondary.contentInverse"
          token="secondary.contentInverse"
        />
        <ColorBlock label="secondary.bgLight" token="secondary.bgLight" />
      </Section>

      {/* Error */}
      <Section title="Error Palette">
        <ColorBlock label="error.bgLight" token="error.bgLight" />
        <ColorBlock label="error.bgLight2" token="error.bgLight2" />
        <ColorBlock label="error.bg" token="error.bg" />
        <ColorBlock label="error.bgDark" token="error.bgDark" />
        <ColorBlock label="error.content" token="error.content" />
        <ColorBlock label="error.stroke" token="error.stroke" />
        <ColorBlock label="error.states.default" token="error.states.default" />
        <ColorBlock label="error.states.hover" token="error.states.hover" />
        <ColorBlock label="error.states.focus" token="error.states.focus" />
        <ColorBlock
          label="error.states.disabled"
          token="error.states.disabled"
        />
        <ColorBlock label="error.main" token="error.main" />
      </Section>

      {/* Success */}
      <Section title="Success Palette">
        <ColorBlock label="success.bgLight" token="success.bgLight" />
        <ColorBlock label="success.bgDark" token="success.bgDark" />
        <ColorBlock label="success.bg" token="success.bg" />
        <ColorBlock label="success.content" token="success.content" />
        <ColorBlock label="success.stroke" token="success.stroke" />
        <ColorBlock
          label="success.states.default"
          token="success.states.default"
        />
        <ColorBlock label="success.states.hover" token="success.states.hover" />
        <ColorBlock label="success.states.focus" token="success.states.focus" />
        <ColorBlock
          label="success.states.disabled"
          token="success.states.disabled"
        />
        <ColorBlock label="success.main" token="success.main" />
      </Section>

      {/* Warning */}
      <Section title="Warning Palette">
        <ColorBlock label="warning.bgLight" token="warning.bgLight" />
        <ColorBlock label="warning.bgDark" token="warning.bgDark" />
        <ColorBlock label="warning.content" token="warning.content" />
        <ColorBlock label="warning.stroke" token="warning.stroke" />
        <ColorBlock label="warning.main" token="warning.main" />
      </Section>

      {/* Info */}
      <Section title="Info Palette">
        <ColorBlock label="info.bgLight" token="info.bgLight" />
        <ColorBlock label="info.bgDark" token="info.bgDark" />
        <ColorBlock label="info.stroke" token="info.stroke" />
        <ColorBlock label="info.content" token="info.content" />
        <ColorBlock label="info.main" token="info.main" />
      </Section>
    </Box>
  );
}
