import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { Home, Search } from "lucide-react";
import { RouteProvider } from "@/config/RouteProvider";
import { SuitcaseIcon } from "@phosphor-icons/react";

const BottomTabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  const allowedPaths = [
    RouteProvider.USER_HOME,
    RouteProvider.USER_SEARCH,
    RouteProvider.WORKER_HOME,
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const tabValue = allowedPaths.indexOf(currentPath);

    if (tabValue !== -1) {
      setValue(tabValue);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate(RouteProvider.USER_HOME);
    else if (newValue === 1) navigate(RouteProvider.USER_SEARCH);
    else if (newValue === 2) navigate(RouteProvider.WORKER_HOME);
  };

  if (
    !allowedPaths.includes(location.pathname) &&
    location.pathname !== RouteProvider.USER_SEARCH
  ) {
    return null;
  }

  const activeColor = "#0c136fff"; // Active tab color
  const inactiveColor = "#5558a1ff"; // Inactive tab color

  return (
    <Box
    sx={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: "calc(60px + env(safe-area-inset-bottom, 0px))",
      bgcolor: "white",
      zIndex: 1000,
      borderTop: "1px solid lightgrey",
      paddingBottom: "env(safe-area-inset-bottom)", 
    }}
  >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="mobile bottom navigation"
        variant="fullWidth"
        TabIndicatorProps={{
          sx: {
            bottom: -1.4,
            height: 3,
            borderRadius: 1.5,
            bgcolor: activeColor,
          },
        }}
        sx={{
          minHeight: 50,
          height: 48,
          pt: 0.7,
          position: "relative",
        }}
      >
        {/* Home */}
        <Tab
          label={
            <Box display="flex" flexDirection="column" alignItems="center">
              <Home
                size={25}
                strokeWidth={2}
                color={value === 0 ? activeColor : inactiveColor}
              />
              <Typography
                fontSize="0.6rem"
                mt={0.2}
                color={value === 0 ? activeColor : inactiveColor}
              >
                Home
              </Typography>
            </Box>
          }
          sx={{
            minWidth: 0,
            px: 0.8,
            mx: 0.4,
            py: 0.2,
            my: 0.2,
            textTransform: "none",
            minHeight: 45,
            height: 45,
          }}
        />

        {/* Search */}
        <Tab
          label={
            <Box display="flex" flexDirection="column" alignItems="center">
              <Search
                size={23}
                strokeWidth={2}
                color={value === 1 ? activeColor : inactiveColor}
              />
              <Typography
                fontSize="0.6rem"
                mt={0.3}
                color={value === 1 ? activeColor : inactiveColor}
              >
                Search
              </Typography>
            </Box>
          }
          sx={{
            minWidth: 0,
            px: 0.8,
            mx: 0.4,
            py: 0.2,
            my: 0.2,
            textTransform: "none",
            minHeight: 45,
            height: 45,
          }}
        />

        {/* Worker */}
        <Tab
          label={
            <Box display="flex" flexDirection="column" alignItems="center">
              <SuitcaseIcon
                size={23}
                strokeWidth={2}
                color={value === 2 ? activeColor : inactiveColor}
              />
              <Typography
                fontSize="0.6rem"
                mt={0.3}
                color={value === 2 ? activeColor : inactiveColor}
              >
                Worker
              </Typography>
            </Box>
          }
          sx={{
            minWidth: 0,
            px: 0.8,
            mx: 0.4,
            py: 0.2,
            my: 0.2,
            textTransform: "none",
            minHeight: 45,
            height: 45,
          }}
        />
      </Tabs>
    </Box>
  );
};

export default BottomTabBar;
