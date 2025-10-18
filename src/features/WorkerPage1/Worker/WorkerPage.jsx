import {
  Grid,
  Box,
  Container,
  Fab,
  Zoom,
  Fade,
  Alert,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import TopBar from "@/components/Desktop/TopBar";
import UserSpecificBooking from "@/features/Bookings/UserSpecificBookingModal";
import WorkerServices from "@/features/WorkerPage1/Worker/components/WorkerServices";
import WorkerPortFolio from "@/features/WorkerPage1/Worker/components/WorkerPortFolio";
import WorkerReview from "@/features/WorkerPage1/Worker/components/WorkerReview";
import MoreWorkers from "@/features/WorkerPage1/Worker/components/MoreWorkers";
import WorkerJoin from "./components/WorkerJoin";
import WorkerOverview from "@/features/WorkerPage1/Worker/components/WorkerOverview";
import WorkerBusiness from "@/features/WorkerPage1/Worker/components/WorkerBusiness";
import AlertMessage from "@/components/Desktop/BookingAlert";

const Workerpage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const { selectedService = "" } = location.state || {};

  // refs for sections
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const reviewsRef = useRef(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      <Container maxWidth="100%" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", gap: 3 }}>
                {/* Left 2/3: Main Content */}
                <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 3 }}>
                  <WorkerOverview
                    setOpen={setOpen}
                    scrollToSectionRefs={{ aboutRef, servicesRef, portfolioRef, reviewsRef }}
                  />
                  <Box ref={servicesRef}>
                    <WorkerServices setIsAlert={setIsAlert} selectedService={selectedService} />
                  </Box>
                  <Box ref={portfolioRef}>
                    <WorkerPortFolio />
                  </Box>
                  <Box ref={reviewsRef}>
                    <WorkerReview />
                  </Box>
                </Box>

                {/* Right 1/3: Sidebar */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                  <WorkerJoin />
                  <WorkerBusiness />
                  <MoreWorkers />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <AlertMessage isAlert={isAlert} />
      <UserSpecificBooking open={open} setIsAlert={setIsAlert} setOpen={setOpen} />

      <Zoom in={showScroll}>
        <Fab
          size="small"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            bgcolor: "rgba(25, 118, 210, 0.7)",
            color: "white",
            backdropFilter: "blur(6px)",
            "&:hover": { bgcolor: "rgba(25,118,210,0.9)" },
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default Workerpage;
