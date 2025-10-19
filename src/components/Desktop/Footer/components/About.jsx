import React from "react";
import { Box, Typography, Modal, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "@mui/icons-material";
import { aboutData } from "@/components/Desktop/Footer/constants";



const AboutModal = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onClose={onClose}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
                borderRadius: 4,
                p: 4,
                maxWidth: 700,
                width: "90vw",
                maxHeight: "80vh",
                overflow: "auto",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
              }}
            >
              {/* Header */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#2A2F45" }}>
                  {aboutData.title}
                </Typography>
                <IconButton onClick={onClose} sx={{ color: "#6B6F82" }}>
                  <Close />
                </IconButton>
              </Box>

              {/* Content */}
              {aboutData.sections.map((text, idx) => (
                <Typography key={idx} sx={{ mb: 2, color: "#555", lineHeight: 1.6 }}>
                  {text}
                </Typography>
              ))}
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;
