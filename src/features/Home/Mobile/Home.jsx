import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Stack,
  IconButton,
  Avatar,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import Advertisement1 from "./Components/Advertisment1";
import ScrollToTopButton from "./Components/scrollToTopButton";
import SearchBar from "./Components/SearchBar";
import ArchisansWorker from "@/assets/Images/ArchisansWorker.png";
import Top_Home_Img from "@/assets/Images/Top_Home_Img.png";
import InstantService from "@/assets/Images/InstantService.png";
import AddressDrawer from "@/features/Address/Components/AddressSelectBottomDrawer/AddressDrawer";
import { useNavigate } from "react-router-dom";
import { BellIcon } from "@phosphor-icons/react";
import { RouteProvider } from "@/config/RouteProvider";
import CategoriesCarousal from "./Components/CategoriesCarousal";
import { useUser } from "@clerk/clerk-react";
import ProfileDrawer from "./Components/ProfileDrawer";
import LoginDrawer from "@/components/Mobile/LoginDrawer";
import Footer from "./Components/Footer";
import PopularServices from "./Components/PopularServices";


const HomeMobile = ({ bootstrapConfiguration }) => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleOpen = (isOpen) => {
    setOpen(isOpen);
  };

  return (
    <Grid>
      <Grid>
        <Grid>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              minHeight: "15vh",
              overflow: "hidden",
            }}
          >
            {/* Background Image with Reduced Opacity */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${Top_Home_Img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: 0.4,
                zIndex: 1,
              }}
            />

            {/* Foreground Content */}
            <Box sx={{ position: "relative", zIndex: 2 }}>
              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pt: 2,
                  pr: 2,
                  pl: 1,
                }}
              >
                <Box display="flex" position="relative">
                  {/* Location */}
                  <Box display="flex" flexDirection="column" pl={1.5}>
                    <Typography
                      variant="caption"
                      sx={{ lineHeight: 1, fontSize: 13 }}
                    >
                      Current Location
                    </Typography>
                    <Grid container>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: 15,
                          color: theme.palette.primary.main,
                        }}
                      >
                        Thrissur, Kerala
                      </Typography>
                      <IconButton
                        onClick={() => handleOpen(true)}
                        sx={{ padding: 0 }}
                      >
                        <KeyboardArrowDownOutlined
                          sx={{ color: theme.palette.primary.main }}
                        />
                      </IconButton>
                    </Grid>
                  </Box>
                </Box>

                {isSignedIn ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                      onClick={() =>
                        navigate(RouteProvider.USER_SETTINGS_NOTIFICATION)
                      }
                    >
                      <BellIcon color="#0c136fff" />
                    </IconButton>
                    <Avatar
                      onClick={() => setDrawerOpen(true)}
                      sx={{ width: 32, height: 32 }}
                      src={user.imageUrl}
                    />
                  </Stack>
                ) : (
                  <Box>
                    <button
                      onClick={() => setLoginOpen(true)}
                      style={{
                        backgroundColor: "#0c136fff",
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
              </Box>

              {/* Search */}
              <Box sx={{ px: 2, mb: 1, pb: 1.5 }}>
                <SearchBar />
              </Box>

              {/* Banner */}
              {/* <AdvertisementCarousel
                advertisements={bootstrapConfiguration?.advertisements?.central}
              /> */}
              <Advertisement1 />
            </Box>
          </Box>
        </Grid>

        {/* Services */}
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 600,
            my: 1,
            px: 1.5,
            color: "#0c136fff",
          }}
        >
          Find Right Experts
        </Typography>
        <CategoriesCarousal
          categories={bootstrapConfiguration?.serviceCategories}
        />
      </Grid>

      <Grid container justifyContent="center">
        <Grid sx={{ mb: 3, mt: 1.5, px: 1 }}>
          <Box
            component="img"
            src={InstantService}
            alt="Sample"
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: 1,
              cursor: "pointer",
            }}
          />
        </Grid>
      </Grid>

      {/* Join as Worker */}
      <Grid container justifyContent="center">
        <Grid sx={{ mt: 3, px: 1, pb: 1.5 }}>
          <Box
            component="img"
            src={ArchisansWorker}
            alt="Sample"
            onClick={() => navigate(RouteProvider.WORKER_REGISTER)}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: 2,
              cursor: "pointer",
              boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Grid>
      </Grid>

      <PopularServices name="contract" />

      <PopularServices name="Architect" />

      <PopularServices name="Fabrication" />

      <PopularServices name="Engineering" />

      <PopularServices name="Artisans" />

      <Footer />

      <ScrollToTopButton />

      <AddressDrawer open={open} setOpen={setOpen} />

      <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <LoginDrawer open={loginOpen} setOpen={setLoginOpen} height={"30vh"} />
    </Grid>
  );
};

export default HomeMobile;
