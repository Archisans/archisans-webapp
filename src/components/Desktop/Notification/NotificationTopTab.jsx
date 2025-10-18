// DesktopNotificationTabs.jsx
import { useState } from "react";
import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import NotificationList from "./NotificationList";
import {
  allNotifications,
  bookingNotifications,
  systemNotifications,
} from "./NotificationData";

const NotificationTabs = () => {
  const [value, setValue] = useState("0");
  const theme = useTheme();

  const tabData = [
    { value: "0", label: "All Notifications", data: allNotifications },
    { value: "1", label: "Bookings", data: bookingNotifications },
    { value: "2", label: "System", data: systemNotifications },
  ];

  return (
    <TabContext value={value}>
      <Box sx={{ display: "flex", height: "80vh", width: "100%", bgcolor: "#f7f7f7" }}>
        {/* Sidebar Tabs */}
        <Box
          sx={{
            width: "220px",
            borderRight: "1px solid #e0e0e0",
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          

          <Tabs
            orientation="vertical"
            value={value}
            onChange={(e, nv) => setValue(nv)}
            sx={{
              flex: 1,
              "& .MuiTab-root": {
                alignItems: "flex-start",
                textTransform: "none",
                fontSize: "0.95rem",
                px: 2,
              },
              "& .Mui-selected": {
                fontWeight: 600,
                color: theme.palette.primary.main,
              },
            }}
          >
            {tabData.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>
        </Box>

        {/* Notification List Panel */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {tabData.map((tab) => (
            <TabPanel
              key={tab.value}
              value={tab.value}
              sx={{
                p: 0,
                mt: 0,
                "&.MuiTabPanel-root": {
                  padding: 0,
                  margin: 0,
                  minHeight: "0 !important",
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            >
              {tab.data.length === 0 ? (
                <Box sx={{ p: 3 }}>
                  <Typography sx={{ color: "grey.600" }}>No notifications</Typography>
                </Box>
              ) : (
                tab.data.map((notif, i) => (
                  <NotificationList
                    key={i}
                    img={notif.img(theme)}
                    heading={notif.heading}
                    subheading={notif.subheading}
                    datetime={notif.datetime}
                  />
                ))
              )}
            </TabPanel>
          ))}
        </Box>
      </Box>
    </TabContext>
  );
};

export default NotificationTabs;
