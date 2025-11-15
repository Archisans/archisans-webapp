import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import MobWorkerServices from "@/features/Worker/Mobile/Components/WorkerServices";
import MobWorkerBusiness from "@/features/Worker/Mobile/Components/WorkerBusiness";
import WorkerReview from "@/features/Worker/Mobile/Components/WorkerReview";
import MobWorkerAbout from "@/features/Worker/Mobile/Components/WorkerAbout";
import WorkerSocialMediaLinks from "./WorkerSocialMediaLinks";

const MobWorkerTopTab = ({ worker }) => {
  const [value, setValue] = useState(0);
  const hasCompany = Boolean(worker?.company);
  const hasAbout = Boolean(worker?.about && worker.about.trim() !== "");
  const hasSocial = Boolean(worker?.social.length > 0);

  console.log(hasSocial, worker.social);

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
      component: <WorkerReview workerId={worker.id} />,
    },
    ...(hasSocial
      ? [
          {
            label: "Social",
            component: <WorkerSocialMediaLinks social={worker.social} />,
          },
        ]
      : []),
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
          backgroundColor: "#fff",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          scrollButtons="auto"
          allowScrollButtonsMobile
          textColor="primary"
          indicatorColor="primary"
          TabIndicatorProps={{
            sx: {
              height: 3,
              borderRadius: 2,
              bottom: 0,
            },
          }}
          variant={tabs.length > 4 ? "scrollable" : "standard"}
          sx={{
            minHeight: 48,
            "& .MuiTabScrollButton-root": {
              width: 30,
            },
            "& .MuiTabs-flexContainer": {
              justifyContent: tabs.length > 4 ? "flex-start" : "center",
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              sx={{
                fontWeight: 550,
                fontSize: 14,
                textTransform: "none",
                minWidth: "auto",
                px: 2,
                py: 1,
                color: value === index ? "#0b134a" : "#666",
                flexShrink: 0,
                "&.Mui-selected": {
                  color: "#0b134a",
                  fontWeight: 600,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ flexGrow: 1, minHeight: "50vh", mt: 1, px: 1 }}>
        {tabs[value]?.component}
      </Box>
    </Box>
  );
};

export default MobWorkerTopTab;
