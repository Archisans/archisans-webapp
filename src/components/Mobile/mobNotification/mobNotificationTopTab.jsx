// MobNotificationTopTab.jsx
import { useState } from "react";
import { Box, Tab, Tabs, Grid, useTheme } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

import MobNotificationList from "./mobNotificationList";
import {
  allNotifications,
  bookingNotifications,
  systemNotifications,
} from "./mobNotificationData";

const MobNotificationTopTab = () => {
  const [value, setValue] = useState("0");
  const theme = useTheme();

  const tabData = [
    { value: "0", label: "All", data: allNotifications },
    { value: "1", label: "Bookings", data: bookingNotifications },
    { value: "2", label: "System", data: systemNotifications },
  ];

  return (
    <TabContext value={value}>
      <Grid container>
        {/* Tabs */}
        <Box
          sx={{
            mt: -1,
            pt: 0.9,
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
          <Tabs value={value} onChange={(e, nv) => setValue(nv)} aria-label="notification tabs">
            {tabData.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                sx={{ color: "#777777", fontSize: "1rem", textTransform: "none", mr: 3 }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Panels */}
        <Grid sx={{ mt: 6, width: "100%" }}>
          {tabData.map((tab) => (
            <TabPanel key={tab.value} value={tab.value} sx={{ p: 0 }}>
              <Box sx={{ mt: 3, mb: 10, px: 0, width: "100%" }}>
                {tab.data.map((notif, i) => (
                  <MobNotificationList
                    key={i}
                    img={notif.img(theme)}
                    heading={notif.heading}
                    subheading={notif.subheading}
                    datetime={notif.datetime}
                  />
                ))}
              </Box>
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </TabContext>
  );
};

export default MobNotificationTopTab;
