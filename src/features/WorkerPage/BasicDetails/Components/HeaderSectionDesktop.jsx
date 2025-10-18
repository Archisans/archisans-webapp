import React, { useRef } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  Stack,
  Rating,
  Chip,
  alpha,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

export default function HeaderSection({
  coverImage,
  handleImageChange,
  fileInputRef,
  avatarUrl = "https://via.placeholder.com/150",
  onAvatarChange = () => {},
  name = "Abhisek Sins",
  location = "Palakkad, Pathiripala",
  rating = 4.9,
  reviews = 130,
}) {
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 1,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        bgcolor: "transparent",
      }}
    >
      {/* Cover */}
      <Box
        component="img"
        src={coverImage}
        alt="Cover"
        sx={{
          display: "block",
          width: "100%",
          height: { xs: 160, md: 220 },
          objectFit: "cover",
        }}
      />

      <IconButton
        aria-label="edit cover"
        onClick={() => fileInputRef?.current?.click()}
        sx={{
          position: "absolute",
          top: 14,
          right: 14,
          bgcolor: (theme) => alpha(theme.palette.common.black, 0.4),
          backdropFilter: "blur(6px)",
          color: "#fff",
          "&:hover": { bgcolor: (theme) => alpha(theme.palette.common.black, 0.55) },
        }}
      >
        <EditIcon />
      </IconButton>

      {/* Hidden file inputs */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <input
        ref={avatarInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onAvatarChange}
      />

      {/* Profile Info */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          p: { xs: 2, sm: 3 },
          backgroundColor: "#fff",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          mt: -7,
          position: "relative",
          zIndex: 2,
          boxShadow: "0 -4px 12px rgba(0,0,0,0.04)",
        }}
      >
        {/* Avatar */}
        <Box sx={{ position: "relative", flexShrink: 0 }}>
          <Avatar
            src={avatarUrl}
            alt={name}
            sx={{
              width: { xs: 70, md: 96 },
              height: { xs: 70, md: 96 },
              border: "3px solid white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
          <IconButton
            size="small"
            aria-label="edit avatar"
            onClick={() => avatarInputRef.current?.click()}
            sx={{
              position: "absolute",
              right: -4,
              bottom: -4,
              bgcolor: "#fff",
              border: "1px solid rgba(0,0,0,0.12)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Profile Details */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              lineHeight: 1.1,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={name}
          >
            {name}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={location}
            >
              {location}
            </Typography>
          </Stack>

          {/* Ratings */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <Rating
              value={rating}
              precision={0.1}
              readOnly
              size="small"
              icon={<StarIcon fontSize="inherit" />}
              emptyIcon={<StarIcon fontSize="inherit" />}
            />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {rating}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • {reviews} Reviews
            </Typography>
            <Chip
              label="Top Rated"
              size="small"
              sx={{
                ml: 1,
                bgcolor: (theme) => alpha(theme.palette.warning.light, 0.25),
                color: "warning.dark",
                fontWeight: 600,
                height: 24,
                borderRadius: "6px",
              }}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
