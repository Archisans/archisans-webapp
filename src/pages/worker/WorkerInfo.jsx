import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobWorkerpage from "@/features/WorkerPage1/Worker/Mobile/Workerpage";
import DesktopWorkerPage from "@/features/WorkerPage1/Worker/WorkerPage";

export default function WorkerInfo() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <MobWorkerpage /> : <DesktopWorkerPage />}</div>;
}
