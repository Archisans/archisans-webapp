import React from "react";
import { Box, Alert, Fade } from "@mui/material";

const AlertMessage = ({ isAlert, message = "✅ Booked worker successfully", color = "success" }) => (
  <Fade in={isAlert} timeout={{ enter: 300, exit: 500 }}>
    <Box
      sx={{
        position: "fixed",
        top: 100,
        left: "50%",
        transform: "translateX(-50%)",
        width: "fit-content",
        minWidth: 320,
        zIndex: 1300,
      }}
    >
      <Alert
        color={color}
        sx={{
          boxShadow: "0 4px 12px rgba(76,175,80,0.2)",
          borderRadius: 3,
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {message}
      </Alert>
    </Box>
  </Fade>
);

export default AlertMessage;
