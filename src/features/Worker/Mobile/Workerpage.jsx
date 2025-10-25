import {
  Grid,
  Typography,
  Avatar,
  Box,
  Button,
  Alert,
  Fade,
  IconButton,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AlertMessage from "@/components/Desktop/BookingAlert";

import {
  MapPin as MapPinIcon,
  Share2 as ShareNetworkIcon,
  Heart as HeartIcon,
} from "lucide-react";

import UserSpecificBooking from "@/features/Bookings/UserSpecificBooking";
import WorkerTopTab from "@/features/Worker/Mobile/components/WorkerTopTab";
import WorkerBottomLinks from "@/features/Worker/Mobile/components/WorkerBottomLinks";

import { workerProfile } from "@/features/Worker/constants";

const Workerpage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const {
    name = workerProfile.name,
    img = workerProfile.img,
    selectedService = "",
  } = location.state || {};

  return (
    <Grid container sx={{ bgcolor: "white" }}>
      {/* Banner */}
      <Box sx={{ width: "100%", bgcolor: "#fff" }}>
        <Box sx={{ position: "relative", width: "100%" }}>
          <img
            src={workerProfile.bannerImage}
            alt="Top Banner"
            style={{ width: "100%", height: 140, objectFit: "cover" }}
          />

          {/* Back Arrow */}
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: "rgba(0,0,0,0.4)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: 20 }} />
          </IconButton>

          {/* Right Icons */}
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
              }}
            >
              <ShareNetworkIcon size={17} color="#0030CC" />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
              }}
            >
              <HeartIcon size={17} color="#ff0000ff" />
            </IconButton>
          </Box>
        </Box>

        {/* Avatar */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: -7 }}>
          <Avatar
            src={img}
            sx={{
              width: 95,
              height: 95,
              border: "3px solid #fff",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            }}
          />
        </Box>

        {/* Name & Username */}
        <Box textAlign="center" mt={0.5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={0.5}
          >
            <Typography
              sx={{ fontSize: 23, fontWeight: "600", color: "black" }}
            >
              {name}
            </Typography>
            <VerifiedIcon sx={{ color: "#278405ff", fontSize: 22 }} />
          </Box>

          <Box display="flex" justifyContent="center" gap={1} mt={1}>
            <Typography fontSize={14} color="gray">
              {workerProfile.phone}
            </Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              <MapPinIcon size={16} color="#555" />
              <Typography fontSize={14} color="gray">
                {workerProfile.location}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* About */}
        <Box px={3} mt={1} mb={1.5} textAlign="center">
          <Typography fontSize={14} color="black" fontWeight="450">
            {workerProfile.about}
          </Typography>
        </Box>

        {/* Book Button */}
        <Box display="flex" justifyContent="center" pb={1}>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              bgcolor: "#0b134aff",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 1,
              px: 12,
              textTransform: "none",
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>

      {/* Top Tabs */}
      <Box mt={1} width="100%">
        <WorkerTopTab service={selectedService} setIsAlert={setIsAlert} />
      </Box>

      {/* Alert */}
      <AlertMessage isAlert={isAlert} />

      {/* Modals */}
      <UserSpecificBooking
        open={open}
        setIsAlert={setIsAlert}
        setOpen={setOpen}
      />
      <WorkerBottomLinks open={linksOpen} onClose={() => setLinksOpen(false)} />
    </Grid>
  );
};

export default Workerpage;
