import React from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Grid,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ServicesModal = ({ open, onClose, category }) => {
  const navigate = useNavigate();

  const theme = useTheme();

  const handleClick = (slug) => {
    if (slug) {
      navigate("/workers/" + slug);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onClose={onClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Box
              sx={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                ...theme.mixins.borderRadius("xxs"),
                p: 2,
                maxWidth: 800,
                width: "90vw",
                maxHeight: "80vh",
                overflow: "hidden", // was 'auto' – outer stays non-scrollable
                boxSizing: "border-box",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
              }}
            >
              <Box
                sx={{
                  // Inner scroll area
                  maxHeight: `calc(80vh - ${theme.spacing(8)})`, // subtract outer padding (p:4 on both sides)
                  overflow: "auto",

                  // Move scrollbar inward from the right edge of the outer box
                  marginInlineEnd: theme.spacing(1), // indent scrollbar (LTR: right)
                  // Keep content away from the scrollbar
                  paddingInlineEnd: `calc(${theme.spacing(3)} + 10px)`,

                  scrollbarGutter: "stable",

                  // Firefox
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(0,0,0,0.3) transparent",

                  // WebKit
                  "&::-webkit-scrollbar": { width: 8 },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,0.3)",
                    borderRadius: 9999,
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "rgba(0,0,0,0.45)",
                  },
                  "&::-webkit-scrollbar-track": { background: "transparent" },
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      fontWeight: 800,
                      color: "#2A2F45",
                    }}
                  >
                    {category?.title}
                  </Typography>
                  <IconButton onClick={onClose} sx={{ color: "#6B6F82" }}>
                    <Close />
                  </IconButton>
                </Box>

                {/* Services Grid */}
                <Grid container spacing={2}>
                  {category?.services?.map((service, idx) => (
                    <Grid item xs={6} sm={4} md={3} key={service?.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleClick(service?.slug)}
                      >
                        <Box
                          sx={{
                            width: 220,
                            height: 190,
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 2,
                            overflow: "hidden",
                            cursor: "pointer",
                            background: "white",
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            transition: "all 0.4s ease",
                            "&:hover": {
                              transform: "translateY(-8px) scale(1.02)",
                              boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                            },
                          }}
                        >
                          {/* Image Section */}
                          <Box
                            sx={{
                              height: "65%",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <Box
                              component="img"
                              src={service?.imageUrl}
                              alt={service?.title}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 0.4s ease",
                              }}
                            />
                            {/* Overlay gradient */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(45deg, ${service?.color}30, transparent)`,
                              }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "50%",
                                background:
                                  "linear-gradient(transparent, rgba(0,0,0,0.6))",
                              }}
                            />
                            {/* Jobs badge */}
                            {/* <Box
                              sx={{
                                position: "absolute",
                                bottom: 8,
                                right: 12,
                                px: 1.5,
                                py: 0.3,
                                borderRadius: 2,
                                backdropFilter: "blur(6px)",
                                backgroundColor: "rgba(0,0,0,0.35)",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: "#fff",
                                }}
                              >
                                500 pros
                              </Typography>
                            </Box> */}
                          </Box>

                          {/* Content Section */}
                          <Box sx={{ flex: 1, p: 1.5 }}>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                color: "#1a1a1a",
                                textAlign: "center",
                                lineHeight: 1.3,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                              title={service?.title}
                            >
                              {service?.title}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ServicesModal;
