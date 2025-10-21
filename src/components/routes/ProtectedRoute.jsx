import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";

import SplashScreen from "@/components/SplashScreen";
import LoginModal from "../Desktop/LoginModal";
import LoginDrawer from "../Mobile/LoginDrawer";

export default function ProtectedRoute({ children }) {
  const { isSignedIn, loading } = useUser();
  const location = useLocation();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const [isModalOpen, setModalOpen] = useState(false);

  if (loading) return <SplashScreen />;

  useEffect(() => {
    if (!isSignedIn) setModalOpen(true);
  }, [isSignedIn, location.pathname]);

  const handleClose = () => setModalOpen(false);

  if (isSignedIn) return children;

  return (
    <>
      {isMobile ? (
        <LoginDrawer open={isModalOpen} onClose={handleClose} />
      ) : (
        <LoginModal open={isModalOpen} onClose={handleClose} />
      )}
    </>
  );
}
