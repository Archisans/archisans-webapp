import { useState, useEffect } from "react";
import { Grid, Box, Container, Fab, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useUser } from "@/context/UserContext";
import WorkerServices from "@/features/Worker/components/WorkerServices";
import WorkerReview from "@/features/Worker/components/WorkerReview";
import WorkerJoin from "./components/WorkerJoin";
import WorkerOverview from "@/features/Worker/components/WorkerOverview";
import WorkerBusiness from "@/features/Worker/components/WorkerBusiness";
import WorkerEdit from "./components/WorkerEdit";
import WorkerAvailability from "./components/WorkerAvailability";
import MoreWorkers from "./components/MoreWorkers";
import WorkerAds from "./components/WorkerAds";

const Workerpage = ({ worker }) => {
  const { isWorker } = useUser();
  const [showScroll, setShowScroll] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh", width: "100%" }}>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          px: { xs: 2, sm: 3, md: 6, lg: 10 },
          py: 3,
          width: "100%",
        }}
      >
       <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "flex-start",
    gap: 3,
    width: "100%",
  }}
>
  {/* MAIN CONTENT - takes 2/3 width */}
  <Box
    sx={{
      flexBasis: { xs: "100%", md: "66.67%" },
      flexGrow: 0,
      flexShrink: 0,
    }}
  >
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <WorkerOverview worker={worker} />
      <WorkerServices services={worker.services} />
      <WorkerReview />
    </Box>
  </Box>

  {/* SIDEBAR - takes remaining 1/3 width */}
  <Box
    sx={{
      flexBasis: { xs: "100%", md: "33.33%" },
      flexGrow: 0,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      gap: 3,
    }}
  >
    {!isWorker ? <WorkerJoin /> : <WorkerEdit />}
    {<WorkerBusiness company={worker.company} location={worker.location} />}
    <WorkerAds/>
    <MoreWorkers/>
  </Box>
</Box>

      </Container>

      {/* <Zoom in={showScroll}>
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
      </Zoom> */}
    </Box>
  );
};

export default Workerpage;
