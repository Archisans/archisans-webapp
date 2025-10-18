import { Box, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderSection({ coverImage, handleImageChange, fileInputRef }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: "relative" }}>
      {/* Cover Image */}
      <Box
        component="img"
        src={coverImage}
        alt="Background"
        sx={{
          width: "100%",
          height: 150,
          objectFit: "cover",
        }}
      />

      {/* Back Button */}
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          bgcolor: "rgba(0,0,0,0.5)",
          color: "white",
          "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
        }}
        onClick={() => navigate(-1)} // 👈 goes back to previous page
      >
        <ArrowBackIcon fontSize="small" />
      </IconButton>

      {/* Edit Cover Button */}
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "rgba(0,0,0,0.5)",
          color: "white",
          "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
        }}
        onClick={() => fileInputRef.current.click()}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      {/* Profile Avatar */}
      <Avatar
        src="https://your-image-url.com/profile.jpg"
        sx={{
          width: 72,
          height: 72,
          position: "absolute",
          bottom: -26,
          left: 16,
          border: "3px solid white",
        }}
      />
    </Box>
  );
}
