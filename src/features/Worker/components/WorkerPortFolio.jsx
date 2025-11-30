import React from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import { MapPin } from "lucide-react";
import { Phone } from "@mui/icons-material";
import WORK_SAMPLES from "@/features/WorkerPage/Portfolio/constants";

const WorkerPortFolio = () => {
  const getLinkLabel = (url) => {
    if (url.includes("youtube.com") || url.includes("youtu.be"))
      return "YouTube Link";
    if (url.includes("drive.google.com")) return "Google Drive Link";
    return "View Link";
  };

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
        Recent Projects
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {WORK_SAMPLES.map((project, idx) => (
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
            {/* Title */}
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              {project.title}
            </Typography>

            {/* Service Type */}
            <Chip
              label={project.type}
              size="small"
              sx={{ bgcolor: "#f3f2ef", color: "#666", mb: 1 }}
            />

            {/* Location & Phone */}
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
                  {project.clientNumber}
                </Typography>
              </Box>
            </Box>

            {/* Photos */}
            {project.photos && project.photos.length > 0 ? (
              <Box display="flex" gap={1} mt={2} sx={{ overflowX: "auto" }}>
                {project.photos.slice(0, 3).map((photo, imgIdx) => (
                  <img
                    key={imgIdx}
                    src={photo}
                    alt={`Project-${imgIdx}`}
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
            ) : (
              <Typography
                variant="body2"
                color="#999"
                sx={{ mt: 1, fontStyle: "italic" }}
              >
                No photos available
              </Typography>
            )}

            {/* Links */}
           <Box mt={2}>
  <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>
    Links
  </Typography>

  {project.Links && project.Links.length > 0 ? (
    <Box display="flex" gap={1} flexWrap="wrap">
      {project.Links.map((link, linkIdx) => (
        <Typography
          key={linkIdx}
          variant="body2"
          color="#1976d2"
          sx={{
            cursor: "pointer",
            fontWeight: 500,
            border: "1px solid #1976d2",
            borderRadius: "6px",
            px: 1.5,
            py: 0.3,
          }}
          onClick={() => window.open(link, "_blank")}
        >
          {getLinkLabel(link)}
        </Typography>
      ))}
    </Box>
  ) : (
    <Typography variant="body2" color="#999">
      No links available
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
