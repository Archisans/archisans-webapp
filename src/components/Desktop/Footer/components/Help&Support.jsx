import React from "react";
import { Box, Typography, Modal, IconButton, Divider } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Close, Phone, Email, WhatsApp } from "@mui/icons-material";
import {supportData} from "@/components/Desktop/Footer/constants"


const HelpSupportModal = ({ open, onClose }) => {
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
                maxWidth: 600,
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
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#2A2F45" }}>
                  {supportData.title}
                </Typography>
                <IconButton onClick={onClose} sx={{ color: "#6B6F82" }}>
                  <Close />
                </IconButton>
              </Box>

              {/* Description */}
              <Typography sx={{ mb: 3, color: "#555", lineHeight: 1.6 }}>
                {supportData.description}
              </Typography>

              {/* Contact Options */}
              {supportData.contacts.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                    p: 2,
                    backgroundColor: "rgba(78,188,255,0.1)",
                    borderRadius: 2,
                  }}
                >
                  {item.icon}
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: "#2A2F45" }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ color: "#555", fontSize: "0.9rem" }}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              {/* Support Hours */}
              <Typography sx={{ fontWeight: 600, color: "#2A2F45", mb: 1 }}>
                {supportData.hours.title}
              </Typography>
              {supportData.hours.timing.map((time, idx) => (
                <Typography key={idx} sx={{ color: "#555", fontSize: "0.9rem" }}>
                  {time}
                </Typography>
              ))}
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default HelpSupportModal;
