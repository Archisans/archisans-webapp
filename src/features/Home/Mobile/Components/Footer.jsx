import React from "react";
import { Box, Grid, Typography, Link, Button, IconButton } from "@mui/material";
import { Phone, Mail, MessageCircle } from "lucide-react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import { useNavigate } from "react-router-dom";
import { RouteProvider } from "@/config/RouteProvider";
import { useUser } from "@/context/UserContext";

export default function Footer() {
  const { isWorker } = useUser();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "#e0e0eca9",
        color: "black",
        mt: 2,
        pt: 2,
        pb: 1.5,
        px: 1.5,
      }}
    >
      <Grid container spacing={1.5}>
        {/* Company Section */}
        <Grid xs={12} sm={6} md={3}>
          <Typography
            fontSize={15}
            sx={{ mb: 1, fontWeight: 600, color: "black" }}
          >
            Company
          </Typography>
          <Box
            sx={{ display: "flex", px: 0.5, flexDirection: "column", gap: 0.5 }}
          >
            <Link href={RouteProvider.USER_TERMS} color="black" underline="hover">
              Terms & Conditions
            </Link>
            <Link
              href={RouteProvider.USER_PRIVACY_POLICY}
              color="black"
              underline="hover"
            >
              Privacy Policy
            </Link>
            <Link href={RouteProvider.USER_ABOUT} color="black" underline="hover">
              About Us
            </Link>
          </Box>
        </Grid>

        {/* Contact Section */}
        <Grid xs={12} sm={6} md={3}>
          <Typography
            fontSize={15}
            sx={{ mb: 1, fontWeight: 600, color: "black" }}
          >
            Contact Us
          </Typography>
          <Box
            sx={{ display: "flex", px: 0.5, flexDirection: "column", gap: 0.5 }}
          >
            <Link
              href="tel:+919876543210"
              color="black"
              underline="none"
              sx={{ display: "flex", alignItems: "center", gap: 0.7 }}
            >
              <Phone size={16} /> +91 9876543210
            </Link>
            <Link
              href="mailto:archisans2025@gmail.com"
              color="black"
              underline="none"
              sx={{ display: "flex", alignItems: "center", gap: 0.7 }}
            >
              <Mail size={16} /> archisans2025@gmail.com
            </Link>
            <Link
              href="https://wa.me/8129509544"
              color="black"
              underline="none"
              sx={{ display: "flex", alignItems: "center", gap: 0.7 }}
            >
              <MessageCircle size={16} /> WhatsApp
            </Link>
          </Box>
        </Grid>

        {/* Register Section */}
        {!isWorker && (
          <Grid xs={12} sm={6} md={3}>
            <Typography
              fontSize={15}
              sx={{ mb: 1, fontWeight: 600, color: "black" }}
            >
              Become a Professional
            </Typography>
            <Typography sx={{ fontSize: 13, mb: 1.5, color: "black" }}>
              Join our platform and expand your business.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate(RouteProvider.WORKER_REGISTER)}
              sx={{
                color: "black",
                borderColor: "black",
                fontSize: 13,
                py: 0.3,
                px: 1.5,
              }}
            >
              Register Now
            </Button>
          </Grid>
        )}
      </Grid>

      {/* Social Media */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 0.5,
          mt: 2,
        }}
      >
        <IconButton href="#" sx={{ color: "black", p: 0.8 }}>
          <FacebookIcon fontSize="small" />
        </IconButton>
        <IconButton href="#" sx={{ color: "black", p: 0.8 }}>
          <TwitterIcon fontSize="small" />
        </IconButton>
        <IconButton href="#" sx={{ color: "black", p: 0.8 }}>
          <InstagramIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Footer Bottom */}
      <Box
        sx={{
          textAlign: "center",
          mt: 1.5,
          fontSize: 11.5,
          color: "black",
          opacity: 0.8,
        }}
      >
        © 2025 Archisans. All rights reserved.
      </Box>
    </Box>
  );
}
