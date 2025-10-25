import React from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import { MapPin, Calendar } from "lucide-react";

import { Phone } from "@mui/icons-material";

const WorkerPortFolio = ({ worker }) => {
  // get sid from localStorage
  const sid = parseInt(localStorage.getItem("sid"), 10);

  // filter project by sid
  let filteredProjects = [];
  if (sid) {
    const matched = worker.projects.find((p) => p.id === sid);
    if (matched) filteredProjects.push(matched);
  }

  // add one random project if available
  const remaining = worker.projects.filter(
    (p) => !filteredProjects.includes(p)
  );
  if (remaining.length > 0) {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    filteredProjects.push(remaining[randomIndex]);
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={3}>
        Projects
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {filteredProjects.map((project, idx) => (
          <Box
            key={idx}
            sx={{
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              "&:hover": {
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              {project.title}
            </Typography>

            <Chip
              label={project.service}
              size="small"
              sx={{ bgcolor: "#f3f2ef", color: "#666", mb: 1 }}
            />

            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <MapPin size={14} color="#666" />
                <Typography variant="body2" color="#666">
                  {project.location}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Phone sx={{ fontSize: 14, color: "#666" }} />
                <Typography variant="body2" color="#666">
                  {project.phnno}
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" color="#666" lineHeight={1.5}>
              {project.description}
            </Typography>

            {/* Project Images */}
            {project.images && project.images.length > 0 && (
              <Box display="flex" gap={1} mt={2} sx={{ overflowX: "auto" }}>
                {project.images.slice(0, 3).map((img, imgIdx) => (
                  <img
                    key={imgIdx}
                    src={img}
                    alt="Project"
                    style={{
                      width: 80,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 4,
                      flexShrink: 0,
                    }}
                  />
                ))}
              </Box>
            )}

            {/* Conditional Video */}
            <Box mt={2}>
              {project.video ? (
                <Typography
                  variant="body2"
                  color="#1976d2"
                  sx={{ mt: 2, cursor: "pointer", fontWeight: 500 }}
                  onClick={() => window.open(project.video, "_blank")}
                >
                  Watch Video
                </Typography>
              ) : (
                <Typography variant="body2" color="#999" sx={{ mt: 2 }}>
                  Video not available
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default WorkerPortFolio;
