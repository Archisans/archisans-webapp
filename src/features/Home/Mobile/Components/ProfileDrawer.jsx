import React from "react";
import { Drawer, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MobProfilePage from "../../../Profile/Mobile/Profile";

export default function ProfileDrawer({ open, onClose }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 300, overflow: "hidden" } // removed 'position: relative'
      }}
    >
      {/* Close button */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          right: 0,
          backgroundColor: "neutral.bg.50",
          zIndex: 1000,
          display: "flex",
          justifyContent: "flex-end",
          pt: 1,
          px: 1,
        }}
      >
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Scrollable content */}
      <Box sx={{ overflowY: "auto", flex: 1 }}>
        <MobProfilePage />
      </Box>
    </Drawer>
  );
}
