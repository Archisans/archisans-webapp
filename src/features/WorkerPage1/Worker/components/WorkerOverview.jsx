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
import { Phone } from "@mui/icons-material";
import { MapPin as MapPinIcon, Share2 as ShareNetworkIcon } from "lucide-react";
import { workerProfile } from "@/features/WorkerPage1/Worker/constants";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const WorkerOverview = ({ scrollToSectionRefs, setOpen }) => {
  const { aboutRef, servicesRef, portfolioRef, reviewsRef } = scrollToSectionRefs;
  const [isFav, setIsFav] = useState(false);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = () => {
    const url = `${window.location.origin}/worker/${workerProfile.name}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    });
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
            src={workerProfile.bannerImage}
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
            <IconButton
              onClick={handleShare}
              sx={{
                cursor: "pointer",
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                color: "#1976d2",
                width: 32,
                height: 32,
                "&:hover": { bgcolor: "white", transform: "scale(1.05)" },
                transition: "all 0.2s",
              }}
            >
              <ShareNetworkIcon size={16} />
            </IconButton>
            <IconButton
              onClick={() => setIsFav(!isFav)}
              sx={{
                cursor: "pointer",
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                color: isFav ? "red" : "#666",
                width: 32,
                height: 32,
                "&:hover": { bgcolor: "white", transform: "scale(1.05)" },
                transition: "all 0.2s",
              }}
            >
              {isFav ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ px: 2.5, pb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
            <Avatar
              src={workerProfile.img}
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
                  {workerProfile.name}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={2} mb={1.5}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <MapPinIcon size={16} color="#666" />
                  <Typography variant="body2" color="#666" fontWeight={500}>
                    {workerProfile.location}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Phone sx={{ fontSize: 16, color: "#666" }} />
                  <Typography variant="body2" color="#666" fontWeight={500}>
                    {workerProfile.phone}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={1.5}>
                <Rating value={workerProfile.overallRating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" color="#666" fontWeight={500}>
                  {workerProfile.overallRating}{" "}
                  <Box component="span" sx={{ mx: 0.5, color: "#999" }}>
                    •
                  </Box>{" "}
                  {workerProfile.reviewCount} Reviews
                </Typography>

                <Chip
                  label="Top Rated"
                  size="small"
                  sx={{ bgcolor: "#fff3cd", color: "#856404", fontWeight: 600 }}
                />
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
        <Typography variant="body2" color="#555" lineHeight={1.6}>
          {workerProfile.about}
        </Typography>
      </Paper>
    </Box>
  );
};

export default WorkerOverview;
