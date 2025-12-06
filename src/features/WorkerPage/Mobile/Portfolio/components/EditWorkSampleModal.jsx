import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";

const EditWorkSampleModal = ({ open, onClose, existingData, onUpdate }) => {
  const [form, setForm] = useState({
    title: "",
    type: "",
    location: "",
    clientNumber: "",
    photos: [],
    videoLinks: [""],  // Only video links
  });

  // Load existing data into form
  useEffect(() => {
    if (existingData) {
      setForm({
        title: existingData.title || "",
        type: existingData.type || "",
        location: existingData.location || "",
        clientNumber: existingData.clientNumber || "",
        photos: existingData.photos || [],
        videoLinks: existingData.videoLinks?.length
          ? existingData.videoLinks
          : [""],
      });
    }
  }, [existingData]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const removePhoto = (i) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== i),
    }));
  };

  const updateVideoLink = (index, value) => {
    const list = [...form.videoLinks];
    list[index] = value;
    setForm((prev) => ({ ...prev, videoLinks: list }));
  };

  const addVideoLink = () => {
    setForm((prev) => ({ ...prev, videoLinks: [...prev.videoLinks, ""] }));
  };

  const removeVideoLink = (index) => {
    setForm((prev) => ({
      ...prev,
      videoLinks: prev.videoLinks.filter((_, i) => i !== index),
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "90%",
          maxWidth: 650,
          bgcolor: "white",
          p: 3,
          m: "auto",
          mt: 8,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={2}>
          Edit Work Sample
        </Typography>

        {/* BASIC FIELDS */}
        <TextField
          fullWidth
          label="Work Title"
          sx={{ mb: 2 }}
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <TextField
          fullWidth
          label="Work Type"
          sx={{ mb: 2 }}
          value={form.type}
          onChange={(e) => handleChange("type", e.target.value)}
        />

        <TextField
          fullWidth
          label="Work Location"
          sx={{ mb: 2 }}
          value={form.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />

        <TextField
          fullWidth
          label="Client Number"
          sx={{ mb: 2 }}
          value={form.clientNumber}
          onChange={(e) => handleChange("clientNumber", e.target.value)}
        />

        {/* PHOTO UPLOAD */}
        <Typography fontWeight={600} mb={1}>
          Photos
        </Typography>

        <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
          Add More Photos
          <input type="file" hidden multiple onChange={handleFileUpload} />
        </Button>

        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
          {form.photos.map((file, i) => {
            const url = typeof file === "string" ? file : URL.createObjectURL(file);

            return (
              <Box key={i} sx={{ position: "relative" }}>
                <img
                  src={url}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    objectFit: "cover",
                    border: "1px solid #ddd",
                  }}
                />

                <IconButton
                  size="small"
                  onClick={() => removePhoto(i)}
                  sx={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    background: "#fff",
                    border: "1px solid #aaa",
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            );
          })}
        </Stack>

        {/* MULTIPLE VIDEO LINKS */}
        <Typography fontWeight={600} mt={2} mb={1}>
          Video Links
        </Typography>

        {form.videoLinks.map((link, index) => (
          <Stack direction="row" spacing={1} mb={1} key={index}>
            <TextField
              fullWidth
              label={`Video Link ${index + 1}`}
              value={link}
              onChange={(e) => updateVideoLink(index, e.target.value)}
            />

            {form.videoLinks.length > 1 && (
              <IconButton onClick={() => removeVideoLink(index)}>
                <Delete />
              </IconButton>
            )}
          </Stack>
        ))}

        <Button variant="text" onClick={addVideoLink}>
          + Add Video Link
        </Button>

        {/* ACTION BUTTONS */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => onUpdate(form)}>
            Update
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditWorkSampleModal;
