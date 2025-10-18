import React from "react";
import { Box, Typography, Button } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import { useNavigate } from "react-router-dom";

export default function ServerError() {
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload();
  };

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
      <BuildIcon sx={{ fontSize: 80, color: "#0288d1", mb: 2 }} />
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
        Something went wrong on our end
      </Typography>
      <Typography sx={{ maxWidth: 400, mb: 3 }}>
        We’re fixing the issue. Please try again in a few moments or head back
        home.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#0288d1",
            "&:hover": { bgcolor: "#0277bd" },
            px: 3,
            borderRadius: 3,
          }}
          onClick={handleRetry}
        >
          Retry
        </Button>
        <Button
          variant="outlined"
          sx={{ borderRadius: 3 }}
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
}
