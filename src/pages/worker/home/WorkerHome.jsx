import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import WorkerMainPage from "@/features/WorkerPage/Mobile/WorkerMainPage/workerMainPage";
import WorkerDashBoard from "@/features/WorkerPage/WorkerDashBoard/WorkerDashBoard";

export default function WorkerHome() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <WorkerMainPage /> : <WorkerDashBoard />}</div>;
}
