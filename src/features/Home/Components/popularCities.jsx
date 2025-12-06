// PopularCities.jsx
import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { LocationOn, Verified } from "@mui/icons-material";
import { cities } from "@/features/Home/Components/constants/popularCities";


function InfiniteScrollRow({ cities, direction = "right", speed = 0.5 }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    const totalWidth = ref.scrollWidth / 3;
    let scrollAmount = direction === "left" ? 0 : totalWidth;

    const step = () => {
      if (direction === "left") {
        scrollAmount += speed;
        if (scrollAmount >= totalWidth) scrollAmount = 0;
      } else {
        scrollAmount -= speed;
        if (scrollAmount <= 0) scrollAmount = totalWidth;
      }
      ref.scrollLeft = scrollAmount;
      requestAnimationFrame(step);
    };

    const animation = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animation);
  }, [direction, speed]);

  return (
    <Box
      ref={scrollRef}
      sx={{
        display: "flex",
        gap: 3,
        overflow: "hidden",
        py: 2,
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {[...cities, ...cities, ...cities].map((city, idx) => (
        <Box
          key={idx}
          sx={{
            flex: "0 0 280px",
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            transition: "all 0.4s ease",
            backgroundColor: "white",
            "&:hover": {
              transform: "translateY(-8px) scale(1.02)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            },
          }}
        >
          {/* Image */}
          <Box sx={{ position: "relative", height: 200 }}>
            <Box
              component="img"
              src={city.image}
              alt={city.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Color Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, ${city.color}30, transparent)`,
              }}
            />
            {/* Gradient Overlay */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60%",
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
              }}
            />
            
          </Box>

          {/* Content */}
<Box
  sx={{
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    p: 1.5,                  // reduced padding
    background: "rgba(255,255,255,0.5)", // slightly transparent
    backdropFilter: "blur(6px)",        // lighter blur
    borderTopLeftRadius: 0,            // optional: rounded corners
    borderTopRightRadius: 0,
    height: 50,                         // fixed lower height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}
>
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <LocationOn sx={{ fontSize: 16, color: city.color }} />
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: "1rem",   // slightly smaller text
        color: "#fff",
      }}
    >
      {city.name}
    </Typography>
  </Box>
  <Typography
    sx={{
      fontSize: "0.75rem",
      color: "#fff",
      ml:"1.60rem",
    }}
  >
    Kerala, India
  </Typography>
</Box>

        </Box>
      ))}
    </Box>
  );
}

export default function PopularCities() {

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        background: "neutral.bg.50", // pale white background
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.03)",
          filter: "blur(40px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          left: "5%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.02)",
          filter: "blur(30px)",
        }}
      />

      <Box sx={{ width: "100%", mx: "auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 6, px: { xs: 3, md: 6 } }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "rgba(0,0,0,0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: 3,
                px: 3,
                py: 1,
                mb: 4,
              }}
            >
              <Verified sx={{ fontSize: 18, color: "primary.bg.default" }} />
              <Typography sx={{ color: "neutral.content.800", fontWeight: 600 }}>
                Service Locations
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 900,
                color: "primary.content.default",
                mb: 3,
              }}
            >
              Available in
              <Box component="span" sx={{ color: "neutral.content.500", display: "block" }}>
                These Cities
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                color: "neutral.content.800",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Find verified professionals in major cities across Kerala with our expanding network.
            </Typography>
          </Box>
        </motion.div>

        {/* Scrolling Cities */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <InfiniteScrollRow cities={cities} direction="right" speed={0.8} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <InfiniteScrollRow cities={cities} direction="left" speed={0.6} />
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              textAlign: "center",
              mt: 8,
              p: 4,
              background: "white",
              borderRadius: 4,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: "primary.content.default",
                fontSize: "1.2rem",
                mb: 2,
              }}
            >
              Expanding Across Kerala
            </Typography>
            <Typography sx={{ color: "neutral.content.700", fontSize: "0.95rem" }}>
              We're continuously expanding our network to serve more cities. Don't see your city? We'll be there soon!
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
