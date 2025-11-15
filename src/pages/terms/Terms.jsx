import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import TermsMobile from "@/features/Profile/Mobile/Terms";
import { useNavigate } from "react-router-dom";
import TermsModal from "@/components/Desktop/Footer/Components/TermsModal";

export default function Terms() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  const navigate = useNavigate();
    
      const handleClose = () => {
        navigate(-1);
      };
  return <div>{isMobile ? <TermsMobile /> : <TermsModal open={true} onClose={handleClose}/>}</div>;
}
