import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import TermsMobile from "@/features/Profile/Mobile/Terms";

export default function Terms() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <TermsMobile /> : <TermsMobile />}</div>;
}
