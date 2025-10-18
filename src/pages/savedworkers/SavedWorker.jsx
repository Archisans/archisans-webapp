import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobileSavedWorkers from "@/features/SavedWorkers/Mobile/SavedWorkers";
import DesktopSavedWorker from "@/features/SavedWorkers/SavedWorkers";

export default function SavedWorker() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <MobileSavedWorkers /> : <DesktopSavedWorker />}</div>;
}
