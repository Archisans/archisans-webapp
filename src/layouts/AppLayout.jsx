import { Outlet, useLocation } from "react-router-dom";
import BottomTabBar from "@/components/Mobile/BottomTabBar";
import { RouteProvider } from "@/config/RouteProvider";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import WorkerSideBar from "@/features/WorkerPage/components/WorkerSideBar";
import TopBar from "@/components/Desktop/TopBar";

const SIDEBAR_WIDTH = 250;

const AppLayout = () => {
  const location = useLocation();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  const bottomTabs = [
    RouteProvider.USER_HOME,
    RouteProvider.USER_BOOKINGS,
    RouteProvider.USER_PROFILE,
  ];

  const workerSideBarPaths = [
    RouteProvider.WORKER_HOME,
    RouteProvider.WORKER_ASSIGNED_WORKS,
    RouteProvider.WORKER_PROFILE,
    RouteProvider.WORKER_PORTFOLIO,
    RouteProvider.WORKER_AVAILABILITY,
  ];

  const showWorkerSidebar = !isMobile && workerSideBarPaths.includes(location.pathname);

  return (
    <>
      {/* TopBar */}
      {!isMobile && <TopBar />}

      {/* Main content container */}
      <div
        style={{
          paddingBottom:
            isMobile && bottomTabs.includes(location.pathname) ? "60px" : "0px",
          marginLeft: showWorkerSidebar ? `${SIDEBAR_WIDTH}px` : "0px", // only content moves
        }}
      >
        <Outlet />
      </div>

      {/* Mobile bottom tabs */}
      {isMobile && <BottomTabBar />}

      {/* Worker sidebar */}
      {showWorkerSidebar && <WorkerSideBar />}
    </>
  );
};

export default AppLayout;
