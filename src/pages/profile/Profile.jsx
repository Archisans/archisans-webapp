import React from "react";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { BREAKPOINTS } from "@/config/breakPoints";
import AccountInfo from "@/features/Profile/Mobile/AccountInfo";
import AccountInfoModal from "@/features/Profile/AccountInfoModal";

export default function Profile() {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message || null;

  const handleClose = () => {
    navigate(-1);
  };

  if (isMobile) {
    return <AccountInfo message={message} />;
  }

  return (
    <AccountInfoModal open={true} onClose={handleClose} message={message} />
  );
}
