import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useUser } from "@/context/UserContext";
import WorkerServices from "@/features/Worker/components/WorkerServices";
import WorkerReview from "@/features/Worker/components/WorkerReview";
import WorkerJoin from "./components/WorkerJoin";
import WorkerOverview from "@/features/Worker/components/WorkerOverview";
import WorkerBusiness from "@/features/Worker/components/WorkerBusiness";
import WorkerEdit from "./components/WorkerEdit";
import MoreWorkers from "./components/MoreWorkers";
import WorkerAds from "./components/WorkerAds";
import WorkerPortFolio from "./components/WorkerPortFolio";
import WorkerBannerAds from "./components/WorkerBannerAds";
import { More } from "@mui/icons-material";

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
        sx={{ px: { xs: 2, sm: 3, md: 6, lg: 10 }, py: 3, width: "100%" }}
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
              <WorkerPortFolio />
              <WorkerReview />
            </Box>
          </Box>

          {/* SIDEBAR - 1/3 width */}
          {/* SIDEBAR - 1/3 width */}
{/* SIDEBAR - 1/3 width */}
<Box
  sx={{
    flexBasis: { xs: "100%", md: "33.33%" },
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: "flex-start",
    position: "relative", // important for sticky to reference
    pb: 20, // bottom padding = approximate sticky element height
  }}
>
  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
    <WorkerAds />
    {!isWorker ? <WorkerJoin /> : <WorkerEdit />}
    <WorkerBusiness company={worker.company} location={worker.location} />

    {/* Sticky Banner Ads */}
    <Box sx={{ position: "sticky", top: 16 }}>
      <WorkerBannerAds />
    </Box>
  </Box>
</Box>


        </Box>
      </Container>
    </Box>
  );
};

export default Workerpage;
