import React from "react";
import { Box, Typography, Button, Paper, Chip } from "@mui/material";
import { motion } from "framer-motion";
import {
  Bolt,
  Security,
  AutoAwesome,
  Speed,
  Notifications,
  Schedule,
} from "@mui/icons-material";
import InstantServiceImg from "@/assets/Images/InstantService.png";
import { features } from "./constants/features";
import { deepBlue } from "@/config/Theme/config/color";

const InstantService = () => {
  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}
      </style>
      <Box
        sx={{
          pt: { xs: 4, md: 6 },
          pb: { xs: 2, md: 1 },
          background: "linear-gradient(135deg, #FAFAFA 0%, #F0F8FF 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Enhanced Blur Circles */}

        <Box
          sx={{
            width: "100%",
            mx: "auto",
            px: { xs: 3, md: 6 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              alignItems: "center",
              gap: { xs: 6, lg: 10 },
            }}
          >
            {/* Left: Content */}
            <Box sx={{ flex: 1, textAlign: { xs: "center", lg: "left" } }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Enhanced Tagline */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(20px)",
                      borderRadius: 4,
                      px: 4,
                      py: 1.5,
                      mb: 4,
                      boxShadow: "0 8px 32px rgba(78,188,255,0.2)",
                      border: "1px solid rgba(78,188,255,0.1)",
                    }}
                  >
                    <Schedule
                      sx={{
                        fontSize: 22,
                        color: deepBlue[500],
                        animation: "pulse 2s ease-in-out infinite",
                      }}
                    />
                    <Typography
                      sx={{
                        color: "neutral.content.600",
                        fontWeight: 700,
                        fontSize: "1rem",
                      }}
                    >
                      Coming Soon
                    </Typography>
                  </Box>
                </motion.div>

                {/* Enhanced Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "2.2rem", md: "3.2rem" },
                      fontWeight: 900,
                      color: "neutral.content.600",
                      mb: 3,
                      lineHeight: 1.2,
                    }}
                  >
                    Instant{"  "}
                    <Box
                      component="span"
                      sx={{
                        background:
                          `linear-gradient(135deg, ${deepBlue[500]}, ${deepBlue[300]})`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        position: "relative",
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          animation: "shimmer 3s ease-in-out infinite",
                        },
                      }}
                    >
                      Professional
                    </Box>{" "}
                    <Box
                      component="span"
                      sx={{
                        display: "inline-block",
                        animation: "bounce 2s ease-in-out infinite",
                      }}
                    >
                      Services ⚡
                    </Box>
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                      color: "neutral.content.600",
                      mb: 5,
                      lineHeight: 1.7,
                      maxWidth: 520,
                    }}
                  >
                    Revolutionary instant matching technology coming soon!
                    Connect with top-rated professionals in seconds, not hours.
                  </Typography>
                </motion.div>

                {/* Enhanced Benefits */}
                <Box
                  sx={{
                    display: "grid",
                    gap: 3,
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    mb: 6,
                  }}
                >
                  {features.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -5,
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(15px)",
                          textAlign: "left",
                          display: "flex",
                          gap: 2,
                          justifyContent: "center",
                          alignItems: "center",
                          border: "1px solid rgba(255,255,255,0.3)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            boxShadow: `0 20px 40px ${benefit.color}20`,
                            borderColor: benefit.color,
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 3,
                            background: `linear-gradient(135deg, ${benefit.color}, ${benefit.color}dd)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "neutral.bg.50",
                            flexShrink: 0,
                            boxShadow: `0 8px 20px ${benefit.color}40`,
                          }}
                        >
                          {benefit.icon}
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              color: "neutral.content.800",
                              fontSize: "1rem",
                              mb: 0.5,
                            }}
                          >
                            {benefit.title}
                          </Typography>
                          <Typography
                            sx={{ color: "neutral.content.600", fontSize: "0.9rem" }}
                          >
                            {benefit.desc}
                          </Typography>
                        </Box>
                      </Paper>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Box>

            {/* Enhanced Right Visual */}

            <Box sx={{ flex: 1, position: "relative" }}>
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Image Box */}
                <Box
                  component="img"
                  src={InstantServiceImg}
                  alt="Instant Service"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 4,
                    boxShadow: "none",
                    display: "block",
                  }}
                />
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default InstantService;
