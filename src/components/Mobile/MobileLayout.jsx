import { Outlet, useLocation } from "react-router-dom";
import { RouteProvider } from "@/config/RouteProvider";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import BottomTabBar from "./BottomTabBar";

const MobileLayout = () => {
  const location = useLocation();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  const bottomTabs = [
    RouteProvider.USER_HOME,
    "/mobile-messages",
    RouteProvider.USER_BOOKINGS,
    RouteProvider.USER_PROFILE,
  ];

  return (
    <div
      style={{
        paddingBottom:
          isMobile && bottomTabs.includes(location.pathname) ? "60px" : "5px",
      }}
    >
      <Outlet />
      {isMobile && <BottomTabBar />}
    </div>
  );
};

export default MobileLayout;
