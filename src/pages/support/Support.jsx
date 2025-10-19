import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobHelpSupport from "@/features/Profile/Mobile/mobHelpSupport/mobHelpSupport";
import HelpSupportModal from "@/components/Desktop/Footer/components/Help&Support";
import { useNavigate } from "react-router-dom";

export default function Support() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return <div>{isMobile ? <MobHelpSupport /> : <HelpSupportModal  open={true} onClose={handleClose} />}</div>;
}
