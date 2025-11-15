import { Grid, Box, Container, Fab, Zoom } from "@mui/material";
import { useUser } from "@/context/UserContext";
import WorkerServices from "@/features/Worker/components/WorkerServices";
import WorkerReview from "@/features/Worker/components/WorkerReview";
import WorkerJoin from "./components/WorkerJoin";
import WorkerOverview from "@/features/Worker/components/WorkerOverview";
import WorkerBusiness from "@/features/Worker/components/WorkerBusiness";
import WorkerEdit from "./components/WorkerEdit";
import { useWorkerReview } from "@/hooks/useWorkerReview";

const Workerpage = ({ worker }) => {
  const { user, isWorker } = useUser();
  const { addReview } = useWorkerReview(worker.id);

  const handleReviewAdded = async (reviewData) => {
    await addReview(reviewData);
  };

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
              <WorkerOverview 
                worker={worker} 
                userId={user?.id}
                onReviewAdded={handleReviewAdded}
              />
              <WorkerServices services={worker.services} />
              <WorkerReview workerId={worker.id} key={`review-${Date.now()}`} />
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
            {!isWorker && <WorkerJoin />}

            {worker.userId === user?.id && <WorkerEdit />}

            {worker.company && (
              <WorkerBusiness
                company={worker.company}
                location={worker.location}
              />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Workerpage;
