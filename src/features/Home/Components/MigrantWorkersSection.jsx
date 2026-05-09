import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import {
  Groups,
  Verified,
  WorkOutline,
  ArrowForward,
} from "@mui/icons-material";

import MigrantWorkersFormModal from "@/features/MigrantWorkers/MigrantWorkersModal";

const benefits = [
  {
    icon: <Groups />,
    title: "Skilled Workforce",
    desc: "Access verified migrant workers for every construction need.",
    color: "#4CAF50",
  },
  {
    icon: <Verified />,
    title: "Trusted Hiring",
    desc: "Transparent, safe and reliable worker recruitment.",
    color: "#2196F3",
  },
  {
    icon: <WorkOutline />,
    title: "Quick Deployment",
    desc: "Get workers ready for projects without delays.",
    color: "#FF9800",
  },
];

export default function MigrantWorkersSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%,100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>

      {/* MAIN SECTION */}
      <Box
        sx={{
          pt: { xs: 6, md: 8 },
          pb: { xs: 8, md: 10 },
          px: { xs: 3, md: 6 },
          background:
            "linear-gradient(135deg,#FAFAFA 0%,#F5F8FF 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 950,
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* TOP TAG */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "rgba(255,193,7,0.12)",
                borderRadius: 3,
                px: 3,
                py: 1,
                mb: 3,
              }}
            >
              <Groups
                sx={{
                  fontSize: 22,
                  color: "#FF9800",
                  animation:
                    "pulse 2s ease-in-out infinite",
                }}
              />

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#444",
                  fontSize: "1rem",
                }}
              >
                Workforce Solutions
              </Typography>
            </Box>
          </motion.div>

          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: {
                  xs: "2.1rem",
                  md: "3rem",
                },
                fontWeight: 900,
                color: "#111",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Book{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(135deg,#0D47A1,#1565C0)",
                  backgroundClip: "text",
                  WebkitBackgroundClip:
                    "text",
                  WebkitTextFillColor:
                    "transparent",
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    animation:
                      "shimmer 3s linear infinite",
                  },
                }}
              >
                Migrant Workers
              </Box>
            </Typography>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            viewport={{ once: true }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "1.05rem",
                  md: "1.2rem",
                },
                color: "#666",
                mb: 6,
                lineHeight: 1.8,
                maxWidth: 700,
                mx: "auto",
              }}
            >
              Builders, contractors and
              companies can hire skilled migrant
              workers through Archisans for fast,
              secure and hassle-free workforce
              deployment.
            </Typography>
          </motion.div>

          {/* BENEFIT CARDS */}
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr 1fr",
              },
              mb: 6,
              alignItems: "stretch",
            }}
          >
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.6,
                  delay:
                    0.4 + index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background:
                      "rgba(255,255,255,0.9)",
                    backdropFilter:
                      "blur(15px)",
                    border:
                      "1px solid rgba(255,255,255,0.4)",
                    minHeight: 220,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:
                      "center",
                    transition:
                      "all 0.3s ease",
                    "&:hover": {
                      borderColor:
                        item.color,
                      boxShadow: `0 20px 40px ${item.color}20`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      background: `linear-gradient(135deg,${item.color},${item.color}dd)`,
                      color: "white",
                      display: "flex",
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                      mx: "auto",
                      mb: 2,
                      boxShadow: `0 8px 20px ${item.color}40`,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      mb: 1,
                      color: "#222",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#666",
                      fontSize: "0.92rem",
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </Box>

          {/* BUTTON */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.8,
            }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
            >
              <Button
                onClick={() =>
                  setOpen(true)
                }
                endIcon={
                  <ArrowForward />
                }
                sx={{
                  px: 6,
                  py: 2.5,
                  borderRadius: 4,
                  textTransform:
                    "none",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  background:
                    "linear-gradient(135deg,#FFD700,#FFC107)",
                  color: "#111",
                  boxShadow:
                    "0 8px 25px rgba(255,215,0,0.35)",
                  "&:hover": {
                    boxShadow:
                      "0 12px 35px rgba(255,215,0,0.45)",
                  },
                }}
              >
                Book Now
              </Button>
            </motion.div>
          </motion.div>
        </Box>
      </Box>

      {/* MODAL */}
      <MigrantWorkersFormModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}