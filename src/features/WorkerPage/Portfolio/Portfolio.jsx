import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
  Grid,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import {
  UploadFile,
  Add,
  Folder,
  Work,
  LocationOn,
  Phone,
  VideoLibrary,
  Close,
  Image as ImageIcon,
  Edit,
  Delete,
} from "@mui/icons-material";

import WORK_SAMPLES from "./constants";
import { Modal } from "@mui/material";
import { useState } from "react";
import WorkSampleForm from "./components/WorkSampleModal"; 


const PortfolioDesktop = () => {

  const [editIndex, setEditIndex] = useState(null);
  const [portfolioFile, setPortfolioFile] = useState(null);
const [portfolioLink, setPortfolioLink] = useState("");

const handlePortfolioUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type === "application/pdf") {
    setPortfolioFile(file);
  }
};


  return (
    <>
    <Paper
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 2,
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        bgcolor: "#ffffff",
      }}
      elevation={0}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: "#f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
            border: "1px solid #e2e8f0",
          }}
        >
          <Folder sx={{ color: "#64748b", fontSize: 20 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>
          Portfolio & Best Works (optional)
        </Typography>
      </Box>

      {/* Upload & Add */}
      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: 3,
          alignItems: "flex-start",
        }}
      >
        {/* Upload Portfolio */}
       {/* Upload Portfolio */}
<Box sx={{ flex: 1, minWidth: 280 }}>
  <Typography
    variant="subtitle1"
    fontWeight={600}
    sx={{ mb: 2, color: "#334155" }}
  >
    Upload Portfolio
  </Typography>

  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
    {/* Upload Button */}
    <Button
  variant="outlined"
  component="label"
  startIcon={<UploadFile />}
  sx={{
    textTransform: "none",
    fontWeight: 500,
    borderColor: "#cbd5e1",
    color: "#334155",
    "&:hover": {
      bgcolor: "#f8fafc",
      borderColor: "#94a3b8",
    },
  }}
>
  {portfolioFile ? "Change PDF" : "Upload PDF"}
  <input
    type="file"
    hidden
    accept="application/pdf"
    onChange={(event) => {
      const file = event.target.files[0];
      if (file && file.type === "application/pdf") {
        setPortfolioFile(file);
      }
      event.target.value = null;
    }}
  />
</Button>


    {/* File name with icon beside button */}
    {portfolioFile && (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 0.1,
      bgcolor: "#f8fafc",
      px: 1.5,
      py: 0.6,
      borderRadius: 1.5,
      border: "1px solid #e2e8f0",
      cursor: "pointer",
      "&:hover": {
        bgcolor: "#f1f5f9",
      },
    }}
    onClick={() => window.open(URL.createObjectURL(portfolioFile), "_blank")}
  >
    <UploadFile sx={{ color: "#64748b", fontSize: 20 }} />
    <Typography
      variant="body2"
      color="primary"
      sx={{
        fontStyle: "italic",
        fontWeight: 500,
        textDecoration: "underline",
      }}
    >
      {portfolioFile.name}
    </Typography>

    {/* ❌ Small Delete Button */}
    <IconButton
      size="small"
      onClick={(e) => {
        e.stopPropagation(); // prevent opening file on click
        setPortfolioFile(null);
      }}
      sx={{
        ml: 0.2,
        color: "#ef4444",
        "&:hover": { bgcolor: "#fee2e2" },
      }}
    >
      <Close fontSize="small" />
    </IconButton>
  </Box>
)}

  </Box>

  {/* Portfolio link field */}
  <TextField
    fullWidth
    size="small"
    sx={{ mt: 2 }}
    label="Portfolio Link (optional)"
    placeholder="https://example.com"
    value={portfolioLink}
    onChange={(e) => setPortfolioLink(e.target.value)}
  />
</Box>



        {/* Divider */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#e2e8f0", display: { xs: "none", md: "block" } }}
        />

        {/* Add Work Sample */}
        <Box
          sx={{
            flex: 1,
            minWidth: 280,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ mb: 1, color: "#334155" }}
          >
            Best Works
          </Typography>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setEditIndex("new")}
            sx={{
              width: "80%",
              textTransform: "none",
              fontWeight: 600,
              py: 1.4,
              borderRadius: 1.5,
              bgcolor: "#0f172a",
              "&:hover": { bgcolor: "#1e293b" },
            }}
          >
            Add Your Best Works
          </Button>
        </Box>
      </Box>

      {/* Divider Before Samples */}
      {WORK_SAMPLES.length > 0 && (
        <Divider sx={{ my: 4, borderColor: "#e2e8f0" }} />
      )}

      {/* Work Samples List (no separate cards) */}
      <Box>
        {WORK_SAMPLES.map((sample, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            {/* Header */}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
  }}
>
  {/* Left side — icon + title */}
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mr: 2,
        border: "1px solid #e2e8f0",
      }}
    >
      <Work sx={{ color: "#64748b", fontSize: 18 }} />
    </Box>
    <Typography
      variant="subtitle1"
      sx={{ fontWeight: 600, color: "#1e293b" }}
    >
      Work {index + 1}: {sample.title}
    </Typography>
  </Box>

  {/* Right side — edit & delete icons */}
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <IconButton size="small" color="primary" onClick={() => setEditIndex(index)}>
  <Edit fontSize="small" />
</IconButton>
    <IconButton size="small" color="error">
      <Delete fontSize="small" />
    </IconButton>
  </Box>
</Box>

            {/* Details */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 1,
                bgcolor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Chip
                  label={sample.type}
                  size="small"
                  sx={{
                    bgcolor: "#334155",
                    color: "#ffffff",
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    mr: 2,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "#475569", fontWeight: 500 }}
                >
                  {sample.location}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOn fontSize="small" sx={{ color: "#64748b" }} />
                    <Typography variant="body2" color="#334155">
                      {sample.location}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Phone fontSize="small" sx={{ color: "#64748b" }} />
                    <Typography variant="body2" color="#334155">
                      {sample.clientNumber}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

        {/* Media */}
{(sample.photos.length > 0 || sample.videoLinks.length > 0) && (
  <Box sx={{ mt: 3 }}>
    <Typography
      variant="caption"
      sx={{
        color: "#64748b",
        fontWeight: 500,
        display: "block",
        mb: 1,
      }}
    >
      Media
    </Typography>

    <Stack
      direction="row"
      spacing={1.5}
      flexWrap="wrap"
      useFlexGap
      sx={{ alignItems: "center" }}
    >
      {sample.photos.map((file, i) => (
        <Box
          key={`photo-${i}`}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1,
            py: 0.4,
            border: "1px solid #cbd5e1",
            borderRadius: 1.5,
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
            <Typography
              variant="body2"
              sx={{ color: "primary.main", fontWeight: 500 }}
            >
              Image {i + 1}
            </Typography>
          </Box>
          <IconButton size="small">
            <Close fontSize="small" />
          </IconButton>
        </Box>
      ))}

      {sample.videoLinks.map((link, i) => (
        <Box
          key={`video-${i}`}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1,
            py: 0.4,
            border: "1px solid #cbd5e1",
            borderRadius: 1.5,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => window.open(link, "_blank")}
        >
          <VideoLibrary fontSize="small" color="primary" />
          <Typography
            variant="body2"
            sx={{ color: "primary.main", fontWeight: 500 }}
          >
            Video {i + 1}
          </Typography>
          <IconButton size="small">
            <Close fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Stack>
  </Box>
)}     
            </Box>

            {/* Divider Between Samples */}
            {index < WORK_SAMPLES.length - 1 && (
              <Divider sx={{ my: 4, borderColor: "#e2e8f0" }} />
            )}
          </Box>
        ))}
      </Box>
    </Paper>
    <Modal open={editIndex !== null} onClose={() => setEditIndex(null)}>
  <Box sx={{ maxWidth: 600, mx: "auto", mt: 10 }}>
    <WorkSampleForm
      onClose={() => setEditIndex(null)}
      sample={typeof editIndex === "number" ? WORK_SAMPLES[editIndex] : null} 
      isNew={editIndex === "new"} // pass a flag to indicate add mode
    />
  </Box>
</Modal>

</>

  );
};

export default PortfolioDesktop;

