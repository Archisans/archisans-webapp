import React, { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobBookingInfo from "@/features/Bookings/Mobile/mobBookingInfo";
import { useNavigate } from "react-router-dom";

export default function Info() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  // Auto-navigate back on desktop
  useEffect(() => {
    if (!isMobile) {
      navigate(-1);
    }
  }, [isMobile, navigate]);

  if (isMobile) {
    return <MobBookingInfo />;
  }

  
  return null;
}
