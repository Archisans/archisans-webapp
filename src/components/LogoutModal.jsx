import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useClerk } from "@clerk/clerk-react";
import { BREAKPOINTS } from "@/config/breakPoints";

const LogoutModal = ({ open, onClose }) => {
  const { signOut } = useClerk();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: isMobile ? 2 : 3,
          boxShadow: "0px 8px 32px rgba(0,0,0,0.2)",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      {/* Close button (top-right) */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          color: "grey.600",
        }}
      >
        <Close />
      </IconButton>

      <DialogContent sx={{ textAlign: "center" }}>
        {/* Title & Subtitle */}
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: 700, mb: 1 }}
        >
          Confirm Logout
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Are you sure you want to log out of your account?
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleLogout}
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              bgcolor: "#ff4d4d",
              "&:hover": { bgcolor: "#e63939" },
              color: "#fff",
              boxShadow: "0 4px 12px rgba(255,77,77,0.4)",
            }}
          >
            Logout
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
