import React from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery, Box, Typography } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import ServicesMobile from "@/features/Services/Mobile/Services";
import { useBootstrapConfiguration } from "@/hooks/useBootstrapConfiguration";
import ServicesModal from "@/features/Home/Components/ServicesModal";
import { useNavigate } from "react-router-dom";

export default function Services() {

  const { bootstrapConfiguration } = useBootstrapConfiguration();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const location = useLocation();
  const navigate = useNavigate();

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


  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div>
      {isMobile ? (
        <ServicesMobile services={services} title={title} />
      ) : (
        <ServicesModal
          open={true}
          onClose={handleClose}
          category={
            slug === "all"
              ? { title: "All Services", services: services }
              : bootstrapConfiguration?.serviceCategories?.find(
                (cat) => cat.slug === slug
              )
          }
        />
      )}
    </div>
  );
}
