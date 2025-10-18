import React from "react";
import { Paper, Grid, TextField, Button, Typography, Box ,MenuItem} from "@mui/material";
import { PhotoCamera, VideoLibrary, Add } from "@mui/icons-material";

const WorkSampleForm = ({ sample, index, editRefs, handleWorkChange, handleFileUpload, handleRemoveFile, toggleEditMode, workTypes }) => {
  return (
    <Paper ref={(el) => (editRefs.current[index] = el)} sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }} elevation={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Work Title / Details" value={sample.title} onChange={(e) => handleWorkChange(index, "title", e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            value={sample.type}
            onChange={(e) => handleWorkChange(index, "type", e.target.value)}
            SelectProps={{ displayEmpty: true, renderValue: (selected) => (selected === "" ? <em>Type of Work</em> : selected) }}
          >
            <MenuItem value=""><em>Type of Work</em></MenuItem>
            {workTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Location" value={sample.location} onChange={(e) => handleWorkChange(index, "location", e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Client Contact Number" value={sample.clientNumber} onChange={(e) => handleWorkChange(index, "clientNumber", e.target.value)} />
        </Grid>

        {/* Photos Upload */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>📷 Photos</Typography>
          <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
            Upload Photos
            <input type="file" hidden multiple accept="image/*" onChange={(e) => handleFileUpload(e, index, "photos")} />
          </Button>
        </Grid>

        {/* Videos Upload */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>🎥 Videos</Typography>
          <Button variant="outlined" component="label" startIcon={<VideoLibrary />}>
            Upload Videos
            <input type="file" hidden multiple accept="video/*" onChange={(e) => handleFileUpload(e, index, "videos")} />
          </Button>
        </Grid>

        {/* Video Links */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>🔗 Video Links</Typography>
          {sample.videoLinks.map((link, i) => (
            <TextField key={i} fullWidth label={`Video Link ${i + 1}`} value={link} onChange={(e) => {
              const updated = [...sample.videoLinks];
              updated[i] = e.target.value;
              handleWorkChange(index, "videoLinks", updated);
            }} sx={{ mb: 1 }} />
          ))}
          <Button size="small" variant="text" startIcon={<Add />} onClick={() => handleWorkChange(index, "videoLinks", [...sample.videoLinks, ""])}>Add Video Link</Button>
        </Grid>
      </Grid>

      {/* Save + Cancel Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button variant="outlined" color="inherit" onClick={() => toggleEditMode(index, false)}>Cancel</Button>
        <Button variant="contained" onClick={() => toggleEditMode(index, false)}>Save</Button>
      </Box>
    </Paper>
  );
};

export default WorkSampleForm;