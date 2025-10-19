import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  WorkOutline,
  TrendingUp,
  Verified,
  Star,
  ArrowForward,
} from "@mui/icons-material";
import { RouteProvider } from "@/config/RouteProvider";
import workerJoinPDF from "@/assets/pdf/workerjoin.pdf"

const benefits = [
  {
    icon: <TrendingUp />,
    title: "Grow Your Business",
    desc: "Access to premium clients",
    color: "#4ECDC4",
  },
  {
    icon: <Verified />,
    title: "Get Verified",
    desc: "Build trust with badges",
    color: "#45B7D1",
  },
  {
    icon: <WorkOutline />, // new icon
    title: "Flexible Opportunities",
    desc: "Choose projects that fit your schedule",
    color: "#FFA500",
  },
];

const WorkerJoin = () => {

  const navigate = useNavigate();

  const downloadPDF = () => {
  const link = document.createElement("a");
  link.href = workerJoinPDF;
  link.download = "Professionals_Guide.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>

      <Box
        sx={{
          pt: { xs: 5, md: 8 },
          pb: { xs: 8, md: 10 },
          background:
            "linear-gradient(135deg, #FAFAFA 0%, #F5F8FF 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: { xs: 3, md: 6 },
        }}
      >
        <Box
          sx={{
            maxWidth: 900,
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Tagline */}
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
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(20px)",
                borderRadius: 4,
                px: 4,
                py: 1.5,
                mb: 4,
                boxShadow: "0 8px 32px rgba(255,215,0,0.2)",
                border: "1px solid rgba(255,215,0,0.1)",
              }}
            >
              <WorkOutline
                sx={{ fontSize: 22, animation: "pulse 2s ease-in-out infinite" }}
              />
              <Typography
                sx={{ color: "#333", fontWeight: 700, fontSize: "1rem" }}
              >
                Professional Opportunities
              </Typography>
            </Box>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.2rem", md: "3rem" },
                fontWeight: 900,
                color: "#222",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Join as a{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(135deg, #FFD700, #FFC107)",
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
              </Box>
            </Typography>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                color: "#555",
                mb: 6,
                lineHeight: 1.7,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Showcase your expertise, connect with premium clients, and grow
              your business with verified opportunities on our platform.
            </Typography>
          </motion.div>

          {/* Benefits */}
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
              mb: 6,
              alignItems: "stretch",
            }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                }}
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
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.3)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    minHeight: "220px", // ✅ equal height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "&:hover": {
      boxShadow: `0 20px 40px ${benefit.color}20`,
      borderColor: benefit.color,
      transform: "translateY(-2px)",
    },
  }}
>

                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${benefit.color}, ${benefit.color}dd)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      mx: "auto",
                      mb: 2,
                      boxShadow: `0 8px 20px ${benefit.color}40`,
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#222",
                      fontSize: "1rem",
                      mb: 0.5,
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography sx={{ color: "#555", fontSize: "0.9rem" }}>
                    {benefit.desc}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </Box>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate(RouteProvider.WORKER_REGISTER)}
                  sx={{
                    background: "linear-gradient(135deg, #FFD700, #FFC107)",
                    color: "#1a1a1a",
                    fontWeight: 700,
                    px: 6,
                    py: 2.5,
                    borderRadius: 4,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    boxShadow: "0 8px 25px rgba(255,215,0,0.4)",
                    "&:hover": {
                      boxShadow: "0 12px 35px rgba(255,215,0,0.5)",
                    },
                  }}
                >
                  Join Now - It's Free
                </Button>
              </motion.div>

              {/* <motion.div whileHover={{ scale: 1.05, y: -2 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={downloadPDF}
                  sx={{
                    color: "#FFD700",
                    borderColor: "#FFD700",
                    borderWidth: 2,
                    fontWeight: 600,
                    px: 6,
                    py: 2.5,
                    borderRadius: 4,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    backgroundColor: "rgba(255,215,0,0.05)",
                    "&:hover": {
                      backgroundColor: "rgba(255,215,0,0.1)",
                      boxShadow: "0 8px 25px rgba(255,215,0,0.2)",
                    },
                  }}
                >
                  Learn More
                </Button>
              </motion.div> */}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default WorkerJoin;
