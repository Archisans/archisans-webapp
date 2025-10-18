import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { RouteProvider } from "@/config/RouteProvider";

const WorkerHeader = ({ navigate }) => {
  return (
    <>
      {/* Static Header Section */}
      <Box sx={{ position: "relative", mb: 6 }}>
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
          alt="Background"
          sx={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 1 }}
        />
        <Avatar
          src="https://your-image-url.com/profile.jpg"
          sx={{
            width: 90,
            height: 90,
            position: "absolute",
            bottom: -56,
            left: 16,
            border: "3px solid white",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
          }}
        />
      </Box>

      {/* Name + Edit Row */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 8, mb: 2, px: 1 }}>
        <Typography variant="h6" fontWeight={600} color="#1e293b" sx={{ ml: 1 }}>
          Daison Babu
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          sx={{ bgcolor: "#0e1c79ff", textTransform: "none", borderRadius: 0.5, px: 3, "&:hover": { bgcolor: "#0284c7" } }}
          onClick={() => navigate(RouteProvider.WORKER_PROFILE)}
        >
          Edit
        </Button>
      </Box>
    </>
  );
};

export default WorkerHeader;
