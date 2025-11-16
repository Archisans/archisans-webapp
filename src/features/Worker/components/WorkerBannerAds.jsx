import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const banners = [
  {
    src: "https://images.unsplash.com/photo-1503602642458-232111445657",
    title: "Premium Service Offer",
    subtitle: "Get exclusive discounts today",
    height: 180,
  },
  {
    src: "https://images.unsplash.com/photo-1503602642458-232111445657",
    title: "Join Our Community",
    subtitle: "Connect with experts",
    height: 200,
  },
];

const WorkerBannerAds = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "sticky",
        top: 16, // distance from viewport top
      }}
    >
      {banners.map((banner, index) => (
        <Paper
          key={index}
          sx={{
            width: "100%",
            height: banner.height,
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            p: 2,
            backgroundImage: `url(${banner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
          }}
        >
          <Box sx={{ backgroundColor: "rgba(0,0,0,0.4)", p: 1, borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {banner.title}
            </Typography>
            <Typography variant="body2">{banner.subtitle}</Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default WorkerBannerAds;
