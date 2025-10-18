import React from "react";
import { Grid, Box, Typography, IconButton, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supportData } from "@/components/Desktop/Footer/constants";
import { motion } from "framer-motion";
import MobHeading from "@/components/Mobile/mobileHeading";

const MobHelpSupportCard = ({ icon, title, subtitle, href }) => {
  return (
    <a href={href || "#"} style={{ textDecoration: "none", width: "100%" }}>
<Paper
  component={motion.div}
  whileHover={{ scale: 1.03 }}
  elevation={3}
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 3,
    p: 3,
    borderRadius: 3,
    backgroundColor: "#fefefe",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    width: 330,          
    maxWidth: "100%",    
    minWidth: 310,      
  }}
>
        <Box
          sx={{
            width: 55,
            height: 55,
            borderRadius: "50%",
            backgroundColor: "#001f5b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#001f5b" }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ fontSize: "0.85rem", color: "#555", mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Paper>
    </a>
  );
};

const MobHelpSupport = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      sx={{
        minHeight: "100vh",
        p: 2,
        backgroundColor: "#f4f5f8",
      }}
    >

<MobHeading Heading="Help & Support"/>

      {/* Header */}
      <Box sx={{ mb:4 , mt:1}}>
        <Typography
          sx={{
            fontSize: { xs: 22, sm: 26 },
            fontWeight: 700,
            color: "#001f5b",
          }}
        >
          How can we help?
        </Typography>
      </Box>

      {/* Contact Options */}
      <Grid container spacing={2} mb={4} justifyContent="center">
        {supportData.contacts.map((item, idx) => (
          <Grid  key={idx} sx={{ display: "flex", justifyContent: "center" }}>
            <MobHelpSupportCard
              icon={item.icon}
              title={item.label}
              subtitle={item.value}
              href={item.href}
            />
          </Grid>
        ))}
      </Grid>

      {/* Support Hours */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontWeight: 700, color: "#001f5b", mb: 1 }}>
          {supportData.hours.title}
        </Typography>
        {supportData.hours.timing.map((time, idx) => (
          <Typography key={idx} sx={{ color: "#555", fontSize: "0.85rem", mb: 0.5 }}>
            {time}
          </Typography>
        ))}
      </Box>

      {/* Footer */}
      <Typography
        sx={{
          fontSize: "0.75rem",
          color: "#999",
          textAlign: "center",
          mt: "auto",
          mb: 2,
        }}
      >
        © {new Date().getFullYear()} Archisans. All rights reserved.
      </Typography>
    </Grid>
  );
};

export default MobHelpSupport;
