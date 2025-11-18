import React, { useState, useEffect } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const ads = [
  "https://images.unsplash.com/photo-1506765515384-028b60a970df",
  "https://images.unsplash.com/photo-1503602642458-232111445657",
  "https://images.unsplash.com/photo-1522199710521-72d69614c702",
];

const WorkerAds = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
        height: 220,
        position: "relative",
        p: 0,
      }}
    >
      {/* 🔹 Sponsored Heading */}
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          top: 8,
          left: 12,
          bgcolor: "rgba(0,0,0,0.5)",
          color: "white",
          px: 1.2,
          py: 0.2,
          borderRadius: 1,
          fontSize: "11px",
          zIndex: 3,
        }}
      >
        Sponsored
      </Typography>

      {/* 🔹 Ads */}
      {ads.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt="ad"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ))}

      {/* 🔹 Indicator Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 1,
          zIndex: 5,
        }}
      >
        {ads.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              bgcolor: index === current ? "white" : "rgba(255,255,255,0.5)",
              borderRadius: "50%",
              transition: "0.3s",
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default WorkerAds;
