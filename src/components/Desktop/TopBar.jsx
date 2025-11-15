import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
  Popover,
  Box,
  IconButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  ChevronRight as ChevronRightIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { navLinks } from "@/components/Desktop/Constants/topBar";
import LoginPopUpModal from "@/components/Desktop/LoginModal";
import UserMenu from "@/components/Desktop/UserMenu";
import { useSearch } from "@/hooks/useSearch";
import { useBootstrapConfiguration } from "@/hooks/useBootstrapConfiguration";

const SectionHeader = ({ title }) => (
  <Typography
    variant="caption"
    sx={{
      px: 1.5,
      py: 0.5,
      color: "#666",
      fontWeight: 600,
      textTransform: "uppercase",
      fontSize: "0.7rem",
      letterSpacing: 0.5,
    }}
  >
    {title}
  </Typography>
);

const SearchListItem = ({ icon, title, description, onClick, rightAction }) => (
  <Box
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyPress={(e) => e.key === "Enter" && onClick?.()}
    sx={{
      p: 1.5,
      borderRadius: 1.5,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      transition: "background-color 0.2s ease, transform 0.05s ease",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
      "&:active": {
        transform: "scale(0.99)",
      },
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        flex: 1,
        minWidth: 0,
      }}
    >
      {icon && (
        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          {icon}
        </Box>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="caption"
            sx={{
              color: "#666",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>

    {rightAction && (
      <Box
        sx={{
          flexShrink: 0,
          ml: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        {rightAction}
      </Box>
    )}
  </Box>
);

const TopBar = ({ handleLocationClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bootstrapConfiguration } = useBootstrapConfiguration();
  const { profile, isSignedIn, isWorker } = useUser();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const searchRef = useRef(null);

  const {
    query,
    suggestions,
    results,
    recentSearches,
    executeSearch,
    handleInputChange,
    handleDeleteRecent,
    clearSearch,
  } = useSearch(bootstrapConfiguration);

  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage && !scrolled;
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (location.state?.focusSearch) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 150);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const visibleLinks = useMemo(
    () =>
      navLinks.filter((link) => {
        if (link.requiresAuth && !isSignedIn) return false;
        if (!link.requiresAuth && isSignedIn) return false;
        if (link.worker && !isWorker) return false;
        return true;
      }),
    [isSignedIn, isWorker]
  );

  const handleClose = useCallback(() => setAnchorEl(null), []);
  const handleClearClick = useCallback(() => {
    clearSearch();
    handleClose();
  }, [clearSearch, handleClose]);

  const handleSuggestionClick = useCallback(
    (item) => executeSearch(item),
    [executeSearch]
  );

  const handleResultClick = useCallback(
    (service) => {
      navigate(`/workers/${service.slug}`);
      handleClose();
    },
    [navigate, handleClose]
  );

  const hasContent =
    suggestions.length > 0 || results.length > 0 || recentSearches.length > 0;

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: isTransparent ? "transparent" : "white",
          borderBottom: isTransparent ? "none" : "1px solid #eee",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "nowrap",
            minWidth: 0,
          }}
        >
          {/* Left Section */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ flexGrow: 1, minWidth: 0, overflow: "hidden" }}
          >
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: 0.2,
                color: isTransparent ? "white" : "#0A0A0A",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Archisans
            </Typography>

            <Divider
              flexItem
              orientation="vertical"
              sx={{
                borderColor: isTransparent ? "rgba(255,255,255,0.3)" : "#eee",
                flexShrink: 0,
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
                flexShrink: 0,
                minWidth: "fit-content",
              }}
            >
              Thrissur Kerala
            </Button>

            {/* Search Field */}
            <TextField
              inputRef={searchRef}
              value={query}
              onChange={(e) => {
                handleInputChange(e.target.value);
                if (!open) setAnchorEl(e.currentTarget);
              }}
              placeholder="Search services..."
              size="small"
              autoComplete="off"
              sx={{
                flexGrow: 1,
                maxWidth: { xs: 180, sm: 260, md: 350, lg: 450 },
                mx: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isTransparent
                    ? "rgba(255,255,255,0.1)"
                    : "white",
                  color: isTransparent ? "white" : "#0A0A0A",
                  "& fieldset": {
                    borderColor: isTransparent
                      ? "rgba(255,255,255,0.3)"
                      : "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: isTransparent
                      ? "rgba(255,255,255,0.5)"
                      : "#999",
                  },
                  "&.Mui-focused fieldset": { borderColor: "#4EBCFF" },
                },
                "& input::placeholder": {
                  color: isTransparent ? "rgba(255,255,255,0.7)" : "#999",
                  opacity: 1,
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
                endAdornment: query && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={handleClearClick}
                      sx={{
                        color: isTransparent ? "rgba(255,255,255,0.7)" : "#666",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          {/* Nav Links */}
          <Stack
            direction="row"
            spacing={{ xs: 1, md: 2, lg: 3 }}
            sx={{ display: { xs: "none", sm: "flex" }, whiteSpace: "nowrap" }}
          >
            {visibleLinks.map((link) => (
              <Button
                key={link.path}
                onClick={() =>
                  link.label === "Sign In"
                    ? setLoginOpen(true)
                    : navigate(link.path)
                }
                sx={{
                  color: isTransparent ? "white" : "#0A0A0A",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    width: location.pathname === link.path ? "100%" : 0,
                    height: 2,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "#4EBCFF",
                    transition: "width 0.3s ease",
                  },
                  "&:hover:after": { width: "100%" },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Stack>

          {/* Avatar */}
          {isSignedIn && (
            <>
              <Divider
                flexItem
                orientation="vertical"
                sx={{
                  height: 40,
                  borderColor: isTransparent ? "rgba(255,255,255,0.3)" : "#eee",
                }}
              />
              <Avatar
                onClick={() => setDrawerOpen(true)}
                sx={{
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
                src={profile?.imageUrl}
              />
            </>
          )}
        </Toolbar>
      </AppBar>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableAutoFocus
        disableEnforceFocus
        slotProps={{
          paper: {
            sx: {
              width: 400,
              maxHeight: 400,
              overflowY: "auto",
              mt: 1,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              borderRadius: 1,
            },
          },
        }}
      >
        {!hasContent && (
          <Box sx={{ p: 3, textAlign: "center", color: "#999" }}>
            <SearchIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
            <Typography variant="body2">
              Start typing to search services...
            </Typography>
          </Box>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <Box sx={{ p: 1 }}>
            <SectionHeader title="Suggestions" />
            {suggestions.map((item, idx) => (
              <SearchListItem
                key={idx}
                icon={<SearchIcon sx={{ fontSize: 18, color: "#999" }} />}
                title={item}
                onClick={() => handleSuggestionClick(item)}
              />
            ))}
          </Box>
        )}

        {/* Recent Searches */}
        {!suggestions.length &&
          !results.length &&
          recentSearches.length > 0 && (
            <Box sx={{ p: 1 }}>
              <SectionHeader title="Recent Searches" />
              {recentSearches.map((r, i) => (
                <SearchListItem
                  key={i}
                  icon={<HistoryIcon sx={{ fontSize: 18, color: "#999" }} />}
                  title={r}
                  onClick={() => executeSearch(r)}
                  rightAction={
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRecent(r);
                      }}
                      sx={{
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                />
              ))}
            </Box>
          )}

        {/* Results */}
        {results.length > 0 && (
          <Box sx={{ p: 1 }}>
            <SectionHeader
              title={`${results.length} Result${
                results.length !== 1 ? "s" : ""
              }`}
            />
            {results.map((service) => (
              <SearchListItem
                key={service.id}
                title={service.title}
                description={service.description}
                onClick={() => handleResultClick(service)}
                icon={<SearchIcon sx={{ fontSize: 18, color: "#999" }} />}
              />
            ))}
          </Box>
        )}

        {query.length >= 2 &&
          results.length === 0 &&
          suggestions.length === 0 &&
          !hasContent && (
            <Box sx={{ p: 3, textAlign: "center", color: "#999" }}>
              <Typography variant="body2">
                No services found for "{query}"
              </Typography>
            </Box>
          )}
      </Popover>

      <UserMenu open={drawerOpen} setOpen={setDrawerOpen} />
      <LoginPopUpModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default TopBar;
