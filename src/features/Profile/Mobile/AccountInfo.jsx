import { Edit, Save } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
  TextField,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import MobHeading from "@/components/Mobile/MobileHeading";
import { useUser } from "@/context/UserContext";
import { useState } from "react";

export default function AccountInfo({ message }) {
  const {
    profile,
    saving,
    imageLoading,
    error,
    success,
    handleImageUpload,
    handleSaveProfile,
  } = useUser();

  const [draftProfile, setDraftProfile] = useState(profile);
  const [edit, setEdit] = useState(true);

  const handleSave = async () => {
    const ok = await handleSaveProfile(draftProfile);
    if (ok) {
      setEdit(true);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 600, mx: "auto" }}>
      <MobHeading Heading="Account Info" />

      {/* Alerts */}
      <Stack spacing={2} sx={{ my: 1 }}>
        {message && <Alert severity="error">{message}</Alert>}
        {success && <Alert severity="success">Profile updated successfully!</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>

      {/* Profile Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="flex-start"
          sx={{ mb: 3 }}
        >
          {/* Avatar */}
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
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  "&:hover": { bgcolor: "primary.main", color: "white" },
                }}
              >
                {imageLoading ? (
                  <CircularProgress size={16} />
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
              sx={{ width: 90, height: 90, bgcolor: "primary.main" }}
            />
          </Badge>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {draftProfile.fullName || "Your Name"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Profile Details */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              variant="outlined"
              size="small"
              disabled={edit}
              value={draftProfile.firstName || ""}
              onChange={(e) =>
                setDraftProfile((p) => ({ ...p, firstName: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              variant="outlined"
              size="small"
              disabled={edit}
              value={draftProfile.lastName || ""}
              onChange={(e) =>
                setDraftProfile((p) => ({ ...p, lastName: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              fullWidth
              variant="outlined"
              size="small"
              disabled
              value={profile.phoneNumber || ""}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Save/Edit Button */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => (edit ? setEdit(false) : handleSave())}
          disabled={saving}
          startIcon={
            saving ? (
              <CircularProgress size={18} color="inherit" />
            ) : edit ? (
              <Edit fontSize="small" />
            ) : (
              <Save fontSize="small" />
            )
          }
          sx={{
            height: 48,
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            backgroundColor: edit ? "primary.main" : "success.main",
            "&:hover": {
              backgroundColor: edit ? "primary.dark" : "success.dark",
            },
          }}
        >
          {saving ? "Saving..." : edit ? "Edit Profile" : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
}
