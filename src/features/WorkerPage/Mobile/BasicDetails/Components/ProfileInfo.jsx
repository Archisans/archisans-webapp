import { Box, Typography, Chip } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import React from "react";

export default function ProfileInfo({ theme, name }) {
  return (
    <Box sx={{ mt: 5, px: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        {name}
      </Typography>
      <Chip
        icon={<VerifiedIcon style={{ color: "white" }} />}
        label="Verified Worker"
        size="small"
        sx={{
          bgcolor: theme.palette.primary.mainLight,
          color: "white",
          fontWeight: 500,
          mt: 0.5,
        }}
      />
    </Box>
  );
}
