import React from "react";
import { Box, Typography, Modal, IconButton, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "@mui/icons-material";
import { privacyData } from "@/components/Desktop/Footer/constants";

const PrivacyPolicyModal = ({ open, onClose }) => {
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
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  // inner scroll area
                  maxHeight: `calc(80vh - ${theme.spacing(8)})`,
                  overflow: "auto",

                  // create space on the RIGHT side of the scrollbar (inside the box)
                  marginInlineEnd: theme.spacing(2), // moves scrollbar left
                  // keep content away from the scrollbar
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
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: "#2A2F45" }}
                  >
                    {privacyData.title}
                  </Typography>
                  <IconButton onClick={onClose} sx={{ color: "#6B6F82" }}>
                    <Close />
                  </IconButton>
                </Box>

                {/* Last Updated */}
                <Typography
                  sx={{
                    mb: 2,
                    color: "#555",
                    lineHeight: 1.6,
                    fontSize: "0.9rem",
                  }}
                >
                  <strong>Last updated:</strong> {privacyData.lastUpdated}
                </Typography>

                {/* Intro */}
                <Typography sx={{ mb: 2, color: "#555", lineHeight: 1.6 }}>
                  {privacyData.intro}
                </Typography>

                {/* Sections */}
                {privacyData.sections.map((section, idx) => (
                  <Box key={idx}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#2A2F45", mb: 1, mt: 2 }}
                    >
                      {section.heading}
                    </Typography>
                    <Typography sx={{ mb: 2, color: "#555", lineHeight: 1.6 }}>
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

export default PrivacyPolicyModal;
