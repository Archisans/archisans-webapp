import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import Portfolio from "@/features/WorkerPage/Mobile/Portfolio/Portfolio";
import PortfolioDesktop from "@/features/WorkerPage/Portfolio/Portfolio";
export default function WorkerPortfolio() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <Portfolio /> : <PortfolioDesktop />}</div>;
}
