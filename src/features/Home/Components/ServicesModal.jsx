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
                maxWidth: Math.min(800, category?.services?.length * 180), 
                width: "auto",
                maxHeight: category?.services?.length <= 2 ? 250 : "80vh", 
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
                      color: "neutral.bg.800",
                    }}
                  >
                    {category?.title}
                  </Typography>
                  <IconButton onClick={onClose} sx={{ color: "neutral.content.600" }}>
                    <Close />
                  </IconButton>
                </Box>

                {/* Services Grid */}
               <Grid container spacing={2} justifyContent="center">
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
        {/* MobServiceCategoryList Card */}
        <Box
          sx={{
            width: 170,
            height: 137,
            borderRadius: 1,
            overflow: "hidden",
            cursor: "pointer",
            position: "relative",
            border: "0.5px solid #858383ff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            mb: 1.4,
          }}
        >
          {/* Full-size Image */}
          <Box
            component="img"
            src={service?.imageUrl}
            alt={service?.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Gradient Overlay + Title */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(204, 201, 201, 0.03), rgba(88, 87, 87, 0.42), rgba(0, 0, 0, 0.71), rgba(0, 0, 0, 1))",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              pb: 1.2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "neutral.bg.50",
                fontSize: "13px",
                lineHeight: 1.2,
                textAlign: "center",
                wordWrap: "break-word",
                mb: 1.2,
                px: 1,
              }}
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
