import React from "react";
import { Drawer, Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { workerLinks } from "@/features/Worker/constants";

const MobWorkerBottomLinks = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          p: 2,
        },
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 1 }} />

      {/* Links */}
      <Box display="flex" flexDirection="column" gap={2}>
        {workerLinks.map((link) => (
          <Box
            key={link.id}
            display="flex"
            alignItems="center"
            gap={1}
            component="a"
            href={link.path}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            {link.icon}
            <Typography fontSize={14}>{link.label}</Typography>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default MobWorkerBottomLinks;
