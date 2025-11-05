import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { supabase } from "@/lib/supabaseClient";
import { BREAKPOINTS } from "@/config/breakPoints";

const LogoutModal = ({ open, onClose }) => {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      onClose();
      window.location.replace("/");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("SignOut error:", err.message);
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
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: 700, mb: 1 }}
        >
          Confirm Logout
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Are you sure you want to log out of your account?
        </Typography>

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
