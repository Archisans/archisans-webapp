import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TopProgressBar = ({ activeStep, pgnum, onBack, title }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", boxSizing: "border-box", mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <IconButton onClick={onBack} size="small">
          <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
        </IconButton>

        <Typography fontSize={14} fontWeight={500}>
          {pgnum}
        </Typography>
      </Box>

      {/* Progress bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          gap: 1.5,
          pb: 1,
          ml: 1,
          mt: 1,
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: 5,
              backgroundColor:
                i <= activeStep ? theme.palette.primary.main : "#ccc",
              borderRadius: 2,
            }}
          />
        ))}
      </Box>

      {/* Heading */}
      <Typography fontSize={16} fontWeight={600} textAlign="center" mt={3}>
        {title}
      </Typography>
    </Box>
  );
};

export default TopProgressBar;
