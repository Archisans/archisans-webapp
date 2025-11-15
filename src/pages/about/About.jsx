import React from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import AboutMobile from "@/features/Profile/Mobile/About";
import { useNavigate } from "react-router-dom";
import AboutModal from "@/components/Desktop/Footer/Components/About";

export default function About() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  const navigate = useNavigate();
    
      const handleClose = () => {
        navigate(-1);
      };
  return <div>{isMobile ? <AboutMobile /> : <AboutModal open={true} onClose={handleClose}/>}</div>;
}
