import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RouteProvider } from "@/config/RouteProvider";
import { PopularServicesSection } from "../Constants/PopularServicesSection";

export default function PopularServices({ name }) {
  const navigate = useNavigate();

  // convert prop name to lowercase and fetch corresponding list
  const key = name?.toLowerCase?.() || "";
  const filteredServices = Array.isArray(PopularServicesSection[key])
    ? PopularServicesSection[key]
    : [];

  return (
    <Grid>
      <Box sx={{ mt: 1.2, pt: 1, pb: 0 }}>
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 600,
            mt: 1,
            mb: 2.5,
            px: 1.5,
            color: "primary.content.dark",
          }}
        >
          Popular {name} Services
        </Typography>

        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            px: 1.5,
            gap: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {filteredServices.map((service) => (
            <Box
              key={service.name}
              onClick={() =>
                navigate(service.link || RouteProvider.USER_WORKER_SEARCH)
              }
              sx={{
                flex: "0 0 auto",
                width: 150,
                cursor: "pointer",
              }}
            >
              {/* Image (acts as card) */}
              <Box
                component="img"
                src={service.icon}
                alt={service.name}
                sx={{
                  width: "90%",
                  height: 120,
                  borderRadius: 0.5,
                  objectFit: "cover",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  mb: 0.8,
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              />

              {/* Name (below image) */}
              <Typography
                sx={{
                  ml: 0.5,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: "neutral.content.900",
                  textAlign: "left",
                  lineHeight: 1.3,
                }}
              >
                {service.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Grid>
  );
}
