import { useState, useEffect } from "react";
import { Grid, Box, Container, Fab, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useUser } from "@/context/UserContext";
import WorkerServices from "@/features/Worker/components/WorkerServices";
import WorkerReview from "@/features/Worker/components/WorkerReview";
import WorkerJoin from "./components/WorkerJoin";
import WorkerOverview from "@/features/Worker/components/WorkerOverview";
import WorkerBusiness from "@/features/Worker/components/WorkerBusiness";

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
        <Grid container spacing={3}>
          {/* MAIN CONTENT */}
          <Grid item xs={12} md={8} lg={9}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <WorkerOverview worker={worker} />

              <WorkerServices services={worker.services} />

              <WorkerReview />
            </Box>
          </Grid>

          {/* SIDEBAR */}
          <Grid item xs={12} md={4} lg={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {!isWorker && <WorkerJoin />}
              {worker.company && <WorkerBusiness company={worker.company} />}
            </Box>
          </Grid>
        </Grid>
      </Container>

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
