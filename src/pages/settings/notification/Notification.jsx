import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobNotifications from "@/features/NotificationPage/Mobile/mobNotifications";
import Notifications from "@/features/NotificationPage/Notifications";

export default function Notification() {
  console.log("hello I am in notification")
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <MobNotifications /> : <Notifications />}</div>;
}
