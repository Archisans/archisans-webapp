import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobHelpSupportChat from "@/features/Profile/Mobile/mobHelpSupport/mobHelpSupportChat";
4;
export default function ChatSupport() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return (
    <div>{isMobile ? <MobHelpSupportChat /> : <MobHelpSupportChat />}</div>
  );
}
