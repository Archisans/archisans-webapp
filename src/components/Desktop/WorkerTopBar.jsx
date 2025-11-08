import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Divider,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import SideDrawer from "./UserMenu";

const WorkerTopBar = ({ handleLocationClick }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "1px solid #eee" }}
      >
        <Toolbar sx={{ gap: 2 }}>
          {/* Left side: Logo + Location */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            <Typography
              onClick={() => setDrawerOpen(true)}
              variant="h6"
              sx={{ fontWeight: 900, letterSpacing: 0.2, color: "#0A0A0A" }}
            >
              Archisans
            </Typography>
            <Divider flexItem orientation="vertical" />
            <Button
              onClick={handleLocationClick}
              startIcon={<LocationOnOutlinedIcon />}
              endIcon={<ChevronRightIcon />}
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Thrissur Kerala
            </Button>
          </Stack>

          {/* Middle: Nav links */}
          <Stack direction="row" spacing={2} sx={{ display: { md: "flex" } }}>
            <Button color="inherit" onClick={() => navigate("/home")}>
              Home
            </Button>
            {/* 👇 Added Works after Home */}
            <Button color="inherit">
              Works
            </Button>
            <Button color="inherit" onClick={() => navigate("/projects")}>
              Bookings
            </Button>
            <Button color="inherit" onClick={() => navigate("/pricing")}>
              Notifications
            </Button>
          </Stack>

          {/* Search bar */}
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            size="small"
            sx={{
              width: 200,
              mx: 2,
              display: { xs: "none", sm: "block" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Divider */}
          <Divider
            flexItem
            orientation="vertical"
            sx={{ height: "40px", alignSelf: "center" }}
          />

          {/* Right side: Avatar */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              onClick={() => setDrawerOpen(true)}
              sx={{ width: 32, height: 32, cursor: "pointer" }}
              src="https://randomuser.me/api/portraits/men/83.jpg"
            />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <SideDrawer open={drawerOpen} setOpen={setDrawerOpen} />
    </>
  );
};

export default WorkerTopBar;
