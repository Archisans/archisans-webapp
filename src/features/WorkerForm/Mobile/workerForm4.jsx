import { Box, Typography, IconButton, TextField } from "@mui/material";
import BottomButton from "@/features/WorkerForm/Mobile/Components/BottomButton";
import TopProgressBar from "@/features/WorkerForm/Mobile/Components/TopProgressBar";
import { AddPhotoAlternate, Edit, Delete } from "@mui/icons-material";

const WorkerForm4 = ({ formData, updateFormData, next, back }) => {
  const coverPhoto = formData.coverPhoto || null;
  const about = formData.about || "";

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      updateFormData("coverPhoto", { file, preview: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCoverPhoto = () => {
    updateFormData("coverPhoto", null);
  };

  const handleAboutChange = (event) => {
    updateFormData("about", event.target.value);
  };

  const handleNext = () => next();

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: 500,
        mx: "auto",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pb: { xs: 12, sm: 10 },
      }}
    >
      <Box>
        <TopProgressBar
          activeStep={3}
          onBack={back}
          pgnum="4/7"
          title="Cover Photo (Optional)"
        />

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", mb: 3, textAlign: "center" }}
          >
            Add a cover photo to make your profile stand out.
          </Typography>

          {/* Cover Photo Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            {coverPhoto ? (
              <Box sx={{ position: "relative", width: "100%" }}>
                <Box
                  component="img"
                  src={coverPhoto?.preview || coverPhoto}
                  alt="Cover"
                  sx={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 2,
                    border: "2px solid #e2e8f0",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="cover-photo-edit-mobile"
                    type="file"
                    onChange={handleCoverPhotoChange}
                  />
                  <label htmlFor="cover-photo-edit-mobile">
                    <IconButton
                      component="span"
                      sx={{
                        bgcolor: "white",
                        "&:hover": { bgcolor: "grey.100" },
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </label>
                  <IconButton
                    onClick={handleRemoveCoverPhoto}
                    sx={{
                      bgcolor: "white",
                      "&:hover": { bgcolor: "grey.100" },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: 150,
                  border: "2px dashed #cbd5e1",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#334155",
                  },
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="cover-photo-upload-mobile"
                  type="file"
                  onChange={handleCoverPhotoChange}
                />
                <label htmlFor="cover-photo-upload-mobile">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <AddPhotoAlternate
                      sx={{ fontSize: 48, color: "#94a3b8", mb: 1 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: "#64748b", mb: 0.5, textAlign: "center" }}
                    >
                      Click to upload cover photo
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#94a3b8", textAlign: "center" }}
                    >
                      PNG, JPG, JPEG up to 5MB
                    </Typography>
                  </Box>
                </label>
              </Box>
            )}
          </Box>
        </Box>

        {/* About Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body1"
            sx={{ color: "#334155", mb: 1, fontWeight: 500 }}
          >
            About (optional)
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Write a short description about yourself or your work..."
            value={about}
            onChange={handleAboutChange}
            helperText={`${formData.about?.length || 0}/500 characters`}
            inputProps={{ maxLength: 500 }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cbd5e1" },
                "&:hover fieldset": { borderColor: "#334155" },
                "&.Mui-focused fieldset": { borderColor: "#0f172a" },
              },
            }}
          />
        </Box>

        <BottomButton handleNext={handleNext} />
      </Box>
    </Box>
  );
};

export default WorkerForm4;
