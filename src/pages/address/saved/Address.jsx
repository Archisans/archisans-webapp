import React from "react";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useMediaQuery } from "@mui/material";
import MobSavedAddress from "@/features/Profile/Mobile/mobSavedAdderess";

export default function SavedAddress() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <MobSavedAddress /> : <MobSavedAddress />}</div>;
}
