import {
  KeyboardArrowDownOutlined,
  LocationOnOutlined,
  NotificationsNoneOutlined,
  StarOutline,
} from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Typography, Button } from "@mui/material";
import { color, ServiceList, textDecoration } from "../../Home/Mobile/constants";
import { ServiceLayer } from "./ServiceLayer";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import AddressDrawer from "../Address/AddressSelectBottomDrawer/AddressDrawer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArchisansWorker from "../../../../assets/ArchisansWorker.jpg";
import AdvertisementCarousal from "./AdvertisementCarousal";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function OldHome() {

  const workers = [
    {
      name: "Akhil Raj",
      location: "Kozhikode",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
      rating: 4.8,
    },
    {
      name: "Bhaskaran",
      location: "Palakkad",
      img: "https://randomuser.me/api/portraits/men/12.jpg",
      rating: 4.6,
    },
    {
      name: "Nikhil Babu",
      location: "Ernakulam",
      img: "https://randomuser.me/api/portraits/men/35.jpg",
      rating: 4.9,
    },
    {
      name: "Santhosh",
      location: "Thrissur",
      img: "https://randomuser.me/api/portraits/men/49.jpg",
      rating: 5.0,
    },
  ];

  const navigate = useNavigate();

  //animation in search bar

  const TypewriterText = () => {
    const fullText = "Job title, keyword, worker";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const typingSpeed = 90;
      const delayBeforeRepeat = 1200;

      if (index < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + fullText.charAt(index));
          setIndex((prev) => prev + 1);
        }, typingSpeed);

        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedText("");
          setIndex(0);
        }, delayBeforeRepeat);

        return () => clearTimeout(timeout);
      }
    }, [index]);

    return (
      <Typography
        sx={{ color: "#c0c0c0", fontSize: "0.9em", whiteSpace: "nowrap" }}
      >
        {displayedText}
        <Box
          component="span"
          sx={{
            display: "inline-block",
            width: "6px",
            bgcolor: "#c0c0c0",
            ml: 0.5,
          }}
        />
      </Typography>
    );
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (isOpen) => {
    setOpen(isOpen);
  };
  return (
    <Grid container size={12}>
      {/* Top part with search bar and information */}
      <Grid
        container
        size={12}
        sx={{
          height: "18vh",
          background: `linear-gradient(
      to bottom left,
      rgb(223, 168, 134),
      rgba(120, 82, 54, 0.91),
      rgb(60, 37, 25)
    )`,
          position: "relative",
        }}
        justifyContent={"center"}
        overflow={"hidden"}
        mb={2}
      >
        {/* Top Header information container */}
        {/* <Box
          sx={{
            width: "70%",
            height: "18vh",
            bgcolor: color.dark,
            borderRadius: "0px 1000px 1000px 0px",
            position: "absolute",
            top: -10,
            left: -20,
            zIndex: 0,
          }}
        /> */}
        <Grid
          container
          direction={"row"}
          sx={{ position: "relative", zIndex: 1 }}
          mt={1}
          alignItems={"center"}
          spacing={2}
          size={12}
          px={1}
          pb={0}
        >
          <Grid size={1}>
            <LocationOnOutlined sx={{ color: "white" }} />
          </Grid>
          <Grid flexGrow={1} size={7}>
            <Typography sx={{ ...textDecoration.headerSecondary }} onClick={() => handleOpen(true)} >
              Current Location
            </Typography>
            <Grid container>
              <Typography
                sx={{ ...textDecoration.headerPrimary, fontWeight: "bold" }}
              >
                Thrissur , Kerala
              </Typography>
              <IconButton onClick={() => handleOpen(true)} sx={{ padding: 0 }}>
                <KeyboardArrowDownOutlined sx={{ color: "white" }} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems={"center"}
            spacing={1.2}
            size={3}
            justifyContent={"space-around"}
          >
            <Link
              to="/mobile-notifications"
              style={{
                color: "inherit",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <NotificationsNoneOutlined
                sx={{ color: "white", fontSize: "25px", cursor: "pointer" }}
              />
            </Link>

            <Link
              to="/editInfo"
              style={{
                color: "inherit",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <Avatar
                src={"https://randomuser.me/api/portraits/men/83.jpg"}
                sx={{ width: "35px", height: "35px" }}
              ></Avatar>
            </Link>
          </Grid>
        </Grid>
        {/* Search bar container */}
        <SearchBar onClick={() => navigate("/mobile-Recent-Search")} />
        {/* <Box
          sx={{
            width: "10vh",
            height: "10vh",
            bgcolor: color.dark,
            borderRadius: "100%",
            position: "absolute",
            bottom: -30,
            right: -30,
            zIndex: -1000,
          }}
        /> */}
      </Grid>
      <Grid container size={12} direction={"column"}>
        <AdvertisementCarousal />

        <Grid container>
          <Grid container size={12} px={1} sx={{ height: "fit-content" }}>
            <Grid flexGrow={1}>


{/* <Grid container alignItems="center"  spacing={2} sx={{ width: "100%" }}>
      
      <Grid item xs={6}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <DotLottieReact
            src="https://lottie.host/9c0dd527-6e0a-4043-b7d1-826256f76fd9/pLxjPbrNe3.lottie"
            loop
            autoplay
            style={{ width: "500%", height: "150px" }} // adjust size as needed
          />
        </Box>
      </Grid>

      
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{
              minWidth: "40px",
              borderRadius: "50%",
              backgroundColor: "#BFA088",
            }}
          >
            &gt;
          </Button>
        </Box>
      </Grid>
    </Grid> */}

              <Typography sx={{ ...textDecoration.headingPrimaryDark }}>
                Service Category
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            columnSpacing={2}
            alignItems={"flex-start"}
            justifyContent={"center"}
            sx={{ overflow: "hidden", height: "37vh" }}
          >
            {ServiceList.slice(0, 6).map((data) => (
              <ServiceLayer key={data.name} data={data} img />
            ))}
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Grid sx={{ my: 3, px: 1 }}>
            <Box
              component="img"
              src={ArchisansWorker}
              alt="Sample"
              onClick={() => navigate("/mobile-worker-form1")}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius:1,
                cursor: "pointer", // Make it clickable
                WebkitTapHighlightColor: "transparent", // Removes mobile highlight
              }}
            />
          </Grid>
        </Grid>

        <Grid container size={12} sx={{ mt: 3 }}>
          <Grid container size={12} px={1} sx={{ height: "fit-content" }}>
            <Grid flexGrow={1}>
              <Typography sx={{ ...textDecoration.headingPrimaryDark, mb: 2 }}>
                Popular Service on Archisans
              </Typography>
            </Grid>
            <Grid>
              <Typography
                mt={0.4}
                sx={{ ...textDecoration.headingPrimaryColored }}
                onClick={() => navigate("/mobile-artisans-services")}
              >
                See all
              </Typography>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                overflowX: "auto",
                width: "100vw",
                gap: "20px",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Chrome, Safari, Edge
                },
              }}
            >
              {[...Array(4)].map((_, index) => (
                <Grid
                  key={index}
                  container
                  direction={"column"}
                  size={3}
                  sx={{
                    width: "30vh",
                    minWidth: "30vh", // Prevent shrinking
                    flexShrink: 0, // Prevent shrinking when overflowing
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                  mt={2}
                >
                  <Grid
                    size={12}
                    sx={{
                      height: "70%",
                      borderRadius: "12px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src="/assets/DummyImages/Sample-1.png"
                      style={{ width: "100%", height: "100%" }}
                      alt="Sample"
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        bgcolor: color.primary,
                        height: "1.4em",
                        width: "7em",
                        borderRadius: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{ color: color.TextColorPrimary, fontSize: "12px" }}
                      >
                        Starts @ 100$/hr
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item size={12} spacing={1} sx={{ padding: "5px" }}>
                    <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>
                      Electrical Help {index + 1}
                    </Typography>
                    <Typography sx={{ fontSize: "8px", color: "gray" }}>
                      The cost of house cleaning depends on the square footage
                      being cleaned
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          size={12}
          direction={"column"}
          p={1}
          pt={4}
          sx={{ overflow: "hidden", mt: 1 }}
        >
          <Grid container size={12} sx={{ height: "fit-content" }}>
            <Grid flexGrow={1}>
              <Typography sx={{ ...textDecoration.headingPrimaryDark, mb: 2 }}>
                Top Workers Near You
              </Typography>
            </Grid>
            <Grid>
              <Typography
                mt={0.4}
                sx={{ ...textDecoration.headingPrimaryColored }}
                onClick={() => navigate("/mobile-search-worker")}
              >
                See all
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              width: "100vw",
              gap: "10px",
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Edge
              },
            }}
          >
            {workers.map((worker, index) => (
              <Grid
                key={index}
                container
                direction="column"
                height="28vh"
                minWidth="15vh"
                mt={2}
                sx={{
                  border: "1px solid rgba(237, 237, 237, 1)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  overflow: "hidden",
                  WebkitTapHighlightColor: "transparent",
                }}
                onClick={() =>
                  navigate("/mobile-workerpage", {
                    state: {
                      name: worker.name,
                      img: worker.img,
                      location: worker.location,
                    },
                  })
                }
              >
                <Grid
                  item
                  height="50%"
                  sx={{
                    borderTopRightRadius: "12px",
                    borderTopLeftRadius: "12px",
                  }}
                >
                  <img
                    src={worker.img}
                    width="100%"
                    height="100%"
                    alt="Worker"
                  />
                </Grid>
                <Grid item container direction="column" height="40%" ml={1}>
                  <Grid
                    item
                    container
                    mt={1}
                    direction="row"
                    sx={{
                      bgcolor: "rgba(254, 252, 232, 1)",
                      width: "40px",
                      borderRadius: "6px",
                    }}
                    justifyContent="space-around"
                  >
                    <StarOutline
                      sx={{ color: "rgba(234, 179, 8, 1)", fontSize: "15px" }}
                    />
                    <Typography
                      sx={{ color: "rgba(234, 179, 8, 1)", fontSize: "12px" }}
                    >
                      {worker.rating}
                    </Typography>
                  </Grid>
                  <Grid item mt={1}>
                    <Typography
                      sx={{ color: "rgba(10, 6, 20, 1)", fontSize: "10px" }}
                    >
                      {worker.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        color: "rgba(123, 123, 123, 1)",
                        fontSize: "10px",
                      }}
                    >
                      {worker.location}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Grid>
        <Grid
          container
          direction={"column"}
          size={12}
          pt={3}
          pb={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography sx={{ color: "rgba(119, 119, 119, 1)" }}>
            Don't see what you are looking for?
          </Typography>

          <Typography
            component={Link}
            to="/mobile-service-category"
            sx={{
              color: "hsl(26, 29.10%, 56.30%)",
              textDecoration: "none",
              cursor: "pointer",
              fontWeight: 500,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            View all services
          </Typography>
        </Grid>
      </Grid>
      <AddressDrawer open={open} setOpen={setOpen} />
    </Grid>
  );
}
