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
        mt: 3,
        pt: 4,
        pb: 3,
        px: 2,
      }}
    >
      <Grid container spacing={3}>
        {/* Company Section */}
        <Grid xs={12} sm={6} md={3}>
          <Typography
            fontSize={16}
            sx={{ mb: 2, fontWeight: 500, color: "black" }}
          >
            Company
          </Typography>
          <Box sx={{ display: "flex", px: 1, flexDirection: "column", gap: 1.5}}>
            <Link
              href={RouteProvider.USER_TERMS}
              color="black"
              underline="hover"
            >
              Terms & Conditions
            </Link>
            <Link
              href={RouteProvider.USER_PRIVACY_POLICY}
              color="black"
              underline="hover"
            >
              Privacy Policy
            </Link>
            <Link
              href={RouteProvider.USER_ABOUT}
              color="black"
              underline="hover"
            >
              About Us
            </Link>
          </Box>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            fontSize={16}
            sx={{ mb: 2, fontWeight: 500, color: "black" }}
          >
            Contact Us
          </Typography>
          <Box sx={{ display: "flex", px: 1, flexDirection: "column", gap: 1.5 }}>
            <Link
              href="tel:+919876543210"
              color="black"
              underline="none"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Phone size={18} /> +91 9876543210
            </Link>
            <Link
              href="mailto:archisans2025@gmail.com"
              color="black"
              underline="none"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Mail size={18} /> archisans2025@gmail.com
            </Link>
            <Link
              href="https://wa.me/8129509544"
              color="black"
              underline="none"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <MessageCircle size={18} /> WhatsApp
            </Link>
          </Box>
        </Grid>

        {/* Register / Call to Action */}
        {!isWorker && (
          <Grid xs={12} sm={6} md={3}>
            <Typography
              fontSize={16}
              sx={{ mb: 2, fontWeight: 500, color: "black" }}
            >
              Become a Professional
            </Typography>
            <Typography sx={{ fontSize: 14, mb: 3, color: "black" }}>
              Join our platform and expand your business. Register as a
              professional today.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate(RouteProvider.WORKER_REGISTER)}
              sx={{ color: "black", borderColor: "black" }}
            >
              Register Now
            </Button>
          </Grid>
        )}
      </Grid>

      {/* Social Media */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mt: 2}}>
        <IconButton href="#" sx={{ color: "black" }}>
          <FacebookIcon />
        </IconButton>
        <IconButton href="#" sx={{ color: "black" }}>
          <TwitterIcon />
        </IconButton>
        <IconButton href="#" sx={{ color: "black" }}>
          <InstagramIcon />
        </IconButton>
      </Box>

      {/* Footer Bottom */}
      <Box
        sx={{
          textAlign: "center",
          mt: 2,
          fontSize: 12,
          color: "black",
          opacity: 0.8,
        }}
      >
        © 2025 Archisans. All rights reserved.
      </Box>
    </Box>
  );
}
