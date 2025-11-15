import { Box, Typography, Grid, IconButton, Stack, Avatar } from "@mui/material";
import { KeyboardArrowDownOutlined, ArrowBackIosNew } from "@mui/icons-material";
import { useUser } from "@/context/UserContext";
import ProfileDrawer from "@/features/Home/Mobile/Components/ProfileDrawer";
import LoginDrawer from "./LoginDrawer";
import { useState } from "react";

const MobMainHeader = ({ backArrow = false, onBack }) => {
  const { isSignedIn, profile } = useUser();
  const location = "Thrissur, Kerala";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        pt: 2,
        pr: 2,
        pl: 1,
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {/* LEFT SIDE: Back Arrow + Location */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        
        {backArrow && (
          <IconButton
            onClick={onBack}
            sx={{ color: "#0c136f" }}
          >
            <ArrowBackIosNew fontSize="small" />
          </IconButton>
        )}

        {/* Location */}
        <Box display="flex" flexDirection="column" pl={1}>
          <Typography variant="caption" sx={{ lineHeight: 1, fontSize: 13 }}>
            Current Location
          </Typography>
          <Grid container alignItems="center">
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 15,
                color: "#0c136f",
              }}
            >
              {location}
            </Typography>

            <IconButton sx={{ padding: 0 }}>
              <KeyboardArrowDownOutlined sx={{ color: "#0c136f" }} />
            </IconButton>
          </Grid>
        </Box>
      </Box>

      {/* RIGHT SIDE: Avatar or Login */}
      {isSignedIn ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            onClick={() => setDrawerOpen(true)}
            sx={{ width: 32, height: 32 }}
            src={profile.imageUrl}
          />
        </Stack>
      ) : (
        <Box>
          <button
            onClick={() => setLoginOpen(true)}
            style={{
              backgroundColor: "#0c136f",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "6px 16px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            Login
          </button>
        </Box>
      )}

      {/* Drawers */}
      <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <LoginDrawer open={loginOpen} setOpen={setLoginOpen} height={"30vh"} />
    </Box>
  );
};

export default MobMainHeader;
