import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import MobHeading from "@/components/Mobile/mobileHeading";
import { TERMS_CONTENT } from "@/components/Desktop/Footer/constants";

const TermsMobile = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f7f8fa" }}>
      {/* Mobile Header flush without padding */}
      <MobHeading Heading="Terms & Conditions" />

      {/* Last Updated */}
      <Typography sx={{ mt: 2, fontSize: "0.85rem", color: "#555", px: 2 }}>
        <strong>Last updated:</strong> {TERMS_CONTENT.lastUpdated}
      </Typography>

      {/* Terms Content */}
      <Box sx={{ mt: 2, px: 2 }}>
        {TERMS_CONTENT.sections.map((section, idx) => (
          <Box key={idx} sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 700, color: "#001f5b", fontSize: "1rem", mb: 1 }}>
              {section.title}
            </Typography>
            <Divider sx={{ mb: 1, borderColor: "#e0e0e0" }} />
            <Typography sx={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6, textAlign: "justify" }}>
              {section.content}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ height: 20 }} />
    </Box>
  );
};

export default TermsMobile;
