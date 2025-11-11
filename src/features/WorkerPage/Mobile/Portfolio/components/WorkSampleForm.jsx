import React, { useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Divider,
} from "@mui/material";
import { PhotoCamera, VideoLibrary, Add } from "@mui/icons-material";

const WorkSampleForm = ({ onSave, onCancel }) => {
  const [newSample, setNewSample] = useState({
    title: "",
    type: "",
    location: "",
    clientNumber: "",
    photos: [],
    videos: [],
    videoLinks: [""],
  });

  const workTypes = ["Electrical", "Plumbing", "Painting", "Carpentry", "Masonry"];

  const handleWorkChange = (field, value) => {
    setNewSample((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e, field) => {
    const files = Array.from(e.target.files);
    handleWorkChange(field, [...newSample[field], ...files]);
  };

  const handleSaveNewSample = () => {
    onSave && onSave(newSample);
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        background: "#fff",
        maxWidth: 700,
        mx: "auto",
      }}
      elevation={3}
    >
      {/* Header */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          mb: 3,
          textAlign: "center",
          color: "#333",
        }}
      >
        Add New Work Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Form Fields */}
      <Grid container spacing={2}>
        {/* Title */}
        <Grid item xs={12}>
          <TextField
            label="Work Title / Details"
            fullWidth
            value={newSample.title}
            onChange={(e) => handleWorkChange("title", e.target.value)}
          />
        </Grid>

        {/* Type of Work */}
        <Grid item xs={12}>
          <TextField
            select
            label="Type of Work"
            fullWidth
            value={newSample.type}
            onChange={(e) => handleWorkChange("type", e.target.value)}
          >
            {workTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Location */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Location"
            fullWidth
            value={newSample.location}
            onChange={(e) => handleWorkChange("location", e.target.value)}
          />
        </Grid>

        {/* Contact */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Client Contact Number"
            fullWidth
            value={newSample.clientNumber}
            onChange={(e) => handleWorkChange("clientNumber", e.target.value)}
          />
        </Grid>

        {/* Photo Upload */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom fontWeight={500}>
            📷 Upload Photos
          </Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<PhotoCamera />}
            sx={{ mr: 2 }}
          >
            Upload Photos
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "photos")}
            />
          </Button>
          <Typography variant="body2" color="text.secondary">
            {newSample.photos.length} photo(s) selected
          </Typography>
        </Grid>

        {/* Video Upload */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom fontWeight={500}>
            🎥 Upload Videos
          </Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<VideoLibrary />}
            sx={{ mr: 2 }}
          >
            Upload Videos
            <input
              type="file"
              hidden
              multiple
              accept="video/*"
              onChange={(e) => handleFileUpload(e, "videos")}
            />
          </Button>
          <Typography variant="body2" color="text.secondary">
            {newSample.videos.length} video(s) selected
          </Typography>
        </Grid>

        {/* Video Links */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom fontWeight={500}>
            🔗 Video Links
          </Typography>
          {newSample.videoLinks.map((link, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Video Link ${index + 1}`}
              value={link}
              sx={{ mb: 1 }}
              onChange={(e) => {
                const updated = [...newSample.videoLinks];
                updated[index] = e.target.value;
                handleWorkChange("videoLinks", updated);
              }}
            />
          ))}
          <Button
            size="small"
            startIcon={<Add />}
            onClick={() =>
              handleWorkChange("videoLinks", [...newSample.videoLinks, ""])
            }
          >
            Add Another Link
          </Button>
        </Grid>
      </Grid>

      {/* Buttons */}
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveNewSample}>
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default WorkSampleForm;
