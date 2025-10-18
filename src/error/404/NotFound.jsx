import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
        color: "#333",
        p: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#f57c00", mb: 2 }} />
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
        Oops! Page Not Found
      </Typography>
      <Typography sx={{ maxWidth: 400, mb: 3 }}>
        The page you’re looking for might have been moved, deleted, or never
        existed. Let’s get you back on track.
      </Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#f57c00",
          "&:hover": { bgcolor: "#ef6c00" },
          px: 4,
          py: 1,
          borderRadius: 3,
        }}
        onClick={() => navigate("/")}
      >
        Go Back Home
      </Button>
    </Box>
  );
}
