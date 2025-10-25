import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RouteProvider } from "@/config/RouteProvider";

const WorkerJoin = () => {
  const navigate = useNavigate();

  return (
    <Paper
      component={motion.div}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
        textAlign: "center",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0c136fff, #677489)",
        color: "white",
        minHeight: 200,
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{ mb: 1 }}
      >
        Become a Professional
      </Typography>
      <Typography
        variant="body2"
        sx={{ mb: 2, color: "rgba(255,255,255,0.85)" }}
      >
        Join our platform, connect with clients, and grow your business.
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate(RouteProvider.WORKER_REGISTER)}
        sx={{
          backgroundColor: "white",
          color: "#0c136f",
          fontWeight: 600,
          borderRadius: 2,
          textTransform: "none",
          px: 3,
          py: 0.5,
          fontSize: "0.8rem",
          "&:hover": { backgroundColor: "#f5f5f5" },
        }}
      >
        Join Now
      </Button>
    </Paper>
  );
};

export default WorkerJoin;
