import React from "react";
import {
  Paper,
  Typography,
  Box,
  Stack,
  Button,
  Divider
} from "@mui/material";
import { Edit, Delete, VideoLibrary, Folder } from "@mui/icons-material";

const WorkSampleCard = ({
  sample,
  index,
  handleRemoveWorkSample,
  toggleEditMode
}) => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        width: "100%",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "0.3s",
        "&:hover": { boxShadow: "0 6px 30px rgba(0,0,0,0.12)" },
        background: "#ffffff"
      }}
    >
      {/* Title */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        {sample.title}
      </Typography>

      {/* Details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mb: 2,
          fontSize: "14px"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Service
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {sample.type}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Location
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {sample.location}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Phone
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {sample.clientNumber}
          </Typography>
        </Box>
      </Box>

      {/* Images Section */}
      {sample.photos?.length > 0 && (
        <Box mb={2}>
          <Divider sx={{ mb: 1 }} />

          <Typography variant="body2" fontWeight={600} mb={1}>
            Images
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {sample.photos.map((file, i) => (
              <img
                key={i}
                src={file}
                alt=""
                style={{
                  width: 110,
                  height: 80,
                  borderRadius: 10,
                  objectFit: "cover",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)"
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Google Drive Uploads */}
      {sample.driveLinks?.length > 0 && (
        <Box mb={2}>
          <Divider sx={{ mb: 1 }} />

          <Typography variant="body2" fontWeight={600} mb={1}>
            Google Drive Uploads
          </Typography>

          <Stack spacing={0.8}>
            {sample.driveLinks.map((link, i) => (
              <Box key={i} display="flex" alignItems="center" gap={1}>
                <Folder fontSize="small" color="primary" />
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "14px", wordBreak: "break-all" }}
                >
                  Open Drive File
                </a>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Video Links */}
      {sample.videoLinks?.length > 0 && (
        <Box mb={2}>
          <Divider sx={{ mb: 1 }} />

          <Typography variant="body2" fontWeight={600} mb={1}>
            Video Links
          </Typography>

          <Stack spacing={0.8}>
            {sample.videoLinks.map((link, i) => (
              <Box key={i} display="flex" alignItems="center" gap={1}>
                <VideoLibrary fontSize="small" color="primary" />
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "14px", wordBreak: "break-all" }}
                >
                  Open Video
                </a>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Action Buttons */}
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={toggleEditMode}
          sx={{ flex: 1, textTransform: "none" }}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          onClick={() => handleRemoveWorkSample(index)}
          sx={{ flex: 1, textTransform: "none" }}
        >
          Remove
        </Button>
      </Stack>
    </Paper>
  );
};

export default WorkSampleCard;
