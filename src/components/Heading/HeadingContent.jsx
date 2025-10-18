import { Box, Typography } from "@mui/material";
import React from "react";

export default function HeadingContent({heading,subheading}) {
  return (
    <Box>
      <Typography variant="h5">{heading}</Typography>
      <Typography color="textSecondary" pt={1}>
        {subheading}
      </Typography>
    </Box>
  );
}
