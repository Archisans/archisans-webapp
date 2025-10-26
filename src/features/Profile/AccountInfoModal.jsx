import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Typography,
  Paper,
  Modal,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useUser } from "@/context/UserContext";

const AccountInfoModal = ({ open, onClose, message }) => {
  const {
    user,
    profile,
    setProfile,
    edit,
    setEdit,
    saving,
    imageLoading,
    error,
    success,
    handleImageUpload,
    handleSaveProfile,
  } = useUser();

  const handleSaveAndClose = async () => {
    await handleSaveProfile();
    if (!error) {
      setTimeout(() => onClose(), 1000);
    }
  };

  if (!user) {
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
          }}
        >
          <Paper sx={{ p: 3 }}>
            <Alert severity="error">User not found. Please sign in.</Alert>
          </Paper>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Paper elevation={3} sx={{ borderRadius: 3, p: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Account Info
          </Typography>

          {/* Messages */}
          {message && (
            <Box p={2}>
              <Alert severity="error">{message}</Alert>
            </Box>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Profile updated successfully!
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Profile Header */}
          <Grid
            container
            alignItems="center"
            spacing={3}
            sx={{ mb: 4, borderBottom: "1px solid #eee", pb: 3 }}
          >
            <Grid item>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <IconButton
                    component="label"
                    size="small"
                    color="primary"
                    disabled={imageLoading}
                    sx={{
                      bgcolor: "white",
                      boxShadow: 1,
                      height: "28px",
                      width: "28px",
                    }}
                  >
                    {imageLoading ? (
                      <CircularProgress size={14} />
                    ) : (
                      <Edit fontSize="small" />
                    )}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </IconButton>
                }
              >
                <Avatar
                  src={profile.imageUrl || ""}
                  sx={{ height: "90px", width: "90px" }}
                />
              </Badge>
            </Grid>
            <Grid item xs>
              <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 1 }}>
                First Name
              </Typography>
              <Input
                fullWidth
                disabled={edit}
                value={profile.firstName}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, firstName: e.target.value }))
                }
                sx={{ fontSize: "14px", mb: 2 }}
              />
              <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 1 }}>
                Last Name
              </Typography>
              <Input
                fullWidth
                disabled={edit}
                value={profile.lastName}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, lastName: e.target.value }))
                }
                sx={{ fontSize: "14px" }}
              />
            </Grid>
          </Grid>

          {/* Phone Number */}
          <Grid container alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={4} md={3}>
              <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                Phone Number
              </Typography>
            </Grid>
            <Grid item xs={8} md={9}>
              <Input
                fullWidth
                disabled
                value={profile.phoneNumber}
                sx={{ fontSize: "14px" }}
              />
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1, fontWeight: 600 }}
              onClick={() => {
                if (edit) {
                  setEdit(false);
                } else {
                  handleSaveAndClose();
                }
              }}
              disabled={saving}
            >
              {saving ? (
                <CircularProgress size={24} color="inherit" />
              ) : edit ? (
                "Edit"
              ) : (
                "Save"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default AccountInfoModal;
