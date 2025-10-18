import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import PrivacyPolicyMobile from "@/features/Profile/Mobile/PrivacyPolicy";

export default function PrivacyPolicy() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return <div>{isMobile ? <PrivacyPolicyMobile /> : <PrivacyPolicyMobile />}</div>;
}
