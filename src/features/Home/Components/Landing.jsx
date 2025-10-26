import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward, Build, Verified, Star } from "@mui/icons-material";
import { RouteProvider } from "@/config/RouteProvider";
import { useNavigate } from "react-router-dom";

// StarField Component (responsive with %)
const StarField = () => {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 30 + 20,
    color: Math.random() > 0.7 ? "#87CEEB" : "white", // 30% blue stars
  }));

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ left: `${star.x}%`, top: `${star.y}%` }}
          style={{
            position: "absolute",
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            borderRadius: "50%",
            boxShadow:
              star.color === "#87CEEB" ? "0 0 6px #87CEEB" : "0 0 4px white",
          }}
          animate={{
            left: [`${star.x}%`, `${(star.x + 20) % 100}%`],
            top: [`${star.y}%`, `${(star.y + 10) % 100}%`],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </Box>
  );
};

// Landing Component
const Landing = ({ onGetStartedClick, isWorker }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at center, #1a1a2e 0%, #0d1117 100%)",
        position: "relative",
        overflow: "hidden",
        marginTop: "-64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Starfield Background */}
      <StarField />

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ mt: 10, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem", lg: "4.5rem" },
              fontWeight: 600,
              color: "white",
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            Let's build your home from here
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              color: "#7d8590",
              lineHeight: 1.6,
              mb: 4,
              maxWidth: 600,
              mx: "auto", // center horizontally
            }}
          >
            Bringing verified experts closer to your home. Simplifying every
            repair, renovation, and service — all in one place.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              onClick={onGetStartedClick}
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: "#3467c7c0",
                color: "white",
                fontWeight: 600,
                px: 4,
                py: 2,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { bgcolor: "#2a4a85c0" },
              }}
            >
              Find Professionals
            </Button>
            {!isWorker && (
              <Button
                onClick={() => navigate(RouteProvider.WORKER_REGISTER)}
                variant="outlined"
                size="large"
                startIcon={<Build />}
                sx={{
                  borderColor: "#30363d",
                  color: "#f0f6fc",
                  fontWeight: 600,
                  px: 4,
                  py: 2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    borderColor: "#8b949e",
                    bgcolor: "rgba(240, 246, 252, 0.1)",
                  },
                }}
              >
                Join as Professional
              </Button>
            )}
          </Stack>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              color: "#7d8590",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Verified sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: "0.9rem" }}>
                Newly launched
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Star sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: "0.9rem" }}>
                Join our first 1K users!
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Landing;
