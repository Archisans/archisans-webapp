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
  Modal,
  Slider,
} from "@mui/material";
import MobHeading from "@/components/Mobile/mobileHeading";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

export default function AccountInfo() {
  const {
    profile,
    saving,
    imageLoading,
    error,
    success,
    setError,
    handleImageUpload,
    handleSaveProfile,
  } = useUser();

  const [draftProfile, setDraftProfile] = useState(profile);
  const [edit, setEdit] = useState(true);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    setDraftProfile(profile);
  }, [profile]);

  const handleSave = async () => {
    const ok = await handleSaveProfile(draftProfile);
    if (ok) {
      setEdit(true);
    }
  };

  const handleCancel = () => {
    setError(null);
    setDraftProfile(profile);
    setEdit(true);
  };

  const getCroppedImage = (imageSrc, cropPixels) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = cropPixels.width;
        canvas.height = cropPixels.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          image,
          cropPixels.x,
          cropPixels.y,
          cropPixels.width,
          cropPixels.height,
          0,
          0,
          cropPixels.width,
          cropPixels.height
        );

        canvas.toBlob((blob) => {
          resolve(new File([blob], "cropped.jpg", { type: "image/jpeg" }));
        }, "image/jpeg");
      };
    });
  };

  const handleCropComplete = async () => {
    try {
      const croppedFile = await getCroppedImage(selectedImage, croppedAreaPixels);
      await handleImageUpload(croppedFile);
      setCropModalOpen(false);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error cropping image:", error);
      setError("Failed to crop image");
    }
  };

  return (
    <>
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 600, mx: "auto" }}>
        <MobHeading Heading="Account Info" />

        {/* Alerts */}
        <Stack spacing={2} sx={{ my: 1 }}>
          {success && (
            <Alert severity="success">Profile updated successfully!</Alert>
          )}
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
                  disabled={imageLoading || edit}
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 2,
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
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedImage(URL.createObjectURL(file));
                        setCropModalOpen(true);
                      }
                    }}
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
                {draftProfile.firstName || "Your Name"}
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

        {/* Buttons */}
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          {!edit && (
            <Button
              variant="outlined"
              fullWidth
              onClick={handleCancel}
              disabled={saving}
              sx={{ height: 48, borderRadius: 2, textTransform: "none" }}
            >
              Cancel
            </Button>
          )}

          {/* Edit / Save Button */}
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
            {saving ? "Saving..." : edit ? "Edit Profile" : "Save"}
          </Button>
        </Box>
      </Box>

      {/* Crop Modal */}
      <Modal open={cropModalOpen} onClose={() => setCropModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxWidth: "600px",
            height: "70vh",
            bgcolor: "white",
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Crop Image
          </Typography>
          
          <Box sx={{ position: "relative", flex: 1, bgcolor: "#f5f5f5" }}>
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(croppedArea, croppedAreaPixels) => {
                setCroppedAreaPixels(croppedAreaPixels);
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Zoom
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => {
                setCropModalOpen(false);
                setSelectedImage(null);
              }}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleCropComplete}
              disabled={!croppedAreaPixels}
              sx={{ flex: 1 }}
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}