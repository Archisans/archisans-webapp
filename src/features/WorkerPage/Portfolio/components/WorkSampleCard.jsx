import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Button,
  Stack,
  Divider,
  Dialog,
  DialogContent,
  Paper,
} from "@mui/material";
import { Edit, Delete, Close, LocationOn, Phone, VideoLibrary } from "@mui/icons-material";

const WorkSampleCard = ({
  sample,
  index,
  toggleEditMode,
  handleRemoveFile,
  handleRemoveWorkSample,
}) => {
  const [openGallery, setOpenGallery] = useState(false);

  return (
    <>
      <Paper
        sx={{
          p: 3,
          borderRadius: 1.5,
          boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
          width:510,
          minHeight: 430,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          transition: "all 0.3s ease",
          "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
        }}
      >
        {/* Title & Type */}
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            noWrap
            sx={{ textOverflow: "ellipsis", overflow: "hidden", mb: 0.5 }}
          >
            {sample.title || "Untitled Project"}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: "inline-block",
              bgcolor: "primary.light",
              color: "primary.dark",
              px: 1.5,
              py: 0.4,
              borderRadius: 1.5,
              fontWeight: 600,
              fontSize: "0.8rem",
            }}
          >
            {sample.type || "General"}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Location & Contact */}
        <Stack >
          <Box display="flex" alignItems="center" gap={0.5} mb={1} >
            <LocationOn fontSize="small" color="black" />
            <Typography variant="body2" color="black" noWrap sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
              {sample.location || "Not specified"}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5} ml={0.5}>
            <Phone fontSize="small" color="black" />
            <Typography variant="body2" color="black" noWrap sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
              {sample.clientNumber || "N/A"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 1 }} />

        {/* Photos */}
        {sample.photos.length > 0 && (
          <Stack direction="row" spacing={1.5} sx={{ mb: 1 }}>
            {sample.photos.slice(0, 2).map((file, i) => (
              <Box
                key={i}
                sx={{ position: "relative", width: 96, height: 72, cursor: "pointer" }}
                onClick={() => setOpenGallery(true)}
              >
                <Card sx={{ width: "100%", height: "100%", borderRadius: 2, overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    image={typeof file === "string" ? file : URL.createObjectURL(file)}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Card>
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index, "photos", i);
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            ))}
            {sample.photos.length > 2 && (
              <Box
                sx={{
                  width: 96,
                  height: 72,
                  borderRadius: 2,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={() => setOpenGallery(true)}
              >
                +{sample.photos.length - 2}
              </Box>
            )}
          </Stack>
        )}

        {/* Video Links */}
        {sample.videoLinks.length > 0 && (
          <Stack spacing={0.5} mb={1}>
            {sample.videoLinks.map((link, i) => (
              <Box display="flex" alignItems="center" gap={0.5} key={i}>
                <VideoLibrary fontSize="small" color="primary" />
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ color: "primary.main", fontWeight: 500 }}
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {link}
                  </a>
                </Typography>
              </Box>
            ))}
          </Stack>
        )}

        <Divider sx={{ my: 1 }} />

        {/* Actions */}
        <Stack direction="row" spacing={4}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => toggleEditMode(index, true)}
            sx={{ fontWeight: 600 }}
          >
            Edit
          </Button>
          <Button
            fullWidth
            color="error"
            variant="contained"
            startIcon={<Delete />}
            onClick={() => handleRemoveWorkSample(index)}
            sx={{ fontWeight: 600 }}
          >
            Remove
          </Button>
        </Stack>
      </Paper>

      {/* Image Gallery Modal */}
      <Dialog open={openGallery} onClose={() => setOpenGallery(false)} maxWidth="md">
        <DialogContent sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {sample.photos.map((file, i) => (
            <Card key={i} sx={{ width: 180, height: 120, borderRadius: 2, overflow: "hidden" }}>
              <CardMedia
                component="img"
                image={typeof file === "string" ? file : URL.createObjectURL(file)}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Card>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkSampleCard;
