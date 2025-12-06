import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
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
import { useUser } from "@/context/UserContext";
import ProfileDrawer from "./Components/ProfileDrawer";
import LoginDrawer from "@/components/Mobile/LoginDrawer";
import Footer from "./Components/Footer";
import PopularServices from "./Components/PopularServices";
import AdvertisementCarousel from "./Components/AdvertisementCarousal";
import MobMainHeader from "@/components/Mobile/MainHeader";

const HomeMobile = ({ bootstrapConfiguration }) => {
  const navigate = useNavigate();
  const { profile, isSignedIn, isWorker } = useUser();
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
              <MobMainHeader />

              {/* Search */}
              <Box sx={{ px: 2, mb: 1, pb: 1.5 }}>
                <SearchBar />
              </Box>

              {/* Banner */}
              <AdvertisementCarousel
                advertisements={bootstrapConfiguration?.advertisements?.central}
              />
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
            color: "primary.content.dark",
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
      {!isWorker && (
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
      )}

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
