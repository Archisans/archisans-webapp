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
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import MobHeading from "@/components/Mobile/mobileHeading";
import { useUser } from "@/hooks/UserContext";

export default function AccountInfo({ message }) {
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

  const handleSave = async () => {
    await handleSaveProfile();
  };

  if (!user) {
    return (
      <Box p={2}>
        <Alert severity="error">User not found. Please sign in.</Alert>
      </Box>
    );
  }

  return (
    <Grid
      container
      direction="column"
      sx={{ height: "fit-content" }}
      pt={0}
      pb={10}
    >
      <MobHeading Heading="Account Info" />

      {/* Messages */}
      {message && (
        <Box p={2}>
          <Alert severity="error">{message}</Alert>
        </Box>
      )}
      {success && (
        <Box p={2}>
          <Alert severity="success">Profile updated successfully!</Alert>
        </Box>
      )}
      {error && (
        <Box p={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Avatar + Basic Info */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          p: 3,
          mx: 2,
          mb: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Grid
          container
          alignItems="center"
          spacing={3}
          sx={{ borderBottom: "1px solid #eee", pb: 3 }}
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
              value={profile.firstName || ""}
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
              value={profile.lastName || ""}
              onChange={(e) =>
                setProfile((p) => ({ ...p, lastName: e.target.value }))
              }
              sx={{ fontSize: "14px" }}
            />
          </Grid>
        </Grid>

        {/* Phone Number */}
        <Grid container alignItems="center" spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
              Phone Number
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Input
              fullWidth
              disabled
              value={profile.phoneNumber || ""}
              sx={{ fontSize: "14px" }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Save/Edit Button */}
      <Box p={3}>
        <Button
          variant="contained"
          sx={{ height: "3em", fontWeight: 600 }}
          fullWidth
          onClick={() => {
            if (edit) {
              setEdit(false);
            } else {
              handleSave();
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
    </Grid>
  );
}
