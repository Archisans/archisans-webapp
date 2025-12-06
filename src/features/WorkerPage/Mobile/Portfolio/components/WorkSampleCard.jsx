import React from "react";
import {
  Box,
  Typography,
  Stack,
  Link,
  Divider,
  Button,
  IconButton
} from "@mui/material";
import {
  Edit,
  Delete,
  VideoLibrary,
  Folder
} from "@mui/icons-material";

const WorkSampleCard = ({
  sample,
  index,
  handleRemoveWorkSample,
  toggleEditMode
}) => {
  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        border: "1px solid #e5e7eb",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.06)",
        background: "neutral.bg.50",
      }}
    >
      {/* TITLE */}
      <Typography
        sx={{
          color: "primary.bg.default",
          fontSize: 16,
          fontWeight: 700,
          mb: 1.5,
        }}
      >
        {sample.title}
      </Typography>

      {/* DETAILS */}
      <Stack spacing={1.2} sx={{ mb: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 13, color: "neutral.content.700", fontWeight: 600 }}>
            Service
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            {sample.type}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 13, color: "neutral.content.700", fontWeight: 600 }}>
            Location
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            {sample.location}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontSize: 13, color: "neutral.content.700", fontWeight: 600 }}>
            Phone
          </Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            {sample.clientNumber}
          </Typography>
        </Stack>
      </Stack>

      {/* IMAGES */}
      {sample.photos?.length > 0 && (
        <Box mb={2}>
          <Divider sx={{ my: 1 }} />

          <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
            Images
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              overflowX: "auto",
              pb: 1,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {sample.photos.map((img, i) => (
              <Box
                key={i}
                component="img"
                src={img}
                sx={{
                  width: 140,
                  height: 100,
                  borderRadius: 2,
                  objectFit: "cover",
                  border: "1px solid #e5e7eb",
                }}
                onClick={() => window.open(img, "_blank")}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* VIDEO LINKS */}
      {sample.videoLinks?.length > 0 && (
        <Box mb={2}>
          <Divider sx={{ my: 1 }} />

          <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
            Video Links
          </Typography>

          <Stack spacing={1}>
            {sample.videoLinks.map((link, i) => (
              <Stack
                key={i}
                direction="row"
                spacing={1.4}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "6px",
                    background: "#fef3c7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <VideoLibrary fontSize="small" color="warning" />
                </Box>

                <Link
                  href={link}
                  target="_blank"
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "info.bgDark",
                    wordBreak: "break-word",
                  }}
                >
                  Open Video
                </Link>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* ACTION BUTTONS */}
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
    </Box>
  );
};

export default WorkSampleCard;
