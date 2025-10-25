import React from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Button,
  Grid,
  Card,
  Divider,
} from "@mui/material";
import {
  BellIcon,
  MapPinIcon,
  CalendarBlankIcon,
  ClockIcon,
  SuitcaseSimpleIcon,
  CalendarCheckIcon,
  BankIcon,
  UserIcon,
  PencilSimpleIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import plumbingImg from "@/assets/Images/plumbingImg.png";
import AdvertisementCarousel from "@/features/Advertisment/AdvertismentCarousel/AdvertisementCarousal";
import WorkerBottomBar from "./workerBottomBar";
import { RouteProvider } from "@/config/RouteProvider";

const WorkerMainPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#06113C", minHeight: "100vh" }}>
      {/* Top Bar */}
      <Box
        sx={{
          bgcolor: "#06113C",
          color: "#fff",
          p: 2,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box display="flex">
            {/* Location */}
            <MapPinIcon size={20} />
            <Box display="flex" flexDirection="column" ml={1}>
              <Typography
                variant="caption"
                color="white"
                sx={{ lineHeight: 1, fontSize: 11 }}
              >
                Current Location
              </Typography>
              <Grid container>
                <Typography
                  sx={{ fontWeight: "550", fontSize: 14, color: "white" }}
                >
                  Thrissur, Kerala
                </Typography>
              </Grid>
            </Box>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={() => navigate(RouteProvider.USER_SETTINGS_NOTIFICATION)}
            >
              <BellIcon size={22} color="white" />
            </IconButton>
            <Avatar
              onClick={() => navigate(RouteProvider.USER_PROFILE)}
              sx={{ width: 32, height: 32 }}
              src={"https://randomuser.me/api/portraits/men/83.jpg"}
            />
          </Stack>
        </Box>
        <Stack>
          <Typography fontSize={16} fontWeight={600} color="white">
            Hi, Athul Murali T
          </Typography>
          <Typography fontSize={11} color="#ccc">
            Welcome to Archisans
          </Typography>
        </Stack>
      </Box>

      <Grid
        sx={{
          bgcolor: "rgba(246, 247, 255, 1)",
          borderRadius: "8px 8px 0 0",
          mb: 9,
        }}
      >
        {/* Action Buttons */}

        <Box>
          <Grid container justifyContent="space-around" pt={3} px={1}>
            {[
              {
                text: "My Works",
                icon: <SuitcaseSimpleIcon size={30} color="white" />,
                onClick: () => navigate(RouteProvider.WORKER_ASSIGNED_WORKS), // 👈
              },
              {
                text: "Availability",
                icon: <CalendarCheckIcon size={30} color="white" />,
                onClick: () => navigate(RouteProvider.WORKER_AVAILABILITY),
              },
              {
                text: "Portfolio",
                icon: <BankIcon size={30} color="white" />,
                onClick: () => navigate(RouteProvider.WORKER_PORTFOLIO),
              },
              {
                text: "Work Profile",
                icon: (
                  <Box position="relative" display="inline-block">
                    <UserIcon size={30} color="#fff" />
                    <PencilSimpleIcon
                      size={18}
                      color="#ffffff"
                      style={{
                        zIndex: 1,
                        position: "absolute",
                        bottom: 2,
                        right: -5,
                      }}
                    />
                  </Box>
                ),
                onClick: () => {
                  navigate(RouteProvider.WORKER_PROFILE);
                },
              },
            ].map(({ text, icon, onClick }, idx) => (
              <Grid
                item
                xs={3}
                key={idx}
                textAlign="center"
                onClick={onClick} // 👈
                sx={{ cursor: onClick ? "pointer" : "default" }} // 👈 pointer only if clickable
              >
                <Avatar
                  sx={{
                    bgcolor: "#2a30a0ff",
                    width: 55,
                    height: 55,
                    mx: "auto",
                    boxShadow: "0px 2px 6px rgba(11, 31, 184, 0.5)",
                  }}
                >
                  {icon}
                </Avatar>
                <Typography fontSize={12} mt={1}>
                  {text}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* My Service */}
        <Box mt={4} pl={1} mb={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={600}>My Service</Typography>
            {/* <Typography fontSize={12} color="primary" mr={1}>
                            View All
                        </Typography> */}
          </Stack>

          <Box
            mt={1}
            sx={{
              display: "flex",
              gap: 1,
              overflowX: "auto",
              pb: 1,
              mr: 0.5,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {[
              { title: "Plumbing Service" },
              { title: "Electrical Service" },
              { title: "Carpentry Service" },
              { title: "Painting Service" },
              { title: "Cleaning Service" },
            ].map((service, idx) => (
              <Card
                key={idx}
                sx={{
                  minWidth: 130,
                  maxWidth: 150,
                  flex: "0 0 auto",
                  p: 1,
                  bgcolor: "#fff",
                  borderRadius: 1,
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                  cursor: "pointer", // show pointer on hover
                  transition: "0.3s",
                  "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.2)" },
                }}
                onClick={() =>
                  navigate(RouteProvider.WORKER_SERVICE_DETAILS, {
                    state: { serviceTitle: service.title },
                  })
                }
              >
                <img
                  src={plumbingImg} // Replace with dynamic image if needed
                  alt={service.title}
                  style={{ width: "100%", borderRadius: 8 }}
                />
                <Typography fontSize={12} fontWeight={600}>
                  {service.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <StarIcon size={10} weight="fill" color="#FFB400" />
                  <Typography fontSize={10} color="grey" mx={0.5}>
                    4.8
                  </Typography>
                  <Typography sx={{ fontSize: 8 }}>(320 reviews)</Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Ads */}
        <AdvertisementCarousel />

        {/* New Requests */}
        <Box mt={2} px={2} mb={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={600}>New Requests</Typography>
            <Typography fontSize={12} color="primary">
              View All
            </Typography>
          </Stack>

          {[1, 2].map((_, idx) => (
            <Box
              key={idx}
              sx={{
                bgcolor: "#fff",
                borderRadius: 1,
                p: 2,
                mt: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // stronger shadow
                // removed border
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  variant="rounded"
                  src={plumbingImg}
                  sx={{ width: 56, height: 56 }}
                />
                <Box flex={1}>
                  <Typography fontWeight={650}>Plumbing</Typography>
                  <Stack direction="row" spacing={1} mt={0.5}>
                    <CalendarBlankIcon size={14} />
                    <Typography fontSize={12}>Sunday, 12 June</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} mt={0.5}>
                    <ClockIcon size={14} />
                    <Typography fontSize={12}>11:00 – 12:00 AM</Typography>
                  </Stack>
                </Box>
              </Stack>
              <Divider
                sx={{ my: 2, height: 2, color: "rgba(243, 235, 235, 1)" }}
              />
              <Box mt={2}>
                <Box justifyContent="space-between" alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Avatar
                      src="https://randomuser.me/api/portraits/men/45.jpg"
                      alt="Daison Babu"
                      sx={{ width: 40, height: 40 }}
                    />

                    <Box sx={{ flex: 1 }}>
                      <Typography fontSize={14} fontWeight={600}>
                        Daison Babu
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          mt: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <MapPinIcon size={14} color="grey" />
                          <Typography fontSize={12} color="grey">
                            Palakkad
                          </Typography>
                        </Box>

                        <Typography
                          fontSize={10}
                          sx={{
                            bgcolor: "#E0F7FA",
                            display: "inline-block",
                            px: 1,
                          }}
                        >
                          New Request
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ color: "black", fontSize: 14, px: 5 }}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        fontSize: 14,
                        px: 5,
                      }}
                    >
                      Accept
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>
      <WorkerBottomBar />
    </Box>
  );
};

export default WorkerMainPage;
