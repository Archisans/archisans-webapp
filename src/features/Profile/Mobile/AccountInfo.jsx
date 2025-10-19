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
} from "@mui/material";
import MobHeading from "@/components/Mobile/mobileHeading";
import { useProfileEdit } from "@/hooks/useProfile";

export default function AccountInfo({ message }) {
  const {
    user,
    isLoaded,
    edit,
    setEdit,
    loading,
    error,
    success,
    imageLoading,
    values,
    setValues,
    handleImageUpload,
    handleSave,
  } = useProfileEdit();

  if (!isLoaded) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

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
      direction={"column"}
      size={12}
      sx={{ height: "fit-content" }}
      pt={0}
      pb={10}
    >
      <MobHeading Heading="Account Info" />

      {message && (
        <Box p={2}>
          <Alert severity="error">{message}</Alert>
        </Box>
      )}

      {/* Success/Error Messages */}
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

      {/* Avatar with name and edit button */}
      <Grid
        container
        size={12}
        alignItems={"center"}
        sx={{ position: "relative" }}
      >
        <Grid container size={4} justifyContent={"center"}>
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
                  height: "20px",
                  width: "20px",
                }}
              >
                {imageLoading ? (
                  <CircularProgress size={12} />
                ) : (
                  <Edit fontSize={"inherit"} />
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
              src={user.imageUrl}
              sx={{ height: "70px", width: "70px" }}
            />
          </Badge>
        </Grid>
        <Grid container direction={"column"} size={7.5}>
          <Typography sx={{ fontSize: "16px" }}>First Name</Typography>
          <Input
            disabled={edit}
            value={values.firstName}
            onChange={(e) =>
              setValues({ ...values, firstName: e.target.value })
            }
            sx={{ fontSize: "13px", mb: 2 }}
          />
          <Typography sx={{ fontSize: "16px" }}>Last Name</Typography>
          <Input
            disabled={edit}
            value={values.lastName}
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
            sx={{ fontSize: "13px" }}
          />
        </Grid>
      </Grid>

      {/* Phone Number */}
      <Grid container direction={"column"} size={12} p={2} pt={2.5} pb={2}>
        <Typography sx={{ fontSize: "16px" }}>Phone Number</Typography>
        <Input
          disabled={true}
          value={values.phoneNumber}
          sx={{ fontSize: "14px" }}
        />
      </Grid>

      <Box p={5}>
        <Button
          variant="contained"
          sx={{ height: "3em" }}
          fullWidth
          onClick={() => {
            if (edit) {
              setEdit(false);
            } else {
              handleSave();
            }
          }}
          disabled={loading}
        >
          {loading ? (
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
