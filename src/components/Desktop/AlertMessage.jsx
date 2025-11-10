import React from "react";
import { Box, Alert, Fade } from "@mui/material";

const AlertMessage = ({ isAlert, message, color }) => (
  <Fade in={isAlert} timeout={{ enter: 300, exit: 600 }}>
    <Box
      sx={{
        position: "fixed",
        top: 22,
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
