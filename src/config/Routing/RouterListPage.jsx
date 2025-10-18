import { Link } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemButton } from "@mui/material";
import { RouteProvider } from "../RouteProvider";

const routes = [
  { path: RouteProvider.SIGN_IN, label: "Signin Page" },
  { path: RouteProvider.USER_PROFILE, label: "Mobile Profile" },
  { path: RouteProvider.USER_BOOKINGS, label: "Mobile Bookings" },
  { path: RouteProvider.USER_BOOKINGS_INFO, label: "Mobile Booking Info" },
  { path: RouteProvider.USER_SERVICES_ALL, label: "Mobile Service Category" },
  { path: RouteProvider.WORKER_HOME, label: "Mobile Worker Page" },
  { path: RouteProvider.USER_SETTINGS, label: "Mobile Settings" },
  {
    path: RouteProvider.USER_SETTINGS_NOTIFICATION,
    label: "Mobile Notifications",
  },
  { path: RouteProvider.USER_HOME, label: "Home" },
  { path: RouteProvider.USER_PROFILE, label: "Profile" },
  { path: RouteProvider.USER_BOOKINGS, label: "Bookings" },
  { path: RouteProvider.USER_PROFILE_EDIT, label: "Edit Info" },
];

function RouteListPage() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        All Routes
      </Typography>
      <List>
        {routes.map((route) => (
          <ListItem key={route.path} disablePadding>
            <ListItemButton component={Link} to={route.path}>
              {route.label}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default RouteListPage;
