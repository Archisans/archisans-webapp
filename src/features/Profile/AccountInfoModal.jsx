import { useEffect, useState } from "react";
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

const AccountInfoModal = ({ open, onClose }) => {
  const {
    profile,
    saving,
    imageLoading,
    error,
    setError,
    success,
    handleImageUpload,
    handleSaveProfile,
  } = useUser();
  const [draftProfile, setDraftProfile] = useState(profile);
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    if (open) {
      setDraftProfile(profile);
      setEdit(true);
    }
  }, [open, profile]);

  const handleSaveAndClose = async () => {
    const ok = await handleSaveProfile(draftProfile);
    if (ok) {
      setEdit(true);
      setTimeout(() => onClose(), 500);
    }
  };

  const handleClose = () => {
    setError(null);
    setEdit(true);
    setDraftProfile(profile);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
                    disabled={imageLoading || edit}
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
                      onChange={(e) => handleImageUpload(e.target.files?.[0])}
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
                value={draftProfile.firstName}
                onChange={(e) =>
                  setDraftProfile((p) => ({
                    ...p,
                    firstName: e.target.value,
                  }))
                }
                sx={{ fontSize: "14px", mb: 2 }}
              />
              <Typography sx={{ fontSize: "16px", fontWeight: 500, mb: 1 }}>
                Last Name
              </Typography>
              <Input
                fullWidth
                disabled={edit}
                value={draftProfile.lastName}
                onChange={(e) =>
                  setDraftProfile((p) => ({
                    ...p,
                    lastName: e.target.value,
                  }))
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
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ flex: 1 }}
              disabled={saving}
            >
              {edit ? "Close" : "Cancel"}
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
