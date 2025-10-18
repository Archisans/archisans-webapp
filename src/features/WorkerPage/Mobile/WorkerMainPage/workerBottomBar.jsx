import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, Typography, useTheme } from "@mui/material";
import { Home, Zap, CalendarCheck, Search, BriefcaseBusiness, Calendar } from "lucide-react";
import { RouteProvider } from "@/config/RouteProvider";

const WorkerBottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const theme = useTheme();

  // 🎨 Active & Inactive colors
  const activeColor = "#0c136fff";
  const inactiveColor = "#5558a1ff";

  const allowedPaths = [
    RouteProvider.USER_HOME,
    RouteProvider.USER_SERVICE_URGENT_REQUEST,
    RouteProvider.WORKER_HOME,
    RouteProvider.USER_BOOKINGS,
    RouteProvider.USER_WORKER_SEARCH,
  ];

  useEffect(() => {
    const tabValue = allowedPaths.indexOf(location.pathname);
    if (tabValue !== -1) {
      setValue(tabValue);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate(RouteProvider.USER_HOME);
        break;
      case 1:
        navigate(RouteProvider.USER_SERVICE_URGENT_REQUEST);
        break;
      case 2:
        navigate(RouteProvider.WORKER_HOME);
        break;
      case 3:
        navigate(RouteProvider.USER_BOOKINGS);
        break;
      case 4:
        navigate(RouteProvider.USER_WORKER_SEARCH);
        break;
      default:
        break;
    }
  };

  if (!allowedPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "white",
        zIndex: 1000,
        borderTop: "1px solid lightgrey",
        height: 60,
        overflow: "visible",
      }}
    >
      {/* Floating Worker Icon */}
      <Box
        sx={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1100,
        }}
        onClick={() => {
          setValue(2);
          navigate(RouteProvider.WORKER_HOME);
        }}
      >
        <Box
          sx={{
            width: 58,
            height: 58,
            bgcolor: theme.palette.primary.main,
            borderRadius: "50%",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <BriefcaseBusiness size={28} color="white" strokeWidth={2.2} />
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        sx={{
          height: "100%",
          ".MuiTabs-flexContainer": {
            alignItems: "center",
            height: "100%",
          },
        }}
      >
        {/* Home */}
        <Tab
          label={
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
              <Home size={24} strokeWidth={2} color={value === 0 ? activeColor : inactiveColor} />
              <Typography
                fontSize="0.65rem"
                sx={{ color: value === 0 ? activeColor : inactiveColor ,mt:0.2}}
              >
                Home
              </Typography>
            </Box>
          }
          sx={tabStyle}
        />

        {/* Instant */}
        <Tab
          label={
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
              <Zap size={24} strokeWidth={2} color={value === 1 ? activeColor : inactiveColor} />
              <Typography
                fontSize="0.65rem"
                sx={{ color: value === 1 ? activeColor : inactiveColor ,mt:0.2}}
              >
                Instant
              </Typography>
            </Box>
          }
          sx={tabStyle}
        />

        {/* Spacer for Floating Button */}
        <Tab
          disabled
          sx={{
            minWidth: 0,
            width: "20px",
            padding: 0,
            margin: 0,
          }}
        />

        {/* Bookings */}
        <Tab
          label={
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
              <Calendar size={24} strokeWidth={2} color={value === 3 ? activeColor : inactiveColor} />
              <Typography
                fontSize="0.65rem"
                sx={{ color: value === 3 ? activeColor : inactiveColor ,mt:0.2}}
              >
                Bookings
              </Typography>
            </Box>
          }
          sx={tabStyle}
        />

        {/* Search */}
        <Tab
          label={
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
              <Search size={24} strokeWidth={2} color={value === 4 ? activeColor : inactiveColor} />
              <Typography
                fontSize="0.65rem"
                sx={{ color: value === 4 ? activeColor : inactiveColor , mt:0.2}}
              >
                Search
              </Typography>
            </Box>
          }
          sx={tabStyle}
        />
      </Tabs>
    </Box>
  );
};

const tabStyle = {
  fontSize: "0.65rem",
  minWidth: 0,
  textTransform: "none",
  minHeight: 60, // match bottom bar height
  height: 60,    // ensures centering
  padding: 0,
};

export default WorkerBottomBar;
