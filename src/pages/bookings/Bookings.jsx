import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobMyBookings from "@/features/Bookings/Mobile/MyBookings";
import MyBookings from "@/features/Bookings/MyBookings";

export default function Bookings() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <MobMyBookings /> : <MyBookings/>}</div>;
}
