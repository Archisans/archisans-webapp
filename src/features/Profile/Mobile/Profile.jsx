import React, { useState } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GavelIcon from "@mui/icons-material/Gavel";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginDrawer from "@/components/Mobile/LoginDrawer";
import { RouteProvider } from "@/config/RouteProvider";
import { useUser } from "@clerk/clerk-react";
import LogoutPopup from "@/components/LogoutModal";

const Profile = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#ffffffff" }}>
      <Grid container direction="column" sx={{ color: "#0b134a" }}>
        <Grid container>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px:1,
                mb:2
              }}
            >
              {/* Avatar */}
              <Avatar
                src={user?.imageUrl}
                alt={user?.fullName}
                sx={{ width: 80, height: 80 }}
              />

              {/* User Info */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#0b134a",
                    mb: 0.5,
                  }}
                >
                  {user?.fullName || "Full Name"}
                </Typography>

                {user?.email && (
                  <Typography
                    sx={{ fontSize: 14, color: "#4b4b6b", mb: 0.5 }}
                  >
                    {user.email}
                  </Typography>
                )}

                {user?.primaryPhoneNumber?.phoneNumber && (
                  <Typography sx={{ fontSize: 14, color: "#4b4b6b" }}>
                    {user.primaryPhoneNumber.phoneNumber}
                  </Typography>
                )}
              </Box>
            </Box>
        
        </Grid>


        <Grid>
          <List sx={{ width: "100%", p: 0 }}>
            {/* Account Info */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={RouteProvider.USER_PROFILE}
                sx={{ px: 2, pb: 1 }}
              >
                <AccountCircleIcon
                  sx={{ mr: 2, color: "#0b134a", fontSize: "23px" }}
                />
                <ListItemText
                  primary="Account Info"
                  slotProps={{
                    primary: {
                      sx: {
                        color: "#0b134a",
                        fontSize: "15px",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            {/* Saved Workers */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={RouteProvider.USER_SAVED_WORKERS}
                sx={{ px: 2, py: 1 }}
              >
                <BookmarkIcon
                  sx={{ mr: 2, color: "#0b134a", fontSize: "22px" }}
                />
                <ListItemText
                  primary="Saved Workers"
                  slotProps={{
                    primary: {
                      sx: {
                        color: "#0b134a",
                        fontSize: "15px",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            {/* Saved Address */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={RouteProvider.USER_ADDRESS_SAVED}
                sx={{ px: 2, pb: 2, pt: 1 }}
              >
                <LocationOnIcon
                  sx={{ mr: 2, color: "#0b134a", fontSize: "22px" }}
                />
                <ListItemText
                  primary="Saved Address"
                  slotProps={{
                    primary: {
                      sx: {
                        color: "#0b134a",
                        fontSize: "15px",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ mx: 2, borderColor: "rgba(0, 0, 0, 0.3)" }} />

            {/* Terms and Condition */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={RouteProvider.USER_TERMS}
                sx={{ px: 2, py: 1, mt: 1.5 }}
              >
                <GavelIcon sx={{ mr: 2, color: "#0b134a", fontSize: "22px" }} />
                <ListItemText
                  primary="Terms and Condition"
                  slotProps={{
                    primary: {
                      sx: {
                        color: "#0b134a",
                        fontSize: "15px",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={RouteProvider.USER_PRIVACY_POLICY}
              >
                <PrivacyTipIcon sx={{ mr: 2, color: "#0b134a", fontSize: "22px" }} />
                <ListItemText
                  primary="Privacy Policy"
                  slotProps={{
                    primary: {
                      sx: {
                        color: "#0b134a",
                        fontSize: "15px",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>


            <Divider sx={{ mx: 2, borderColor: "rgba(0, 0, 0, 0.3)" }} />

            {/* Help & Support */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={RouteProvider.USER_SUPPORT}
                sx={{ px: 2, pb: 1, pt: 2 }}
              >
                <HelpIcon sx={{ mr: 2, color: "#0b134a", fontSize: "22px" }} />
                <ListItemText
                  primary="Help & Support"
                  slotProps={{
                    primary: {
                      sx: {
                        color: "#0b134a",
                        fontSize: "15px",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>

            {/* Logout */}
            <ListItem disablePadding>
              <ListItemButton sx={{ px: 2, py: 1 }} onClick={handleLogoutClick}>
                <LogoutIcon
                  sx={{ mr: 2, color: "#0b134a", fontSize: "22px" }}
                />
                <ListItemText
                  primary="Logout"
                  slotProps={{
                    primary: {
                      sx: {
                        color: "#0b134a",
                        fontSize: "15px",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>

      {/* Logout Confirmation Dialog */}
      <LogoutPopup open={open} onClose={handleClose} />

      <LoginDrawer open={login} setOpen={setLogin} height={"30vh"} />
    </Box>
  );
};

export default Profile;
