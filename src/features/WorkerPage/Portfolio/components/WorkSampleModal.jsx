import React, { useState } from "react";
import { Paper, Grid, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import { PhotoCamera, Add } from "@mui/icons-material";

const WorkSampleModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [photos, setPhotos] = useState([]);
  const [Links, setLinks] = useState([""]);

  const workTypes = ["Plumbing", "Carpentry", "Electrical", "Painting"];

  const handleFileUpload = (e) => {
    setPhotos([...photos, ...Array.from(e.target.files)]);
  };

  const handleChange = (index, value) => {
    const updated = [...Links];
    updated[index] = value;
    setLinks(updated);
  };

  const addLink = () => setLinks([...Links, ""]);

  const handleSave = () => {
    const data = { title, type, location, clientNumber, photos, Links };
    console.log("Saved Work Sample:", data);
    alert("Work Sample Saved! Check console.");
    if (onClose) onClose(); // Close after save
  };

  const handleClose = () => {
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
        position: "relative",
      }}
      elevation={3}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Add your best works
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Work Title / Details"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>

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

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Client Contact Number"
            value={clientNumber}
            onChange={(e) => setClientNumber(e.target.value)}
          />
        </Grid>

        {/* Photos */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            📷 Photos
          </Typography>
          <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
            Upload Photos
            <input type="file" hidden multiple accept="image/*" onChange={handleFileUpload} />
          </Button>
          {photos.length > 0 && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {photos.length} photo(s) selected
            </Typography>
          )}
        </Grid>

        {/* Links */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            🔗 Links
          </Typography>
          <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>
  Add external links such as YouTube videos or Google Drive files to showcase your work.
</Typography>

          {Links.map((link, i) => (
            <TextField
              key={i}
              fullWidth
              label={`Link ${i + 1}`}
              value={link}
              onChange={(e) => handleChange(i, e.target.value)}
              sx={{ mb: 1 }}
            />
          ))}
          <Button size="small" variant="text" startIcon={<Add />} onClick={addLink}>
            Add Link
          </Button>
        </Grid>
      </Grid>

      {/* Actions */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
        <Button variant="outlined" color="inherit" onClick={handleClose}>
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
