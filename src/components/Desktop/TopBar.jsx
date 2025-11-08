import { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { navLinks } from "@/components/Desktop/Constants/topBar";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import UserMenu from "@/components/Desktop/UserMenu";
import LoginPopUpModal from "@/components/Desktop/LoginModal";

const TopBar = ({ handleLocationClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, isSignedIn, isWorker } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const isTransparent = isHomePage && !scrolled;

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          backgroundColor: isTransparent ? "transparent" : "white",
          borderBottom: isTransparent ? "none" : "1px solid #eee",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            gap: 2,
            justifyContent: "space-between",
            flexWrap: "nowrap",
            minWidth: 0,
          }}
        >
          {/* Left side: Logo + Location + Search */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: 0.2,
                color: isTransparent ? "white" : "#0A0A0A",
                transition: "color 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Archisans
            </Typography>

            <Divider
              flexItem
              orientation="vertical"
              sx={{
                borderColor: isTransparent ? "rgba(255,255,255,0.3)" : "#eee",
              }}
            />

            <Button
              onClick={handleLocationClick}
              startIcon={<LocationOnOutlinedIcon />}
              endIcon={<ChevronRightIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                color: isTransparent ? "white" : "#0A0A0A",
                transition: "color 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Thrissur Kerala
            </Button>

            {/* Responsive Search bar */}
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              size="small"
              sx={{
                flexGrow: 1, // use available space
                maxWidth: {
                  xs: "180px",
                  sm: "260px",
                  md: "350px",
                  lg: "450px",
                  xl: "550px",
                },
                mx: 2,
                display: { xs: "none", sm: "block" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isTransparent
                    ? "rgba(255,255,255,0.1)"
                    : "white",
                  color: isTransparent ? "white" : "#0A0A0A",
                  "& fieldset": {
                    borderColor: isTransparent
                      ? "rgba(255,255,255,0.3)"
                      : "#766464ff",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: isTransparent ? "rgba(255,255,255,0.7)" : "#999",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: isTransparent ? "rgba(255,255,255,0.7)" : "#999",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          {/* Middle: Nav links */}
          <Stack
            direction="row"
            spacing={{ xs: 1, md: 2, lg: 3 }}
            sx={{
              display: { xs: "none", sm: "flex" },
              flexWrap: "nowrap", // keep in one row
              whiteSpace: "nowrap",
            }}
          >
            {navLinks
              .filter((link) => {
                if (link.requiresAuth && !isSignedIn) return false;
                if (!link.requiresAuth && isSignedIn) return false;
                if (link.worker && !isWorker) return false;
                return true;
              })
              .map((link, idx) => (
                <Button
                  key={idx}
                  onClick={() =>
                    link.label === "Sign In"
                      ? setLoginOpen(true)
                      : navigate(link.path)
                  }
                  sx={{
                    color: isTransparent ? "white" : "#0A0A0A",
                    textTransform: "none",
                    fontWeight: 600,
                    position: "relative",
                    fontSize: "0.9rem",
                    transition: "color 0.3s ease",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      width:
                        location.pathname === link.path ||
                        location.pathname.startsWith(`${link.path}/`)
                          ? "100%"
                          : 0,
                      height: "2px",
                      bottom: 0,
                      left: 0,
                      backgroundColor: "#4EBCFF",
                      transition: "width 0.3s ease",
                    },
                    "&:hover:after": {
                      width: "100%",
                    },
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
          </Stack>

          {/* Right: Avatar */}
          {isSignedIn && (
            <>
              <Divider
                flexItem
                orientation="vertical"
                sx={{
                  height: "40px",
                  alignSelf: "center",
                  borderColor: isTransparent ? "rgba(255,255,255,0.3)" : "#eee",
                }}
              />
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  onClick={() => setDrawerOpen(true)}
                  sx={{ width: 32, height: 32, cursor: "pointer" }}
                  src={profile?.imageUrl}
                />
              </Stack>
            </>
          )}
        </Toolbar>
      </AppBar>

      <UserMenu open={drawerOpen} setOpen={setDrawerOpen} />

      {/* Login Popup */}
      <LoginPopUpModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default TopBar;
