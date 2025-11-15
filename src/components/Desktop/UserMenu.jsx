import React, { useState } from "react";
import {
  Box,
  Divider,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Backdrop,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  MENU_ITEMS,
  MENU_TEXT_STYLE,
} from "@/components/Desktop/Constants/SideDrawer";
import AccountInfoModal from "@/features/Profile/AccountInfoModal";
import HelpSupportModal from "@/components/Desktop/Footer/Components/Help&Support";
import { useUser } from "@/context/UserContext";
import LogoutModal from "../LogoutModal";

const UserMenu = ({ open, setOpen }) => {
  const { profile, isWorker } = useUser();
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleMenuClick = (item) => {
    if (item.action === "accountInfo") {
      setAccountModalOpen(true);
    } else if (item.action === "help&support") {
      setHelpOpen(true);
    } else if (item.action === "logout") {
      setShowLogout(true);
    } else {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setShowLogout(false);
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
        sx={{ zIndex: 1200 }}
      />

      <Paper
        sx={{
          position: "fixed",
          top: 80,
          right: 20,
          width: 240,
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          zIndex: 1300,
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backgroundColor: "rgba(30, 30, 30, 0.75)", // dark tinted glass
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transform: open ? "scale(1)" : "scale(0.95)",
          transition: "all 0.25s ease-in-out",
          transformOrigin: "top right",
        }}
      >
        {/* User Section */}
        <Box
          sx={{ px: 2, py: 2, display: "flex", alignItems: "center", gap: 1.5 }}
        >
          <Avatar
            src={profile.imageUrl}
            sx={{
              width: 50,
              height: 50,
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          />
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 14, color: "white" }}>
              {profile.fullName || profile.phoneNumber}
            </Typography>
            {profile.fullName && (
              <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                {profile.phoneNumber}
              </Typography>
            )}
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Menu Section */}
        <List sx={{ py: 0.5 }}>
          {MENU_ITEMS.filter(
            (item) => item.isWorker === undefined || item.isWorker === isWorker
          ).map((item, idx) =>
            item.divider ? (
              <Divider
                key={idx}
                sx={{ my: 0.5, borderColor: "rgba(255,255,255,0.2)" }}
              />
            ) : (
              <ListItem key={idx} disablePadding>
                <ListItemButton
                  component={item.to ? Link : "div"}
                  to={item.to}
                  sx={{
                    px: 2,
                    py: 1,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                    color: "white",
                  }}
                  onClick={() => handleMenuClick(item)}
                >
                  {item.icon}
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      ...MENU_TEXT_STYLE,
                      sx: { ml: 1.5, fontSize: 13, color: "white" },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Paper>

      <AccountInfoModal
        open={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
      />
      <HelpSupportModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      <LogoutModal
        open={showLogout}
        onClose={() => handleClose()}
        onConfirm={() => setShowLogout(false)}
      />
    </>
  );
};

export default UserMenu;
