import React from "react";
import { Box, Button } from "@mui/material";

const BottomButton = ({ handleNext, label = "Next", disabled = false }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        p: 0,
        boxSizing: "border-box",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          borderTop: "1px solid #ddd",
          px: 2,
          py: 1.5,
        }}
      >
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={disabled}
          sx={{
            color: "#fff",
            borderRadius: 35,
            fontWeight: "bold",
            px: 15,
          }}
        >
          {label}
        </Button>
      </Box>
    </Box>
  );
};

export default BottomButton;
