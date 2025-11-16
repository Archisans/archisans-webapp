// PopularServicesStatic.jsx
import { Box, Typography, Card, CardContent, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { TrendingUp } from "@mui/icons-material";
import { popularServices } from "@/features/Home/Components/constants/popularServices";
import { useNavigate } from "react-router-dom";

export default function PopularServicesStatic({ onGetStartedClick }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        background: "linear-gradient(180deg, #f3f4f8ff 10%, #F5F7FB 100%)",
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          px: { xs: 3, md: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Chip
              icon={<TrendingUp />}
              label="Most Requested"
              sx={{
                backgroundColor: "#FFD700",
                color: "#1a1a1a",
                fontWeight: 600,
                mb: 3,
                px: 2,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 900,
                color: "#1a1a1a",
                mb: 2,
              }}
            >
              Popular Services
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Discover our most sought-after professional services with top ratings and proven results.
            </Typography>
          </Box>
        </motion.div>

        {/* Services Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", // responsive grid
            gap: 2,
            justifyContent: "center",
            mx: "auto",
            width: "100%",
            maxWidth: 1200,
          }}
        >
          {popularServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                onClick={() => navigate(service.link)}
                sx={{
                  height: 210,
                  borderRadius: 1,
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                  background: "white",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #e5e7eb",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                  },
                }}
              >
                {/* Image Section */}
                <Box
                  sx={{
                    height: 130,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={service.icon}
                    alt={service.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                </Box>

                {/* Content Section */}
                <CardContent sx={{ p: 2, height: 100 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "#1a1a1a",
                      mb: 0.1,
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textAlign: "center", // center text
                    }}
                  >
                    {service.name}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography sx={{ fontSize: "1.1rem", color: "text.secondary", mb: 3 }}>
              Can't find what you're looking for?
            </Typography>
            <Box
              onClick={onGetStartedClick}
              sx={{
                display: "inline-block",
                px: 4,
                py: 2,
                backgroundColor: "white",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Typography sx={{ fontWeight: 700, color: "#1a1a1a", fontSize: "1.1rem" }}>
                Browse All Categories →
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
