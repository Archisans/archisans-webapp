import {
  Box,
  Typography,
  IconButton,
  CardContent,
  Tooltip,
  Chip,
} from "@mui/material";
import { Facebook, LinkedIn, Instagram, YouTube, Language } from "@mui/icons-material";

const socialPlatforms = {
  Website:{
    icon:<Language size={22} />,
    color: "#3059e1ff",
  },
  Instagram: {
    icon: <Instagram size={22} />,
    color: "#E1306C",
  },
  Facebook: {
    icon: <Facebook size={22} />,
    color: "#1877F2",
  },
  YouTube: {
    icon: <YouTube size={22} />,
    color: "#FF0000",
  },
  LinkedIn: {
    icon: <LinkedIn size={22} />,
    color: "#0A66C2",
  },
};

const WorkerSocialMediaLinks = ({ social = [] }) => {
  const validSocialLinks = social
    .filter((item) => item?.url && item?.platform)
    .map((item) => {
      const platformConfig = socialPlatforms[item.platform];

      return {
        ...item,
        icon: platformConfig.icon,
        color: platformConfig.color,
        displayName: item.platform,
        profileUrl: item.url,
      };
    });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 450,
        mx: "auto",
      }}
    >
      <CardContent>
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color: "#1e293b",
              background: "linear-gradient(135deg, #334155 0%, #475569 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Connect with Me
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontSize: "0.875rem" }}
          >
            Follow my work on social media
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          {validSocialLinks.map((item) => (
            <Tooltip
              key={item.id || `${item.platform}-${item.url}`}
              title={`Visit ${item.displayName}`}
              arrow
              placement="top"
            >
              <Box sx={{ position: "relative" }}>
                <IconButton
                  component="a"
                  href={item.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: "neutral.bg.50",
                    borderRadius: "16px",
                    p: 2,
                    ml: 2,
                    width: 56,
                    height: 56,
                    border: `2px solid ${item.color}20`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    "&:hover": {
                      bgcolor: `${item.color}08`,
                      transform: "scale(1.15)",
                      boxShadow: `0 4px 20px ${item.color}30`,
                      border: `2px solid ${item.color}40`,
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Box sx={{ color: item.color }}>{item.icon}</Box>
                </IconButton>

                {/* Platform label */}
                <Chip
                  label={item.displayName}
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: -8,
                    left: "50%",
                    ml: 1,
                    transform: "translateX(-50%)",
                    bgcolor: item.color,
                    color: "neutral.bg.50",
                    fontSize: "0.65rem",
                    height: 20,
                    minWidth: 80,
                    "& .MuiChip-label": {
                      px: 1,
                      fontWeight: 600,
                    },
                  }}
                />
              </Box>
            </Tooltip>
          ))}
        </Box>

        {/* Stats */}
        <Box
          display="flex"
          justifyContent="center"
          mt={3}
          pt={2}
          sx={{
            borderTop: "1px solid #e2e8f0",
            opacity: 0.8,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#64748b",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#10b981",
              }}
            />
            {validSocialLinks.length} platform
            {validSocialLinks.length !== 1 ? "s" : ""} connected
          </Typography>
        </Box>
      </CardContent>
    </Box>
  );
};

export default WorkerSocialMediaLinks;
