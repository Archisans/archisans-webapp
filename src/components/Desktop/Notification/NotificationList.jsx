// DesktopNotificationList.jsx
import { Box, List, ListItem, ListItemAvatar, Avatar, Typography } from "@mui/material";

const NotificationList = ({ img, heading, subheading, datetime }) => (
  <Box>
    <List disablePadding>
      <ListItem
        sx={{
          width: "100%",
          borderBottom: "1px solid #e0e0e0",
          py: 1,
          px: 3,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ width: 40, height: 40, bgcolor: "transparent" }}>{img}</Avatar>
        </ListItemAvatar>
        <Box sx={{ flex: 1, ml: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontSize: "15px", fontWeight: "600" }}>{heading}</Typography>
            <Typography variant="caption" sx={{ color: "grey.600", fontSize: "12px" }}>
              {datetime}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "grey.700", fontSize: "13px", mt: 0.5 }}>
            {subheading}
          </Typography>
        </Box>
      </ListItem>
    </List>
  </Box>
);

export default NotificationList;


