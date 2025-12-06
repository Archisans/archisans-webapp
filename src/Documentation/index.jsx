import React from "react";
import { Box } from "@mui/material";
import PaletteFullShowcase from "./ColorReference";
import TypographyReference from "./TypographyReference";
export default function index() {
  return (
    <Box>
      <TypographyReference />
      <PaletteFullShowcase />

    </Box>
  );
}
