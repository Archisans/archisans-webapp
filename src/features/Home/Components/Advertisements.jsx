import React, { useRef, useEffect } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { Campaign, Verified } from "@mui/icons-material";
import { SCROLL_DIRECTION, SCROLL_SPEED } from "@/features/Home/Components/constants/ads";

function InfiniteScrollRow({ advertisements, direction = "left", speed = 0.6 }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;

    let scrollAmount = 0;

    const step = () => {
      if (direction === "left") {
        scrollAmount += speed;
        if (scrollAmount >= ref.scrollWidth / 2) scrollAmount = 0;
      } else {
        scrollAmount -= speed;
        if (scrollAmount <= 0) scrollAmount = ref.scrollWidth / 2;
      }
      ref.scrollLeft = scrollAmount;
      requestAnimationFrame(step);
    };

    const animation = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animation);
  }, [direction, speed]);

  // duplicate ads for seamless loop
  const loopAds = [...advertisements, ...advertisements];

  return (
    <Box
      ref={scrollRef}
      sx={{
        display: "flex",
        gap: 2.5,
        overflow: "hidden",
        py: 2,
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
        scrollBehavior: "auto",
      }}
    >
      {[...advertisements, ...advertisements]?.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            flex: "0 0 300px",
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            cursor: "pointer",
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 6px 20px rgba(102,126,234,0.12)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px) scale(1.02)",
              boxShadow: "0 12px 30px rgba(102,126,234,0.2)",
            },
          }}
        >
          <Box sx={{ position: "relative", height: 140 }}>
            <Box
              component="img"
              src={item?.desktopImageUrl}
              alt={item?.title}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Chip
              label="Sponsored"
              size="small"
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "#FFD700",
                color: "#1a1a1a",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />
          </Box>
          <Box sx={{ p: 1.5 }}>
            <Typography
              sx={{ fontWeight: 700, fontSize: "1rem", color: "#2d3748", mb: 0.5 }}
            >
              {item?.title}
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "#718096" }}>
              by {item?.providerName}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default function Advertisements({ advertisements }) {
  return (
    <Box
      sx={{
        pt: { xs: 4, md: 6 },
        pb: { xs: 5, md: 7 },
        background: "linear-gradient(180deg, #f3f4f8ff 10%, #F5F7FB 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "15%",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "rgba(102,126,234,0.12)",
          filter: "blur(50px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          left: "10%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(255,215,0,0.12)",
          filter: "blur(40px)",
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
          <Box sx={{ textAlign: "center", mb: 5, px: { xs: 3, md: 6 } }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "rgba(102,126,234,0.1)",
                borderRadius: 3,
                px: 3,
                py: 1,
                mb: 3,
              }}
            >
              <Campaign sx={{ fontSize: 18, color: "#667eea" }} />
              <Typography sx={{ color: "#667eea", fontWeight: 600 }}>
                Featured Partners
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.25rem", md: "3rem" },
                fontWeight: 900,
                color: "#2d3748",
                mb: 2,
                background: "linear-gradient(135deg,rgb(147, 163, 234) 0%,rgb(17, 17, 88) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Trusted
              <Box component="span" sx={{ color: "#FFD700", display: "block" }}>
                Brand Partners
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "#4A5568",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.5,
              }}
            >
              Discover premium products and services from our verified partners.
            </Typography>
          </Box>
        </motion.div>

        {/* Scrolling Ads */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <InfiniteScrollRow advertisements={advertisements} direction={SCROLL_DIRECTION} speed={SCROLL_SPEED} />
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              textAlign: "center",
              width:"90%",
              mx:"auto",
              mt: 5,
              p: 3.5,
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              borderRadius: 4,
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 5px 18px rgba(0,0,0,0.06)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1.5 }}>
              <Verified sx={{ fontSize: 20, color: "#10B981" }} />
              <Typography sx={{ fontWeight: 700, color: "#2d3748" }}>
                All Partners Verified
              </Typography>
            </Box>
            <Typography sx={{ color: "#4A5568", fontSize: "0.9rem" }}>
              Every brand partner is thoroughly vetted to ensure quality and reliability for our users.
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  ); 
}
