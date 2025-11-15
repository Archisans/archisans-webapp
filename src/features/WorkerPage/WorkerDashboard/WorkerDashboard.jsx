import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WorkerHeader from "./Components/WorkerHeader";
import WorkerServices from "./Components/WorkerService";
import WorkerAdvertisment from "./Components/WorkerAdvertisment";

const WorkerDashboard = ({ worker }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        bgcolor: "#f5f6fa",
        p: 3,
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      <Box flex="1 1 600px" minWidth={400}>
        <WorkerHeader navigate={navigate} worker={worker} />

        <WorkerServices professions={worker.professions} />

        <Box mb={4}>
          <WorkerAdvertisment />
        </Box>
      </Box>
    </Box>
  );
};

export default WorkerDashboard;
