import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyWorksCard from "@/features/WorkerPage/Mobile/MyWorks/components/MyWorksCard";
import { JOBS_COMPLETED } from "./constants";
import { RouteProvider } from "@/config/RouteProvider";

const MobCompletedJobs = () => {
  const navigate = useNavigate();

  const handleCardClick = (job) => {
    navigate(RouteProvider.WORKER_WORK_INFO, { state: { job } });
  };

  return (
    <Box mt={2} px={2} mb={4}>
      {JOBS_COMPLETED.map((job) => (
        <MyWorksCard
          key={job.id}
          {...job}
          onClick={() => handleCardClick(job)}
        />
      ))}
    </Box>
  );
};

export default MobCompletedJobs;
