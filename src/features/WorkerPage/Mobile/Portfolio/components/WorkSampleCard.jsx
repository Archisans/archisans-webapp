import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import {
  Edit,
  Delete,
  Save,
  Close,
  LocationOn,
  Phone,
  VideoLibrary,
  UploadFile,
  AddLink,
} from "@mui/icons-material";

const WorkSampleCard = ({
  sample,
  index,
  handleUpdateSample,
  handleRemoveFile,
  handleRemoveWorkSample,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editableSample, setEditableSample] = useState({ ...sample });

  // Handle change in input fields
  const handleChange = (field, value) => {
    setEditableSample((prev) => ({ ...prev, [field]: value }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setEditableSample((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), ...files],
    }));
  };

  // Handle video link add/change
  const handleAddVideoLink = () => {
    setEditableSample((prev) => ({
      ...prev,
      videoLinks: [...(prev.videoLinks || []), ""],
    }));
  };

  const handleVideoLinkChange = (value, i) => {
    const updatedLinks = [...(editableSample.videoLinks || [])];
    updatedLinks[i] = value;
    handleChange("videoLinks", updatedLinks);
  };

  // Save edits
  const handleSave = () => {
    handleUpdateSample(index, editableSample);
    setEditMode(false); // Switch to preview mode
  };

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 1,
        width: "100%",
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.12)" },
      }}
    >
      {/* -------- Header Section -------- */}
      <Box>
        {editMode ? (
          <>
            <TextField
              fullWidth
              size="small"
              label="Project Title"
              value={editableSample.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              size="small"
              label="Type"
              value={editableSample.type || ""}
              onChange={(e) => handleChange("type", e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              size="small"
              label="Location"
              value={editableSample.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              size="small"
              label="Contact Number"
              value={editableSample.clientNumber || ""}
              onChange={(e) => handleChange("clientNumber", e.target.value)}
            />
          </>
        ) : (
<Box>
  <Typography variant="h6" fontWeight={700} mb={1}>
    {editableSample.title || "Untitled Project"}
  </Typography>

  <Stack spacing={0.8}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" color="text.secondary">
        Service
      </Typography>
      <Typography variant="body2" fontWeight={600}>
        {editableSample.type || "N/A"}
      </Typography>
    </Stack>

    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" color="text.secondary">
        Phone
      </Typography>
      <Typography variant="body2" fontWeight={600}>
        {editableSample.clientNumber || "N/A"}
      </Typography>
    </Stack>

    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" color="text.secondary">
        Location
      </Typography>
      <Typography variant="body2" fontWeight={600}>
        {editableSample.location || "Not specified"}
      </Typography>
    </Stack>
  </Stack>
</Box>

        )}
      </Box>

      <Divider />

      {/* -------- Images Section -------- */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Uploaded Images
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1}>
          {editableSample.photos?.length > 0 ? (
            editableSample.photos.map((file, i) => {
              const imageUrl =
                typeof file === "string" ? file : URL.createObjectURL(file);
              return (
                <Box
                  key={i}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    "&:hover img": { transform: "scale(1.05)" },
                  }}
                  onClick={() => window.open(imageUrl, "_blank")}
                >
                  <img
                    src={imageUrl}
                    alt={`sample-${i}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "0.3s",
                    }}
                  />
                  {editMode && (
                    <IconButton
                      size="small"
                      color="error"
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        backgroundColor: "rgba(255,255,255,0.8)",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index, "photos", i);
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              );
            })
          ) : (
            <Typography variant="body2" color="text.secondary">
              No images uploaded
            </Typography>
          )}
        </Stack>

        {/* Upload Button */}
        {editMode && (
          <Button
            startIcon={<UploadFile />}
            variant="outlined"
            component="label"
            sx={{ mt: 1 }}
          >
            Upload Images
            <input
              type="file"
              accept="image/*"
              hidden
              multiple
              onChange={handleFileUpload}
            />
          </Button>
        )}
      </Box>

      <Divider />

      {/* -------- Video Section -------- */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Video Links
        </Typography>

        {editMode ? (
          <>
            {editableSample.videoLinks?.map((link, i) => (
              <TextField
                key={i}
                size="small"
                fullWidth
                label={`Video Link ${i + 1}`}
                value={link}
                onChange={(e) =>
                  handleVideoLinkChange(e.target.value, i)
                }
                sx={{ mb: 1 }}
              />
            ))}
            <Button
              startIcon={<AddLink />}
              variant="outlined"
              size="small"
              onClick={handleAddVideoLink}
            >
              Add Another Link
            </Button>
          </>
        ) : editableSample.videoLinks?.length > 0 ? (
          editableSample.videoLinks.map((link, i) => (
            <Box key={i} display="flex" alignItems="center" gap={0.5}>
              <VideoLibrary fontSize="small" color="primary" />
              <Typography variant="body2">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#1976d2",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {link}
                </a>
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No video link added
          </Typography>
        )}
      </Box>

      <Divider />

      {/* -------- Actions -------- */}
      <Stack direction="row" spacing={2}>
        {editMode ? (
          <>
            <Button
              variant="contained"
              color="success"
              startIcon={<Save />}
              onClick={handleSave}
              fullWidth
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Close />}
              onClick={() => setEditMode(false)}
              fullWidth
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
            <Button
              fullWidth
              color="error"
              variant="contained"
              startIcon={<Delete />}
              onClick={() => handleRemoveWorkSample(index)}
            >
              Remove
            </Button>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default WorkSampleCard;
