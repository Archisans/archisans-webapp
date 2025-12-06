import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function TypographyReference() {
  const variants = [
    // Display
    "display26",
    "display24",

    // Headings
    "heading20",
    "heading18",
    "heading16",
    "heading14",

    // Titles
    "title20",
    "title18",
    "title16",
    "title14",
    "title12",

    // Body
    "body20",
    "body16",
    "body14",
    "body12",

    // Captions
    "caption10",
    "caption10Medium",
    "caption10Bold",
  ];

  return (
    <Box sx={{ p: 4 }}> 
      {variants.map((v) => (
        <Box key={v} sx={{ mb: 2 }}>
          <Typography variant={v}>
            {v} — The quick brown fox jumps over the lazy dog.
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
