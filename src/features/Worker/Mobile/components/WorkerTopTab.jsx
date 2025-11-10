import { useState } from "react";
import { Box, Tabs, Tab, } from "@mui/material";
import MobWorkerServices from "@/features/Worker/Mobile/components/WorkerServices";
import MobWorkerBusiness from "@/features/Worker/Mobile/components/WorkerBusiness";
import MobWorkerReview from "@/features/Worker/Mobile/components/WorkerReview";
import MobWorkerAbout from "@/features/Worker/Mobile/components/WorkerAbout";

const MobWorkerTopTab = ({ worker }) => {
  const [value, setValue] = useState(0);
  const hasCompany = Boolean(worker?.company);
  const hasAbout = Boolean(worker?.about && worker.about.trim() !== "");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: "Services",
      component: <MobWorkerServices services={worker.services} />,
    },
    ...(hasCompany
      ? [
          {
            label: "Business",
            component: <MobWorkerBusiness company={worker.company} />,
          },
        ]
      : []),
    {
      label: "Reviews",
      component: <MobWorkerReview reviews={worker.reviews} />,
    },
    ...(hasAbout
      ? [{ label: "About", component: <MobWorkerAbout about={worker.about} /> }]
      : []),
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "10vh", 
      }}
    >
      {/* Tabs Header */}
      <Box
        sx={{
          borderBottom: "1px solid #e0e0e0",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#fff", // ensures content under doesn't overlap
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          TabIndicatorProps={{
            sx: {
              height: 3,
              borderRadius: 2,
              bottom: 0,
            },
          }}
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
            },
            minHeight: 48,
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              sx={{
                fontWeight: 550,
                fontSize: 13,
                textTransform: "none",
                minWidth: "auto",
                px: 3,
                py: 1,
                color: "#333",
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ flexGrow: 1, minHeight: "50vh", mt: 1 }}>
        {tabs[value]?.component}
      </Box>
    </Box>
  );
};

export default MobWorkerTopTab;
