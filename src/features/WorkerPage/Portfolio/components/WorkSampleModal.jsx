import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  IconButton,
  Stack,
} from "@mui/material";
import { PhotoCamera, Add, Close, Image as ImageIcon } from "@mui/icons-material";

const WorkSampleModal = ({ onClose, sample, isNew }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videoLinks, setVideoLinks] = useState([""]);
  const [googleDriveLink, setGoogleDriveLink] = useState("");

  const workTypes = ["Plumbing", "Carpentry", "Electrical", "Painting"];

  // Load data when editing
  useEffect(() => {
    if (sample) {
      setTitle(sample.title || "");
      setType(sample.type || "");
      setLocation(sample.location || "");
      setClientNumber(sample.clientNumber || "");
      setPhotos(sample.photos || []);
      setVideoLinks(sample.videoLinks || [""]);
    }
  }, [sample]);

  const handleFileUpload = (e) => {
    const selected = Array.from(e.target.files);

    if (photos.length + selected.length > 4) {
      alert("Maximum 4 photos allowed!");
      return;
    }

    setPhotos([...photos, ...selected]);
  };

  const deletePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoChange = (index, value) => {
    const updated = [...videoLinks];
    updated[index] = value;
    setVideoLinks(updated);
  };

  const addVideoLink = () => setVideoLinks([...videoLinks, ""]);

  const handleSave = () => {
    const data = {
      title,
      type,
      location,
      clientNumber,
      photos,
      videoLinks,
      googleDriveLink,
    };

    console.log("Saved Work Sample:", data);
    alert("Work Sample Saved! Check console.");
    if (onClose) onClose();
  };

  return (
    <Paper
      sx={{
        p: 3,
        maxWidth: 600,
        mx: "auto",
        maxHeight: "80vh",
        overflowY: "auto",
        borderRadius: 3,
        border: "1px solid #e2e8f0",
      }}
      elevation={3}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        {isNew ? "Add Your Work" : "Edit Work"}
      </Typography>

      <Grid container spacing={2}>
        {/* Title */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Work Title / Details"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>

        {/* Work Type */}
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            value={type}
            onChange={(e) => setType(e.target.value)}
            SelectProps={{
              displayEmpty: true,
              renderValue: (selected) => selected || "Type of Work",
            }}
          >
            <MenuItem value="">
              <em>Type of Work</em>
            </MenuItem>
            {workTypes.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Location */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid>

        {/* Client Number */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Client Contact Number"
            value={clientNumber}
            onChange={(e) => setClientNumber(e.target.value)}
          />
        </Grid>

        {/* Photos Section */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Photos (max 4)
          </Typography>

          {/* Upload button */}
          <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
            Upload Photos
            <input type="file" hidden accept="image/*" multiple onChange={handleFileUpload} />
          </Button>

          {/* Preview + Delete */}
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
            {photos.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: 1,
                  py: 0.4,
                  border: "1px solid #cbd5e1",
                  borderRadius: 1.5,
                  bgcolor: "#f8fafc",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.6,
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() =>
                    window.open(
                      typeof file === "string" ? file : URL.createObjectURL(file),
                      "_blank"
                    )
                  }
                >
                  <ImageIcon fontSize="small" color="primary" />
                  <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 500 }}>
                    Image {index + 1}
                  </Typography>
                </Box>

                <IconButton size="small" onClick={() => deletePhoto(index)}>
                  <Close fontSize="small" sx={{ color: "#ef4444" }} />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Video Links */}
        <Grid item xs={12} mt={1}>
          {/* <Typography variant="subtitle1">Video Links</Typography> */}
          {videoLinks.map((link, i) => (
            <TextField
              key={i}
              fullWidth
              label={`Video Link ${i + 1}`}
              value={link}
              onChange={(e) => handleVideoChange(i, e.target.value)}
              sx={{ mb: 1 }}
            />
          ))}
          <Button startIcon={<Add />} onClick={addVideoLink}>
            Add Video Link
          </Button>
        </Grid>

        {/* Google Drive Link */}
        <Grid item xs={12}>
          {/* <Typography variant="subtitle1">Google Drive Link</Typography> */}

          <TextField
            fullWidth
            label="Google Drive URL"
            value={googleDriveLink}
            onChange={(e) => setGoogleDriveLink(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Footer Actions */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default WorkSampleModal;
