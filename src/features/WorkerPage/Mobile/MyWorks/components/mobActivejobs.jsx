import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyWorksCard from "@/features/WorkerPage/Mobile/MyWorks/components/MyWorksCard";
import { JOBS_ACTIVE } from "./constants";
import { RouteProvider } from "@/config/RouteProvider";

const MobActiveJobs = () => {
  const navigate = useNavigate();

  const handleCardClick = (job) => {
    navigate(RouteProvider.WORKER_WORK_INFO, { state: { job } });
  };

  const handleCancel = (idx) => {
    console.log("Cancel clicked", idx);
    // Optional: open confirmation modal or update job status
  };

  const handleComplete = (idx) => {
    console.log("Complete clicked", idx);
    // Optional: trigger completion modal or backend update
  };

  return (
    <Box mt={2} px={2} mb={4}>
      {JOBS_ACTIVE.map((job, idx) => (
        <MyWorksCard
          key={job.id}
          {...job}
          showActions={true}
          onCancel={() => handleCancel(idx)}
          onComplete={() => handleComplete(idx)}
          onClick={() => handleCardClick(job)} 
        />
      ))}
    </Box>
  );
};

export default MobActiveJobs;
