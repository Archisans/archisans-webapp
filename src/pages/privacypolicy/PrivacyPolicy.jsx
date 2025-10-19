import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import PrivacyPolicyMobile from "@/features/Profile/Mobile/PrivacyPolicy";
import { useNavigate } from "react-router-dom";
import PrivacyPolicyModal from "@/components/Desktop/Footer/components/PrivacyPolicy";

export default function PrivacyPolicy() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

    const navigate = useNavigate();
  
    const handleClose = () => {
      navigate(-1);
    };

  return <div>{isMobile ? <PrivacyPolicyMobile /> : <PrivacyPolicyModal open={true} onClose={handleClose}/>}</div>;
}
