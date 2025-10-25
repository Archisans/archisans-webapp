import { Grid, Box, Container, Fab, Zoom, Fade, Alert } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import TopBar from "@/components/Desktop/TopBar";
import UserSpecificBooking from "@/features/Bookings/UserSpecificBookingModal";
import WorkerServices from "@/features/Worker/components/WorkerServices";
import WorkerPortFolio from "@/features/Worker/components/WorkerPortFolio";
import WorkerReview from "@/features/Worker/components/WorkerReview";
import MoreWorkers from "@/features/Worker/components/MoreWorkers";
import WorkerJoin from "./components/WorkerJoin";
import WorkerOverview from "@/features/Worker/components/WorkerOverview";
import WorkerBusiness from "@/features/Worker/components/WorkerBusiness";
import AlertMessage from "@/components/Desktop/BookingAlert";

import { WORKERS_RAW } from "../SearchWorker/constants";

const Workerpage = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  //const { selectedService = "", worker: selectedWorker } = location.state || {};
  const { selectedService = "", workerId, slug = "" } = location.state || {};

  // Find worker by id
  const selectedWorker = WORKERS_RAW.find((w) => w.id === workerId);

  const filteredServices = selectedWorker.services.filter((service) =>
    service.title.toLowerCase().includes(slug.toLowerCase().replace(/-/g, " "))
  );

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
                <Box
                  sx={{
                    flex: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <WorkerOverview
                    worker={selectedWorker}
                    setOpen={setOpen}
                    scrollToSectionRefs={{
                      aboutRef,
                      servicesRef,
                      portfolioRef,
                      reviewsRef,
                    }}
                  />
                  <Box ref={servicesRef}>
                    <WorkerServices
                      worker={{ ...selectedWorker, services: filteredServices }}
                      setIsAlert={setIsAlert}
                      selectedService={selectedService}
                    />
                  </Box>
                  <Box ref={portfolioRef}>
                    <WorkerPortFolio worker={selectedWorker} />
                  </Box>
                  <Box ref={reviewsRef}>
                    <WorkerReview worker={selectedWorker} />
                  </Box>
                </Box>

                {/* Right 1/3: Sidebar */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <WorkerJoin worker={selectedWorker} />
                  <WorkerBusiness worker={selectedWorker} />
                  <MoreWorkers worker={selectedWorker} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <AlertMessage isAlert={isAlert} />
      <UserSpecificBooking
        open={open}
        setIsAlert={setIsAlert}
        setOpen={setOpen}
      />

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
