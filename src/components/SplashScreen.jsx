import React from "react";
import { Box, LinearProgress } from "@mui/material";

export default function SplashScreen({ logo }) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
        color: "#333",
      }}
    >
      <Box
        sx={{
          animation: "pulse 2s infinite ease-in-out",
          "@keyframes pulse": {
            "0%": { transform: "scale(1)", opacity: 1 },
            "50%": { transform: "scale(1.05)", opacity: 0.85 },
            "100%": { transform: "scale(1)", opacity: 1 },
          },
        }}
      >
        {logo}
      </Box>

      <Box sx={{ width: "10%", maxWidth: 200 }}>
        <LinearProgress
          variant="indeterminate"
          sx={{
            height: 4,
            borderRadius: 3,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
              backgroundColor: "#4a7de2ff",
            },
          }}
        />
      </Box>
    </Box>
  );
}
