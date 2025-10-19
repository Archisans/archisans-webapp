import React from "react";
import { Box, Paper, Avatar, Typography, Rating, Button } from "@mui/material";
import { workers } from "@/features/WorkerPage1/Worker/constants";

const MoreWorkers = () => {
  return (

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Heading */}
      <Typography variant="h6" fontWeight={600}>
        More Workers
      </Typography>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 2,
        mt:2,
      }}
    >
      
      {workers.map((worker, index) => (
        <Paper
          key={index}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
            textAlign: "center",
            p: 1.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              transform: "translateY(-2px)",
            },
          }}
        >
          {/* Avatar */}
          <Avatar
            src={worker.img}
            sx={{
              width: 56,
              height: 56,
              border: "2px solid white",
              mb: 1.5,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          />

          {/* Card Content */}
          <Typography variant="subtitle2" fontWeight={600}>
            {worker.name}
          </Typography>
          <Typography variant="body2" color="#666" mb={0.5}>
            {worker.location || "Not Available"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              mb: 0.5,
            }}
          >
            <Rating value={worker.rating} precision={0.1} size="small" readOnly />
            <Typography variant="caption" color="#666">
              {worker.rating} ({worker.reviewCount})
            </Typography>
          </Box>

          {/* <Typography variant="body2" color="#1976d2" fontWeight={600} mb={1}>
            {worker.rate || "Not Available"}
          </Typography> */}

          <Button variant="outlined" size="small" sx={{ textTransform: "none", px: 2 }}>
            View
          </Button>
        </Paper>
      ))}
    </Box>
    </Box>
  );
};

export default MoreWorkers;
