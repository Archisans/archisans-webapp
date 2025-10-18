import React from "react";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BREAKPOINTS } from "@/config/breakPoints";
import AccountInfo from "@/features/Profile/Mobile/AccountInfo";
import AccountInfoModal from "@/features/Profile/AccountInfoModal";

export default function Profile() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  if (isMobile) {
    return <AccountInfo />;
  }

  return <AccountInfoModal open={true} onClose={handleClose} />;
}
