import React from "react";
import { Box, Typography, Divider, AppBar, Toolbar, IconButton } from "@mui/material";
import MobHeading from "@/components/Mobile/MobileHeading";
import { useNavigate } from "react-router-dom";
import { privacyData } from "@/components/Desktop/Footer/constants";

const PrivacyPolicyMobile = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f7f8fa" }}>
            {/* Header */}
            <MobHeading Heading="Privacy Policy" />

            {/* Last Updated */}
            <Typography sx={{ mt: 2, px: 2, fontSize: "0.85rem", color: "#555" }}>
                <strong>Last updated:</strong> {privacyData.lastUpdated}
            </Typography>

            {/* Intro */}
            <Typography sx={{ mt: 1, px: 2, fontSize: "0.9rem", color: "#555", lineHeight: 1.6 }}>
                {privacyData.intro}
            </Typography>

            {/* Sections */}
            <Box sx={{ mt: 2, px: 2 }}>
                {privacyData.sections.map((section, idx) => (
                    <Box key={idx} sx={{ mb: 3 }}>
                        <Typography
                            sx={{ fontWeight: 700, color: "#001f5b", fontSize: "1rem", mb: 1 }}
                        >
                            {section.heading}
                        </Typography>
                        <Divider sx={{ mb: 1, borderColor: "#e0e0e0" }} />
                        <Typography sx={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6 }}>
                            {section.content}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{ height: 20 }} />
        </Box>
    );
};

export default PrivacyPolicyMobile;
