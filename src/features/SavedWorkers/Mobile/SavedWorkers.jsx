import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  Stack,
  IconButton,
  Chip,
  InputBase,
  useTheme,
} from "@mui/material";
import {
  Tune,
  Search,
  LocationOnOutlined,
  ArrowBackIos,
} from "@mui/icons-material";
import {
  BellIcon,
  MapPinIcon,
  ShareNetworkIcon,
  HeartIcon,
  StarIcon,
} from "@phosphor-icons/react";

import { useNavigate } from "react-router-dom";
import UserSpecificBooking from "@/features/Bookings/UserSpecificBooking";
import { RouteProvider } from "@/config/RouteProvider";
import { WORKERS } from "@/features/SavedWorkers/constants";
import FavouriteAndShareButton from "@/components/FavouriteAndShareButton/FavouriteAndShareButton";



const WorkerCard = ({ worker, navigate, setOpen }) => {
  const theme = useTheme();
  const [saved, setSaved] = useState(true);
  return (
    <Box
      onClick={() =>
        navigate(RouteProvider.USER_WORKER_INFO, {
          state: {
            name: worker.name,
            img: worker.avatar,
          },
        })
      }
      sx={{
        mx: 2,
        mb: 2,
        borderRadius: 0.5,
        bgcolor: "#fff",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Image with Rating */}
      <Box sx={{ position: "relative", height: 110 }}>
        <img
          src={worker.image}
          alt="background"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Rating Box */}
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "rgba(255, 255, 255, 0.8)",
            borderRadius: 2,
            px: 1,
            py: 0.1,
            display: "flex",
            alignItems: "center",
            boxShadow: 2,
          }}
        >
          <StarIcon
            fontSize={12}
            weight="fill"
            color={theme.palette.primary.main}
            mb={1}
          />
          <Typography
            fontSize={11}
            fontWeight={600}
            color="black"
            ml={0.3}
            mt={0.2}
          >
            {worker.rating}
          </Typography>
          <Typography fontSize={9} fontWeight={600} color="black" mt={0.4}>
            ({worker.reviews} reviews)
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
         <Box
  sx={{
    position: "absolute",
    top: 12,
    right: 12,
    display: "flex",
    gap: 1,
  }}
>
  <FavouriteAndShareButton />
</Box>
        
        
        </Stack>
      </Box>

      {/* Info Section */}
      <Box sx={{ px: 1, py: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={worker.avatar} sx={{ height: 53, width: 53 }} />
            <Box>
              <Typography mb={0.4} fontSize={18} fontWeight={580} color="black">
                {worker.name}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <MapPinIcon size={18} />
                <Typography color="#6c6868ff" fontSize={14}>
                  {worker.location}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          {/* <Box textAlign="right" mr={1.5}>
            <Typography fontSize={15.5} color="grey">
              Starts from
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography fontSize={18} fontWeight={500} color="black">
                {worker.price}
              </Typography>
              <Typography color="grey"> /hr</Typography>
            </Box>
          </Box> */}
        </Stack>

        {/* Roles */}
        <Stack direction="row" spacing={1} mt={1} mb={1}>
          {worker.roles.map((role, i) => (
            <Chip
              key={i}
              label={role}
              size="small"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                fontWeight: 400,
                fontSize: 10,
                px: 1,
              }}
            />
          ))}
        </Stack>

        {/* Description */}
        <Typography fontSize={13} mb={1.7} ml={0.8}>
          {worker.description}
        </Typography>

        {/* Book Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            textTransform: "none",
            fontSize: 15,
            py: 0.4,
            fontWeight: 400,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

const SavedWorkers = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState();
  

  return (
    <Box sx={{ pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 2,
          px: 2,
        }}
      >
        {/* Location Info */}
        <Box display="flex" alignItems="center">
          {/* Left Side: Back Arrow + Location Info */}
          <ArrowBackIos
            sx={{ fontSize: 23, cursor: "pointer", color: "grey" }}
            onClick={() => navigate(-1)}
          />
          <Box display="flex">
            <LocationOnOutlined
              sx={{ fontSize: 25, mr: 1, mt: 0.5, color: "black" }}
            />
            <Box display="flex" flexDirection="column">
              <Typography
                variant="caption"
                color="gray"
                sx={{ lineHeight: 1, fontSize: 13 }}
              >
                Current Location
              </Typography>
              <Typography sx={{ fontWeight: "Bold", fontSize: 15 }}>
                Thrissur, Kerala
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Notification and Avatar */}
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            onClick={() => navigate(RouteProvider.USER_SETTINGS_NOTIFICATION)}
          >
            <BellIcon color="#050b5fff" />
          </IconButton>
          <Avatar
            onClick={() => navigate(RouteProvider.USER_PROFILE_EDIT)}
            sx={{ width: 32, height: 32 }}
            src="https://randomuser.me/api/portraits/men/83.jpg"
          />
        </Stack>
      </Box>

      {/* Search Bar */}
      <Box
        mt={2}
        display="flex"
        alignItems="center"
        border="1px solid #ccc"
        borderRadius={1}
        px={1}
        py={1}
        mx={1}
        mb={2}
      >
        <Search
          sx={{ mr: 1, cursor: "pointer" }}
          onClick={() => navigate(RouteProvider.USER_WORKER_SEARCH)}
        />
        <InputBase
          sx={{ fontSize: "14px" }}
          placeholder="Search Services & Workers"
          fullWidth
        />
        <Tune
          sx={{ color: "#888" }}
          onClick={() => navigate("/mobile-Search-filter")}
        />
      </Box>

      {/* Worker Cards */}
      {WORKERS.map((worker, idx) => (
        <WorkerCard
          key={idx}
          worker={worker}
          navigate={navigate}
          open={open}
          setOpen={setOpen}
        />
      ))}
      <UserSpecificBooking
        open={open}
        // setIsAlert={setIsAlert}
        setOpen={setOpen}
      />
    </Box>
  );
};

export default SavedWorkers;
