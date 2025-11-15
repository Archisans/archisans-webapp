import { Box, Typography, Stack } from "@mui/material";
import {
  SuitcaseSimpleIcon,
  CalendarCheckIcon,
  BankIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { RouteProvider } from "@/config/RouteProvider";
import { Link, useLocation } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const SIDEBAR_WIDTH = 260;
const TOPBAR_HEIGHT = 64;

const mainCategories = [
  { name: "Dashboard", path: RouteProvider.WORKER_HOME, icon: <SuitcaseSimpleIcon size={22} /> },
  //{ name: "My Works", path: RouteProvider.WORKER_ASSIGNED_WORKS, icon: <SuitcaseSimpleIcon size={22} /> },
  //{ name: "Availability", path: RouteProvider.WORKER_AVAILABILITY, icon: <CalendarCheckIcon size={22} /> },
  //{ name: "Portfolio", path: RouteProvider.WORKER_PORTFOLIO, icon: <BankIcon size={22} /> },
  { name: "Work Profile", path: RouteProvider.WORKER_PROFILE, icon: <UserIcon size={22} /> },
  { name: "Add Portfolio", path: RouteProvider.WORKER_PORTFOLIO, icon: <AddCircleOutlineIcon size={22} /> },

];

export default function WorkerSideBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Box
  sx={{
    width: SIDEBAR_WIDTH,
    position: "fixed",
    top: TOPBAR_HEIGHT,
    left: 0,
    height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
    overflowY: "auto",
    boxShadow: "2px 0px 12px rgba(0,0,0,0.05)",
    borderRight: "1px solid #e3e8f0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    p: 2,
    bgcolor: "#fff",
  }}
>
      <Box>
        {/* Menu Items */}
        <Stack spacing={1.2}>
          {mainCategories.map(({ name, path, icon }, idx) => {
            const active = isActive(path);
            return (
              <Box
                key={idx}
                component={Link}
                to={path}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1.4,
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: active ? 600 : 500,
                  background: active ? "#5667fa" : "transparent",
                  border: active ? "1px solid #6b70d6" : "1px solid transparent",
                  transition: "all 0.3s ease",
                  color: active ? "#fff" : "text.primary",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    background: active ? "rgba(255,255,255,0.2)" : "rgba(42,48,160,0.08)",
                    color: active ? "#fff" : "#2a30a0",
                  }}
                >
                  {icon}
                </Box>
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: active ? 600 : 500,
                    color: active ? "#fff" : "text.primary",
                  }}
                >
                  {name}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          borderTop: "1px solid #e3e8f0",
          mt: 3,
          pt: 2,
          textAlign: "center",
        }}
      >
        <Typography fontSize={12} color="text.secondary">
          © 2025 Archisans
        </Typography>
      </Box>
    </Box>
  );
}
