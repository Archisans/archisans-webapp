import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobSettings from "@/features/Settings/mobSettings";

export default function Settings() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <MobSettings /> : <MobSettings />}</div>;
}
