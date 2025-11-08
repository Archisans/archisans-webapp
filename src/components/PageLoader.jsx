import React from "react";
import { Box, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";

export const PageLoader = ({ text = "Loading..." }) => {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        color: "#1e293b",
        gap: 2,
      }}
    >
      <CircularProgress thickness={4} size={isMobile ? 40 : 60} sx={{ color: "#2563eb" }} />
      <Typography variant="body1" fontWeight={500}>
        {text}
      </Typography>
    </Box>
  );
};
