import React, { useState } from "react";
import { Box, Typography, Button, IconButton, Chip, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { socialLinks, quickLinks, contactInfo, stats } from "@/components/Desktop/Footer/constants";
import AboutModal from "@/components/Desktop/Footer/components/About";
import HelpSupportModal from "@/components/Desktop/Footer/components/Help&Support";
import PrivacyPolicyModal from "@/components/Desktop/Footer/components/PrivacyPolicy";
import TermsModal from "./components/TermsModal";

const Footer = () => {
  const navigate = useNavigate();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const handleLinkClick = (path) => {
    if (path === "/about") setAboutOpen(true);
    else if (path === "/help") setHelpOpen(true);
    else if (path === "/privacy") setPrivacyOpen(true);
    else if (path === "/terms") setTermsOpen(true);
    
    else navigate(path);
  };

  const ContactItem = ({ icon, text }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      {icon}
      <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>{text}</Typography>
    </Box>
  );

  const SocialButton = ({ icon, color }) => (
    <IconButton
      sx={{
        backgroundColor: "rgba(78,188,255,0.1)",
        color: "#1a1a1a",
        "&:hover": { backgroundColor: color, transform: "translateY(-2px)" },
        transition: "all 0.3s ease",
      }}
    >
      {icon}
    </IconButton>
  );

  const StatCard = ({ value, label, icon }) => (
    <Paper
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        p: 2.5,
        border: "1px solid rgba(200,200,200,0.3)",
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: icon ? 0.5 : 0, mb: 0.5 }}>
        <Typography sx={{ fontSize: "1.3rem", fontWeight: 800, color: "#4EBCFF" }}>{value}</Typography>
        {icon}
      </Box>
      <Typography sx={{ fontSize: "0.85rem", color: "#555" }}>{label}</Typography>
    </Paper>
  );

  return (
    <>
      <Box sx={{ background: "#fff", color: "#1a1a1a", position: "relative", overflow: "hidden", pt: 5, pb: 2 }}>
        {/* Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(78,188,255,0.1)",
            filter: "blur(30px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(200,200,200,0.08)",
            filter: "blur(20px)",
          }}
        />

        <Box sx={{ width: "100%", mx: "auto", px: { xs: 3, md: 4 }, position: "relative", zIndex: 1 }}>
          {/* Main Footer */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: { xs: 3, md: 3 }, mb: 3 }}>
              {/* Brand */}
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    mb: 1.5,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    background: "linear-gradient(135deg, #4EBCFF, #87CEFA)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Archisans
                </Typography>
                <Typography sx={{ fontSize: "0.95rem", color: "#555", mb: 2, lineHeight: 1.4 }}>
                  Kerala's premier platform connecting homeowners with verified professionals for quality construction and home services.
                </Typography>

                {contactInfo.map((item, idx) => (
                  <ContactItem key={idx} icon={item.icon} text={item.text} />
                ))}

                <Box sx={{ display: "flex", gap: 1.5, mt: 1 }}>
                  {socialLinks.map((social, idx) => (
                    <SocialButton key={idx} icon={social.icon} color={social.color} />
                  ))}
                </Box>
              </Box>

              {/* Quick Links */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#4EBCFF", fontSize: "0.95rem" }}>
                  Quick Links
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  {quickLinks.map((link, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleLinkClick(link.path)}
                      sx={{
                        justifyContent: "flex-start",
                        color: "#555",
                        textTransform: "none",
                        fontSize: "0.85rem",
                        px: 0,
                        py: 0.3,
                        background: "transparent",
                        boxShadow: "none",
                        position: "relative",
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          width: 0,
                          height: "2px",
                          bottom: 0,
                          left: 0,
                          backgroundColor: "#4EBCFF",
                          transition: "width 0.3s ease",
                        },
                        "&:hover:after": {
                          width: "100%",
                        },
                        "&:hover": {
                          background: "transparent",
                          color: "#4EBCFF",
                        },
                      }}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Stats */}
              {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#4EBCFF", fontSize: "0.95rem" }}>
                  Trusted Platform
                </Typography>
                {stats.map((stat, idx) => (
                  <StatCard key={idx} value={stat.value} label={stat.label} icon={stat.icon} />
                ))}
              </Box> */}
            </Box>
          </motion.div>

          {/* Bottom Section */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
            <Box
              sx={{
                borderTop: "1px solid rgba(200,200,200,0.3)",
                pt: 1,
                pb: 0.5,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{ color: "#555", fontSize: "0.8rem" }}>
                © {new Date().getFullYear()} Archisans. All rights reserved. Made with ❤️ in Kerala.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                
                <Chip
                  label="✓ Verified Platform"
                  size="small"
                  sx={{ backgroundColor: "rgba(255,255,255,0.6)", color: "#555", border: "1px solid rgba(200,200,200,0.3)", fontSize: "0.75rem" }}
                />
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* Modals */}
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <HelpSupportModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
        <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
};

export default Footer;
