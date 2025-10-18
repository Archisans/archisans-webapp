import React from "react";
import { Box, Typography, Modal, IconButton, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "@mui/icons-material";
import { TERMS_CONTENT } from "@/components/Desktop/Footer/constants";

const TermsModal = ({ open, onClose }) => {
  const theme = useTheme();
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
                borderRadius: theme.mixins.borderRadius("xxs").borderRadius,
                p: 1,
                pl:4,
                pt:4,
                maxWidth: 700,
                width: "90vw",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                // keep outer box non-scrollable
                maxHeight: `calc(80vh - ${theme.spacing(8)})`,
                overflowY: "auto",
                overflowX: "hidden",

                // Hide scrollbar
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
              }}
            >
              <Box
                
              >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, color: "#2A2F45" }}
                >
                  Terms & Conditions
                </Typography>
                <IconButton onClick={onClose} sx={{ color: "#6B6F82" }}>
                  <Close />
                </IconButton>
              </Box>

              <Typography
                sx={{
                  mb: 2,
                  color: "#555",
                  lineHeight: 1.6,
                  fontSize: "0.9rem",
                }}
              >
                <strong>Last updated:</strong> {TERMS_CONTENT.lastUpdated}
              </Typography>

              {TERMS_CONTENT.sections.map((section, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#2A2F45", mb: 1, mt: 2 }}
                  >
                    {section.title}
                  </Typography>
                  <Typography sx={{ color: "#555", lineHeight: 1.6 }}>
                    {section.content}
                  </Typography>
                </Box>
              ))}
            </Box>
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
