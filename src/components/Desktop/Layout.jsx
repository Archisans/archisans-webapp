import { Outlet, useLocation } from "react-router-dom";
import { RouteProvider } from "@/config/RouteProvider";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import TopBar from "./TopBar";

const Layout = () => {
  const location = useLocation();
  const isDesktop = useMediaQuery(BREAKPOINTS.desktop);

  const Tabs = [
    RouteProvider.USER_HOME
    
  ];

  return (
    <div
      style={{
        paddingBottom:
          isDesktop && Tabs.includes(location.pathname) ? "60px" : "25px",
      }}
    >
      <Outlet />
      {isDesktop && <TopBar />}
    </div>
  );
};

export default Layout;
