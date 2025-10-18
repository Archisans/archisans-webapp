import React, { useState } from "react";
import { Box, Card, Typography, Badge, Stack } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import DesktopJobOffers from "./JobOffers";
import DesktopActiveJobs from "./ActiveJobs";
import DesktopCompletedJobs from "./CompletedJobs";

const MyWorkTopBar = () => {
  const [selected, setSelected] = useState("Job Offers"); // initially Job Offers

  const workStatuses = [
    { name: "Job Offers", count: 5, icon: <WorkOutlineIcon fontSize="small" /> },
    { name: "Active Works", count: 12, icon: <CheckCircleOutlineIcon fontSize="small" /> },
    { name: "Completed", count: 32, icon: <DoneAllIcon fontSize="small" /> },
  ];

  const renderContent = () => {
    switch (selected) {
      case "Job Offers":
        return <DesktopJobOffers />;
      case "Active Works":
        return <DesktopActiveJobs />;
      case "Completed":
        return <DesktopCompletedJobs />;
      default:
        return <div>No Content</div>;
    }
  };

  return (
    <Box>
      {/* Top Tab Bar */}
      <Card
        sx={{
          display: "flex",
          justifyContent:"space-evenly",
          alignItems: "center",
          mt:2,
          mx:5,
          gap: 4,
          py: 1.5,
          borderRadius: 1,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          mb: 3,
          bgcolor: "#ececf0ff",
        }}
      >
        {workStatuses.map((status) => {
          const isActive = selected === status.name;
          return (
            <Box
              key={status.name}
              onClick={() => setSelected(status.name)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                px: 5,
                py: 1,
                borderRadius: 2,
                bgcolor: isActive ? "#EAF3FF" : "transparent",
                color: isActive ? "#1976d2" : "text.primary",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#f9f9f9",
                },
              }}
            >
              {status.icon}
              <Typography fontWeight={600} fontSize="1.1rem" mr ={2}>
                {status.name}
              </Typography>
              <Badge
                badgeContent={status.count}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 12,
                    height: 20,
                    minWidth: 20,
                  },
                }}
              />
            </Box>
          );
        })}
      </Card>

      {/* Content */}
      <Box>{renderContent()}</Box>
    </Box>
  );
};

export default MyWorkTopBar;
