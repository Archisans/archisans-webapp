import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Divider,
  IconButton,
  Box
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";

const WorkSampleForm = ({ onSave, onCancel, existingData }) => {
  const [newSample, setNewSample] = useState({
    title: "",
    type: "",
    location: "",
    clientNumber: "",
    photos: [],
    videoLinks: [""],
    driveLink: "",   // Single drive link
  });

  useEffect(() => {
    if (existingData) setNewSample(existingData);
  }, [existingData]);

  const handleChange = (field, value) => {
    setNewSample((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    handleChange("photos", [...newSample.photos, ...files]);
  };

  const updateListField = (field, index, value) => {
    const list = [...newSample[field]];
    list[index] = value;
    handleChange(field, list);
  };

  const addNewField = (field) => {
    handleChange(field, [...newSample[field], ""]);
  };

  const removeField = (field, index) => {
    handleChange(
      field,
      newSample[field].filter((_, i) => i !== index)
    );
  };

  return (
    <Box sx={{ p: 1 ,maxHeight: "90vh",}}> 
      {/* Title */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        {existingData ? "Edit Work Sample" : "Add Work Sample"}
      </Typography>

      {/* Basic Fields */}
      <Grid container spacing={2} mb={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Work Title"
            value={newSample.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Work Type"
            value={newSample.type}
            onChange={(e) => handleChange("type", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            value={newSample.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Client Number"
            value={newSample.clientNumber}
            onChange={(e) => handleChange("clientNumber", e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Photos */}
      <Divider sx={{ my: 2 }} />
      <Typography fontWeight={600} mb={1}>
        Photos
      </Typography>

      <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
        Upload Photos
        <input type="file" hidden multiple onChange={handleFileUpload} />
      </Button>

      <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
        {newSample.photos.map((file, i) => {
          const url =
            typeof file === "string" ? file : URL.createObjectURL(file);

          return (
            <Box key={i} sx={{ position: "relative" }}>
              <img
                src={url}
                alt=""
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 8,
                  objectFit: "cover",
                  border: "1px solid #ddd",
                }}
              />

              <IconButton
                size="small"
                onClick={() =>
                  handleChange(
                    "photos",
                    newSample.photos.filter((_, idx) => idx !== i)
                  )
                }
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  background: "#fff",
                  border: "1px solid #ccc",
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          );
        })}
      </Stack>

      {/* Drive Link */}
      <Divider sx={{ my: 2 }} />
      <Typography fontWeight={600} mb={1}>
        Google Drive 
      </Typography>

      <TextField
        fullWidth
        label="Drive Upload Link"
        value={newSample.driveLink}
        onChange={(e) => handleChange("driveLink", e.target.value)}
      />

      {/* Video Links */}
      <Divider sx={{ my: 2 }} />
      <Typography fontWeight={600} mb={1}>
        Video Links
      </Typography>

      {newSample.videoLinks.map((link, i) => (
        <Stack direction="row" spacing={1} key={i} mb={1}>
          <TextField
            fullWidth
            label={`Video Link ${i + 1}`}
            value={link}
            onChange={(e) => updateListField("videoLinks", i, e.target.value)}
          />

          {newSample.videoLinks.length > 1 && (
            <IconButton onClick={() => removeField("videoLinks", i)}>
              <Delete />
            </IconButton>
          )}
        </Stack>
      ))}

      <Button variant="text" onClick={() => addNewField("videoLinks")}>
        + Add Video Link
      </Button>

      {/* Buttons */}
      <Stack direction="row" spacing={2} mt={3} pb={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>

        <Button variant="contained" onClick={() => onSave(newSample)}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default WorkSampleForm;
