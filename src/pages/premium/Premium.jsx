import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobPremium from "@/features/Premium/mobPremium";

export default function Premium() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <MobPremium /> : <MobPremium />}</div>;
}
