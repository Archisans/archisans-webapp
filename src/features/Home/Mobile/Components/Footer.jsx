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
        bgcolor: "neutral.stroke.default",
        mt: 3,
        pt: 4,
        pb: 3,
        px: 2,
      }}
    >
      <Grid container spacing={3}>
        {/* Company Section */}
        <Grid xs={12} sm={6} md={3}>
          <Typography fontSize={15} sx={{ mb: 2, fontWeight: 500, color: "neutral.content.900" }} >
            Company
          </Typography>
          <Box sx={{ display: "flex", px: 1, flexDirection: "column", gap: 1.5}}>
            <Link
              href={RouteProvider.USER_TERMS}
              color="neutral.content.900"
              underline="hover"
            >
            <Typography fontSize={14} sx={{fontWeight: 450, color: "neutral.content.900" }} >
                Terms & Conditions
          </Typography>
              
            </Link>
            <Link
              href={RouteProvider.USER_PRIVACY_POLICY}
              color="neutral.content.900"
              underline="hover"
            >
                          <Typography fontSize={14} sx={{fontWeight: 450, color: "neutral.content.900" }} >
                          Privacy Policy
          </Typography>
              
            </Link>
            <Link
              href={RouteProvider.USER_ABOUT}
              color="neutral.content.900"
              underline="hover"
            >
                                       <Typography fontSize={14} sx={{fontWeight: 450, color: "neutral.content.900" }} >
                                       About Us
          </Typography>
              
              
            </Link>
          </Box>
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            fontSize={15}
            sx={{ mb: 2, fontWeight: 500, color: "neutral.content.900" }}
          >
            Contact Us
          </Typography>
          <Box sx={{ display: "flex", px: 1, flexDirection: "column", gap: 1.5 }}>
            <Link
              href="tel:+919876543210"
              color="neutral.content.900"
              underline="none"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Phone size={16} />
              <Typography fontSize={14} sx={{fontWeight: 450, color: "neutral.content.900" }} >
                                       +91 9876543210
          </Typography>
            </Link>
            <Link
              href="mailto:archisans2025@gmail.com"
              color="neutral.content.900"
              underline="none"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Mail size={16} /> 
              <Typography fontSize={14} sx={{fontWeight: 450, color: "neutral.content.900" }} >
              archisans2025@gmail.com
          </Typography>
              
            </Link>
            <Link
              href="https://wa.me/8129509544"
              color="neutral.content.900"
              underline="none"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <MessageCircle size={16} />
              <Typography fontSize={14} sx={{fontWeight: 450, color: "neutral.content.900" }} >
              WhatsApp
          </Typography>
               
            </Link>
          </Box>
        </Grid>

        {/* Register / Call to Action */}
        {!isWorker && (
          <Grid xs={12} sm={6} md={3}>
            <Typography
              fontSize={15}
              sx={{ mb: 2, fontWeight: 500, color: "neutral.content.900" }}
            >
              Become a Professional
            </Typography>
            <Typography sx={{ fontSize: 13, mb: 3, color: "neutral.content.900" }}>
              Join our platform and expand your business. Register as a
              professional today.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate(RouteProvider.WORKER_REGISTER)}
              sx={{ color: "black", borderColor: "neutral.content.900" }}
            >
              Register Now
            </Button>
          </Grid>
        )}
      </Grid>

      {/* Social Media */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mt: 2}}>
        <IconButton href="#" sx={{ color: "primary.content.dark" }}>
          <FacebookIcon size={16}/>
        </IconButton>
        <IconButton href="#" sx={{ color: "primary.content.dark" }}>
          <TwitterIcon size={16}/>
        </IconButton>
        <IconButton href="#" sx={{ color: "primary.content.dark" }}>
          <InstagramIcon size={16}/>
        </IconButton>
      </Box>

      {/* Footer Bottom */}
      <Box
        sx={{
          textAlign: "center",
          mt: 1.5,
          fontSize: 12,
          color: "neutral.content.900",
          opacity: 0.8,
        }}
      >
        © 2025 Archisans. All rights reserved.
      </Box>
    </Box>
  );
}
