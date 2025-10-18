import React from "react";
import { Box, Divider, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RouteProvider } from "@/config/RouteProvider";

import WorkerHeader from "./components/WorkerHeader";
import WorkerStats from "./components/WorkerStats";
import WorkerServices from "./components/WorkerService";
import WorkerAdvertisment from "./components/WorkerAdvertisment";
import NewRequestsPanel from "./components/NewRequest";

const WorkerDashBoard = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        bgcolor: "#f5f6fa",
        p: 3,
        gap: 3, // spacing between left and right panels
        flexWrap: "wrap", // allows responsive shrinking
      }}
    >
      {/* LEFT SIDE */}
      <Box
        flex="1 1 600px" // allow flex shrinking
        minWidth={400} // don't shrink too much
      >
        <WorkerHeader navigate={navigate} />
        <Divider sx={{ mb: 5 }} />
        <WorkerStats />
        <WorkerServices />
        <Box mb={4}>
          <WorkerAdvertisment />
        </Box>
      </Box>

      {/* RIGHT SIDE: New Requests */}
      <Box
        flex="0 1 320px" // shrinkable right panel
        minWidth={280} // don't shrink too much
      >
        <NewRequestsPanel />
      </Box>
    </Box>
  );
};

export default WorkerDashBoard;
