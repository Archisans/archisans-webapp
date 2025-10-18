import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward, Category } from "@mui/icons-material";
import ServicesModal from "./ServicesModal";

const CategoriesGrid = ({ categories }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClick = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}
      </style>
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          background: "linear-gradient(180deg, #FAFAFA 0%, #F5F7FB 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Enhanced Floating Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            right: "10%",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(84,160,255,0.15)",
            filter: "blur(60px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            left: "15%",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "rgba(255,159,243,0.15)",
            filter: "blur(50px)",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "5%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(78,205,196,0.12)",
            filter: "blur(40px)",
            animation: "float 10s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            right: "20%",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(254,202,87,0.12)",
            filter: "blur(45px)",
            animation: "float 7s ease-in-out infinite reverse",
          }}
        />

        {/* Header */}
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            px: { xs: 3, md: 6 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "rgba(12, 19, 111, 0.08)",
                    borderRadius: 20,
                    px: 3,
                    py: 1,
                    mb: 3,
                    border: "1px solid rgba(12, 19, 111, 0.1)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 15px rgba(12, 19, 111, 0.08)",
                  }}
                >
                  <Category sx={{ fontSize: 18, color: "#0c136f" }} />
                  <Typography sx={{ color: "#434966", fontWeight: 600 }}>
                    Service Categories
                  </Typography>
                </Box>
              </motion.div>

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.2rem", md: "3rem" },
                  fontWeight: 800,
                  color: "#434966",
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Find the Right{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  style={{
                    color: "#0c136f",
                    display: "block",
                    background: "linear-gradient(135deg, #0c136f, #1d237d)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Professional ✨
                </motion.span>
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  color: "#6B6F82",
                  maxWidth: 600,
                  mx: "auto",
                }}
              >
                Browse our comprehensive categories to connect with trusted
                experts for your next project.
              </Typography>
            </Box>
          </motion.div>

          {/* Categories Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
              mb: 10,
            }}
          >
            {categories?.slice(0, 8)?.map((cat, idx) => (
              <motion.div
                key={cat?.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Box
                    onClick={() => handleClick(cat)}
                    sx={{
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(15px)",
                      borderRadius: 4,
                      p: 3,
                      cursor: "pointer",
                      border: "1px solid rgba(200,200,200,0.2)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(90deg, transparent, ${cat?.color}15, transparent)`,
                        transition: "left 0.5s ease",
                      },
                      "&:hover": {
                        boxShadow: `0 15px 35px ${cat?.color}25`,
                        borderColor: `${cat?.color}40`,
                        "&:before": {
                          left: "100%",
                        },
                      },
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        rotate: [0, -5, 5, 0],
                        scale: 1.1,
                        transition: { duration: 0.4 },
                      }}
                    >
                      <Box
                        sx={{
                          width: 72,
                          height: 72,
                          borderRadius: 3,
                          backgroundColor: cat?.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 2,
                          boxShadow: `0 8px 25px ${cat?.color}40`,
                          position: "relative",
                          "&:after": {
                            content: '""',
                            position: "absolute",
                            top: -2,
                            left: -2,
                            right: -2,
                            bottom: -2,
                            borderRadius: 3,
                            background: `linear-gradient(45deg, ${cat?.color}, ${cat?.color}80)`,
                            zIndex: -1,
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          },
                          "&:hover:after": {
                            opacity: 0.3,
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={cat?.iconUrl}
                          alt={cat?.title}
                          sx={{
                            width: 82,
                            height: 72,
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    </motion.div>

                    {/* Category Info */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#2A2F45",
                        mb: 0.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={cat?.title}
                    >
                      {cat?.title?.length > 15
                        ? `${cat.title.substring(0, 15)}...`
                        : cat.title}
                    </Typography>

                    {/* <Typography
            sx={{
              fontSize: "0.85rem",
              color: "#6B6F82",
              mb: 1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={`100 professionals`}
          >
            100 professionals
          </Typography> */}

                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowForward sx={{ fontSize: 18, color: cat?.color }} />
                    </motion.div>
                  </Box>
                </motion.div>
              </motion.div>
            ))}
          </Box>

          {/* Bottom CTA */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: "1.1rem", color: "#2A2F45", mb: 3 }}>
                Can't find your specific category?
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    background:
                      "linear-gradient(135deg,#0c136f,#1d237d,#2a3086)",
                    color: "white",
                    fontWeight: 700,
                    px: 6,
                    py: 2.5,
                    borderRadius: 4,
                    textTransform: "none",
                    fontSize: "1.05rem",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 8px 25px rgba(12,19,111,0.3)",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "left 0.5s ease",
                    },
                    "&:hover": {
                      background:
                        "linear-gradient(135deg,#060a42,#0c136f,#1d237d)",
                      boxShadow: "0 12px 35px rgba(12,19,111,0.5)",
                      "&:before": {
                        left: "100%",
                      },
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  View All Categories
                </Button>
              </motion.div>
            </Box>
          </motion.div> */}
        </Box>

        <ServicesModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          category={selectedCategory}
        />
      </Box>
    </>
  );
};

export default CategoriesGrid;
