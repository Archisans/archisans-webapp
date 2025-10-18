import React from "react";
import { Paper, Typography, Box, Card, CardMedia, IconButton, Button } from "@mui/material";
import { Edit, Delete, Close } from "@mui/icons-material";

const WorkSampleCard = ({ sample, index, toggleEditMode, handleRemoveFile, handleRemoveWorkSample }) => {
  return (
    <Paper sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 1 }} elevation={3}>
      <Typography variant="h6">{sample.title}</Typography>
      <Typography variant="subtitle2" color="text.secondary">
        {sample.type}
      </Typography>
      <Typography variant="body2">📍 {sample.location}</Typography>
      <Typography variant="body2">📞 {sample.clientNumber}</Typography>

      {/* Photos */}
      {sample.photos.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
          {sample.photos.map((file, i) => (
            <Box key={i} sx={{ position: "relative", width: 100, height: 80 }}>
              <Card sx={{ width: "100%", height: "100%" }}>
                <CardMedia
                  component="img"
                  height="80"
                  image={typeof file === "string" ? file : URL.createObjectURL(file)}
                />
              </Card>
              <IconButton
                size="small"
                sx={{ position: "absolute", top: -8, right: -8, background: "rgba(0,0,0,0.6)", color: "white", "&:hover": { background: "rgba(0,0,0,0.8)" } }}
                onClick={() => handleRemoveFile(index, "photos", i)}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Videos */}
      {sample.videos.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
          {sample.videos.map((file, i) => (
            <Box key={i} sx={{ position: "relative", width: 200, height: 120 }}>
              <video width="200" height="120" controls src={typeof file === "string" ? file : URL.createObjectURL(file)} />
              <IconButton
                size="small"
                sx={{ position: "absolute", top: -8, right: -8, background: "rgba(0,0,0,0.6)", color: "white", "&:hover": { background: "rgba(0,0,0,0.8)" } }}
                onClick={() => handleRemoveFile(index, "videos", i)}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Video Links */}
      {sample.videoLinks.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {sample.videoLinks.map((link, i) => (
            <Typography key={i} variant="body2" sx={{ color: "primary.main", wordBreak: "break-all" }}>
              🎥 <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            </Typography>
          ))}
        </Box>
      )}

      <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
        <Button variant="outlined" startIcon={<Edit />} onClick={() => toggleEditMode(index, true)}>Edit</Button>
        <Button color="error" startIcon={<Delete />} onClick={() => handleRemoveWorkSample(index)}>Remove</Button>
      </Box>
    </Paper>
  );
};

export default WorkSampleCard;
