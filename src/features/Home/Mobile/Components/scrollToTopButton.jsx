import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;

    // Show button if user has scrolled down at least 500px and is scrolling up
    if (currentScrollY > 500 && currentScrollY < lastScrollY.current) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    lastScrollY.current = currentScrollY;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Box
      onClick={scrollToTop}
      sx={{
        position: "fixed",
        bottom: 70,
        left: "50%",
        transform: "translateX(-50%)",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(0, 0, 0, 1))",
        borderRadius: 50,
        padding: 1,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        backdropFilter: "blur(1px)",
        zIndex: 1000
      }}
    >
      <KeyboardArrowUpIcon sx={{ fontSize: 19, color: "white" }} />
      <Typography sx={{ color: 'white', fontSize: 11, ml: 0.5 }}>
        Back to top
      </Typography>
    </Box>
  );
};

export default ScrollToTopButton;
