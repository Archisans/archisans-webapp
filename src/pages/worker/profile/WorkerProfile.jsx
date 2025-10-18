import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import BasicDetails from "@/features/WorkerPage/Mobile/BasicDetails/BasicDetails";
import BasicDetailsDesktop from "@/features/WorkerPage/BasicDetails/BasicDetails";

export default function WorkerProfile() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <BasicDetails /> : <BasicDetailsDesktop />}</div>;
}
