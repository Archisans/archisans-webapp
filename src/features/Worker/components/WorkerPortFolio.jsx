import React, { useState } from "react";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import { MapPin } from "lucide-react";
import { Phone } from "@mui/icons-material";

import { portfolioProjects } from "../constants";

const WorkerPortFolio = () => {
  const [expanded, setExpanded] = useState(false);

  // Show only 2 projects when collapsed
  const visibleProjects = expanded ? portfolioProjects : portfolioProjects.slice(0, 2);

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
        {visibleProjects.map((project, idx) => (
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

            <Box mt={2}>
              {project.video ? (
                <Typography
                  variant="body2"
                  color="#1976d2"
                  sx={{ cursor: "pointer", fontWeight: 500 }}
                  onClick={() => window.open(project.video, "_blank")}
                >
                  Watch Video
                </Typography>
              ) : (
                <Typography variant="body2" color="#999">
                  Video not available
                </Typography>
              )}

              {project.googleDrive ? (
                <Typography
                  variant="body2"
                  color="#388e3c"
                  sx={{ mt: 1, cursor: "pointer", fontWeight: 500 }}
                  onClick={() => window.open(project.googleDrive, "_blank")}
                >
                  Navigate to Google Drive
                </Typography>
              ) : (
                <Typography variant="body2" color="#999" sx={{ mt: 1 }}>
                  Drive link not available
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Toggle Button */}
      {portfolioProjects.length > 2 && (
        <Button
          variant="text"
          sx={{ mt: 2, alignSelf: "center" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : `Show More (${portfolioProjects.length - 2})`}
        </Button>
      )}
    </Paper>
  );
};

export default WorkerPortFolio;
