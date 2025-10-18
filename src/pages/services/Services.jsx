import React from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery, Box, Typography } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import ServicesMobile from "@/features/Services/Mobile/Services";
import { useBootstrapConfiguration } from "@/hooks/useBootstrapConfiguration";

export default function Services() {
  const { bootstrapConfiguration } = useBootstrapConfiguration();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const location = useLocation();

  const pathParts = location.pathname.split("/");
  const slug = pathParts[pathParts.length - 1];

  let services = [];
  let title = "";

  if (slug === "all") {
    services =
      bootstrapConfiguration?.serviceCategories?.flatMap(
        (cat) => cat.services
      ) || [];
    title = "All Services";
  } else {
    const category = bootstrapConfiguration?.serviceCategories?.find(
      (cat) => cat.slug === slug
    );

    if (!category) {
      return (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">
            Sorry, this category does not exist.
          </Typography>
        </Box>
      );
    }

    services = category.services || [];
    title = category.title || "Category Not Found";
  }

  return (
    <div>
      {isMobile ? (
        <ServicesMobile services={services} title={title} />
      ) : (
        <ServicesMobile services={services} title={title} />
      )}
    </div>
  );
}
