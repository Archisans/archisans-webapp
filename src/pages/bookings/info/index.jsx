import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobBookingInfo from "@/features/Bookings/Mobile/mobBookingInfo";

export default function Info() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <MobBookingInfo /> : <MobBookingInfo />}</div>;
}
