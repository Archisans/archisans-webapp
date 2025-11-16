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
  Slider,
} from "@mui/material";
import Cropper from "react-easy-crop";
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
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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
};

export default AccountInfoModal;