import React from "react";
import { Box, Typography, Card, Link, Divider, useTheme, useMediaQuery } from "@mui/material";
import { MapPin } from "lucide-react";
import { projects } from "@/features/WorkerPage1/Worker/constants";

const MobWorkerPortFolio = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ pb: 6, px: isMobile ? 1.5 : 3 }}>
      {/* Section Heading */}
      <Typography
        sx={{
          fontSize: { xs: 18, sm: 20 },
          fontWeight: "600",
          mt: { xs: 3, sm: 4 },
          mb: { xs: 2, sm: 3 },
          ml: 2,
          color: "#050a56ff",
        }}
      >
        My Projects
      </Typography>

      {projects.map((project, idx) => (
        <Box key={idx} sx={{ mb: { xs: 2.5, sm: 3 }, mx: { xs: 1, sm: 5 } }}>
          <Card
            sx={{
              px: { xs: 1.5, sm: 5 },
              py: { xs: 2, sm: 4 },
              borderRadius: 1.5,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              backgroundColor: "#ffffff",
            }}
          >
            {/* Title */}
            <Typography
              sx={{
                display: "flex",
                fontSize: { xs: 15, sm: 17 },
                fontWeight: 600,
                mb: { xs: 1, sm: 2 },
                color: "#111827",
                justifyContent: "center",
              }}
            >
              {project.title}
            </Typography>

            {/* Service + Location + Date */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: { xs: 1.5, sm: 2 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 13, sm: 15 },
                  fontWeight: 500,
                  color: "#041060ff",
                }}
              >
                {project.service}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <MapPin size={16} color="#0d0651ff" />
                  <Typography sx={{ fontSize: { xs: 12, sm: 15 }, color: "#374151" }}>
                    {project.location}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: { xs: 11, sm: 14 }, color: "#6b7280" }}>
                  {project.date}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: { xs: 1.5, sm: 2 } }} />

            {/* Description */}
            <Typography
              sx={{
                fontSize: { xs: 13, sm: 15 },
                lineHeight: 1.6,
                mb: { xs: 1.5, sm: 2 },
                color: "#374151",
              }}
            >
              {project.description}
            </Typography>

            {/* Images */}
            <Box
              sx={{
                display: "flex",
                gap: { xs: 1, sm: 1.5 },
                overflowX: "auto",
                pb: 1,
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
              }}
            >
              {project.images?.map((img, imgIdx) => (
                <Box
                  key={imgIdx}
                  component="img"
                  src={img}
                  alt="Project"
                  sx={{
                    width: { xs: 120, sm: 140 },
                    height: { xs: 80, sm: 90 },
                    objectFit: "cover",
                    borderRadius: 2,
                    flexShrink: 0,
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                />
              ))}
            </Box>

            {/* Video Link */}
            {project.video && (
              <Box sx={{ mt: 1 }}>
                <Typography
                  sx={{
                    fontSize: { xs: 12, sm: 15 },
                    fontWeight: 600,
                    mb: 0.3,
                    color: "#111827",
                  }}
                >
                  Video:
                </Typography>
                <Link
                  href={project.video}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    fontSize: { xs: 12, sm: 13 },
                    color: "#2563eb",
                    fontWeight: 500,
                    wordBreak: "break-word",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {project.video}
                </Link>
              </Box>
            )}
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default MobWorkerPortFolio;
