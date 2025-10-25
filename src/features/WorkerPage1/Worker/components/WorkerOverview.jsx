import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Chip,
  Rating,
  IconButton,
} from "@mui/material";
import { MapPin as MapPinIcon, Share2 as ShareNetworkIcon } from "lucide-react";
// import { workerProfile } from "@/features/WorkerPage1/Worker/constants";
import FavouriteAndShareButton from "@/components/Desktop/FavouriteAndShareButton";
import { Facebook, LinkedIn, Instagram, Phone } from "@mui/icons-material";
import LaunchIcon from '@mui/icons-material/Launch';

const WorkerOverview = ({ worker, scrollToSectionRefs, setOpen }) => {
  const { aboutRef, servicesRef, portfolioRef, reviewsRef } = scrollToSectionRefs;

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
      {/* Profile Section */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        {/* Cover Photo */}
        <Box sx={{ position: "relative", height: 160 }}>
          <img
            src={worker.bannerImage}
            alt="Cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(transparent, rgba(0,0,0,0.4))",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 15,
              right: 15,
              display: "flex",
              gap: 1,
            }}
          >
             <FavouriteAndShareButton />
          </Box>

        </Box>

        <Box sx={{ px: 2.5, pb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
            <Avatar
              src={worker.img}
              sx={{
                width: 100,
                height: 100,
                border: "4px solid white",
                mt: -6,
                mr: 3,
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              }}
            />
            <Box sx={{ flex: 1, pt: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <Typography variant="h5" fontWeight={700} color="#1a1a1a">
                  {worker.name}
                </Typography>
              </Box>

<Box display="flex" alignItems="center" flexWrap="wrap" gap={2} mb={1.5}>
  {/* Location */}
  <Box display="flex" alignItems="center" gap={0.5}>
    <MapPinIcon size={16} color="#666" />
    <Typography variant="body2" color="#666" fontWeight={500}>
      {worker.location}
    </Typography>
  </Box>

  {/* Phone */}
  <Box display="flex" alignItems="center" gap={0.5}>
    <Phone sx={{ fontSize: 16, color: "#666" }} />
    <Typography variant="body2" color="#666" fontWeight={500}>
      +91 9463xxxxxx
    </Typography>
  </Box>
  {/* Portfolio */}
  <Box display="flex" alignItems="center" gap={0.5}>
    <LaunchIcon sx={{ fontSize: 16, color: "#666" }} />
    <Typography variant="body2" color="#666" fontWeight={500}>
      Portfolio
    </Typography>
  </Box>
</Box>
  </Box>           

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 2 }}>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                  bgcolor: "#1976d2",
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  fontSize: "0.95rem",
                  boxShadow: "0 3px 8px rgba(25,118,210,0.25)",
                  "&:hover": {
                    bgcolor: "#1565c0",
                    transform: "translateY(-2px)",
                    boxShadow: "0 5px 12px rgba(25,118,210,0.35)",
                  },
                  transition: "all 0.2s",
                }}
              >
                Book Now
              </Button>
            </Box>
          </Box>

          {/* Navigation Chips */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={1.5} color="#1976d2">
              Navigate to Section
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Chip
                label="About Me"
                size="small"
                onClick={() => scrollToSection(aboutRef)}
                sx={{
                  bgcolor: "#e3f2fd",
                  color: "#1976d2",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#bbdefb" },
                }}
              />
              <Chip
                label="Services Offered"
                size="small"
                onClick={() => scrollToSection(servicesRef)}
                sx={{
                  bgcolor: "#e8f5e8",
                  color: "#2e7d32",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#c8e6c9" },
                }}
              />
              <Chip
                label="Recent Projects"
                size="small"
                onClick={() => scrollToSection(portfolioRef)}
                sx={{
                  bgcolor: "#fff3e0",
                  color: "#f57c00",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#ffe0b2" },
                }}
              />
              <Chip
                label="Reviews"
                size="small"
                onClick={() => scrollToSection(reviewsRef)}
                sx={{
                  bgcolor: "#f3e8fd",
                  color: "#8e24aa",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#e1bee7" },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* About Section */}
<Paper
  ref={aboutRef}
  elevation={0}
  sx={{ mt: 2, p: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}
>
  <Typography variant="subtitle1" fontWeight={600} mb={1.5}>
    About
  </Typography>

  <Typography variant="body2" color="#555" lineHeight={1.6} mb={1.5}>
    {worker.about}
  </Typography>

  {/* Social Media Section */}
  <Box
    display="flex"
    alignItems="center"
    flexWrap="wrap"
    gap={2}
    sx={{ mt: 0.5 }}
  >
    {/* Label */}
    <Typography
      variant="body2"
      color="#444"
      fontWeight={600}
      sx={{ mr: 1 }}
    >
      Connect with me:
    </Typography>

    {/* Facebook */}
    <Box display="flex" alignItems="center" gap={0.5}>
      <Facebook sx={{ fontSize: 16, color: "#1877F2" }} />
      <Typography
        variant="body2"
        color="#666"
        fontWeight={500}
        sx={{
          cursor: "pointer",
          "&:hover": { color: "#145DBF" },
          transition: "0.3s",
        }}
      >
        Facebook
      </Typography>
    </Box>

    {/* LinkedIn */}
    <Box display="flex" alignItems="center" gap={0.5}>
      <LinkedIn sx={{ fontSize: 16, color: "#0077B5" }} />
      <Typography
        variant="body2"
        color="#666"
        fontWeight={500}
        sx={{
          cursor: "pointer",
          "&:hover": { color: "#005582" },
          transition: "0.3s",
        }}
      >
        LinkedIn
      </Typography>
    </Box>

    {/* Instagram */}
    <Box display="flex" alignItems="center" gap={0.5}>
      <Instagram sx={{ fontSize: 16, color: "#E1306C" }} />
      <Typography
        variant="body2"
        color="#666"
        fontWeight={500}
        sx={{
          cursor: "pointer",
          "&:hover": { color: "#C13584" },
          transition: "0.3s",
        }}
      >
        Instagram
      </Typography>
    </Box>
  </Box>
</Paper>

    </Box>
  );
};

export default WorkerOverview;
