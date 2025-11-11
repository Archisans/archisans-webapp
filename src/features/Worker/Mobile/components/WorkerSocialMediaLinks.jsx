import React from "react";
import { Box, Typography, IconButton, Card, CardContent, Tooltip } from "@mui/material";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    icon: <Instagram size={22} color="#E1306C" />,
    url: "https://www.instagram.com/",
  },
  {
    name: "Facebook",
    icon: <Facebook size={22} color="#1877F2" />,
    url: "https://www.facebook.com/",
  },
  {
    name: "YouTube",
    icon: <Youtube size={22} color="#FF0000" />,
    url: "https://www.youtube.com/",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={22} color="#0A66C2" />,
    url: "https://www.linkedin.com/",
  },
];

const WorkerSocialMediaLinks = () => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        mt: 3,
        borderRadius: 3,
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={600}
          textAlign="center"
          mb={2}
          sx={{ color: "#1a1a1a" }}
        >
          Connect with Me
        </Typography>

        <Box display="flex" justifyContent="center" gap={3}>
          {socialLinks.map((social) => (
            <Tooltip title={social.name} key={social.name}>
              <IconButton
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "#f7f7f7",
                  borderRadius: "50%",
                  p: 1.3,
                  "&:hover": {
                    bgcolor: "#eaeaea",
                    transform: "scale(1.1)",
                    transition: "0.2s ease",
                  },
                }}
              >
                {social.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkerSocialMediaLinks;
