import React, { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Ad5 from "@/assets/Images/Ad5.png";
import VGuard from "@/assets/Images/VGuard.png";
import Ad6 from "@/assets/Images/Ad6.png";
import EBCO from "@/assets/Images/EBCO.jpeg"
import IKEA from "@/assets/Images/IKEA.jpeg"

const imageData = [
  { img: VGuard, title: "V-Guard Power Solutions" },
  { img: Ad5, title: "UltraTech Cements" },
  { img: EBCO, title: "EBCO Simplifying Lives" },
  { img: Ad6, title: "Aparna: Building Materials" },
  { img: IKEA, title: "Bring Home To Life" },
];

function InfiniteScrollRow({ images, direction = "left", speed = 0.6 }) {
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
      {[...images, ...images]?.map((item, idx) => (
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
          {/* Image */}
          <Box
            component="img"
            src={item.img}
            alt={item.title}
            sx={{ width: "100%", height: 160, objectFit: "cover" }}
          />

          {/* Title */}
          <Box sx={{ p: 1.5, textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "#2d3748",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {item.title}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

const Advertisments1 = () => {
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
      {/* Decorative Blurs */}
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

      {/* Scrolling Ads */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <InfiniteScrollRow images={imageData} />
      </motion.div>
    </Box>
  );
};

export default Advertisments1;
