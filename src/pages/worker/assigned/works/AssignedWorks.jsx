import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobMyWorks from "@/features/WorkerPage/Mobile/MyWorks/mobMyWorks";
import DesktopMyWorks from "@/features/WorkerPage/MyWorks/MyWorks";
export default function AssignedWorks() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <MobMyWorks /> : <DesktopMyWorks />}</div>;
}
