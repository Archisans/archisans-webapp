import React from "react";
import { useLocation } from "react-router-dom";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useMediaQuery } from "@mui/material";
import WorkersMobile from "@/features/Workers/Mobile/Workers";

export default function Workers() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const location = useLocation();

  const pathParts = location.pathname.split("/");
  const slug = pathParts[pathParts.length - 1];
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div>
      {isMobile ? (
        <WorkersMobile title={title} />
      ) : (
        <WorkersMobile title={title} />
      )}
    </div>
  );
}
