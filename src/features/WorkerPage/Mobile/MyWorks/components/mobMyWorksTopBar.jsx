import { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

import MobJobOffers from "./mobJobOffers";
import MobActivejobs from "./mobActivejobs";
import MobCompletedJobs from "./mobCompletedJobs";

const MobMyWorksTopBar = () => {
  const [value, setValue] = useState("0");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      {/* Tabs */}
      <Box
        sx={{
          position: "fixed",
          zIndex: 1000,
          width: "100%",
          backgroundColor: "#fff",
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="worker tabs"
        >
          <Tab value="0" label="Job Offers" sx={{ fontSize: "15px" }} />
          <Tab value="1" label="Active" sx={{ fontSize: "15px" }} />
          <Tab value="2" label="Completed" sx={{ fontSize: "15px" }} />
        </Tabs>
      </Box>

      <Box sx={{ paddingTop: "55px", paddingBottom: "10px" }}>
        <TabPanel value="0" sx={{ p: 0 }}>
          <MobJobOffers />
        </TabPanel>
        <TabPanel value="1" sx={{ p: 0 }}>
          <MobActivejobs />
        </TabPanel>
        <TabPanel value="2" sx={{ p: 0 }}>
          <MobCompletedJobs />
        </TabPanel>
      </Box>
    </TabContext>
  );
};

export default MobMyWorksTopBar;
