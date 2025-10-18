import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobHelpSupport from "@/features/Profile/Mobile/mobHelpSupport/mobHelpSupport";

export default function Support() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <MobHelpSupport /> : <MobHelpSupport />}</div>;
}
