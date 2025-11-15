import {
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  Stack,
  Avatar,
  useTheme,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import PhoneIcon from "@mui/icons-material/Phone";
import MobHeading from "@/components/Mobile/MobileHeading";
import { useLocation } from "react-router-dom";
import { bookingsData } from "@/components/Desktop/MyBookings/BookingsData";

const MobBookingInfo = () => {
  const theme = useTheme();
  const location = useLocation();
  const booking = location.state || {};

  const service = booking.service || "NA";
  const date = booking.date || "NA";
  const time = booking.time || "NA";
  const worker = booking.worker || {};
  const status = booking.status || "NA";
  const fullAddress = booking.fullAddress || "NA";
  const specialInstruction = booking.specialInstruction || "NA";

  return (
    <Grid container>
      <MobHeading Heading="Booking info" />

      <Box sx={{ mt: 6, p: 2, width: "100%" }}>
        {/* Profile Header */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{ width: 66, height: 66, borderRadius: 0.5 }}
            src={worker.avatar || "NA"}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                {worker.name || "NA"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                <StarIcon sx={{ color: "#FFC107", fontSize: 18 }} />
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>4.7</Typography>
              </Box>
            </Box>

            <Stack direction="row" alignItems="center" spacing={0.5} mb={0.9}>
              <LocationOnIcon sx={{ fontSize: 16, color: "gray" }} />
              <Typography sx={{ fontSize: 12, color: "gray" }}>
                {worker.location || "NA"}
              </Typography>
            </Stack>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography fontSize={14} fontWeight={550}>
                Booking Confirmed by worker
              </Typography>
              <VerifiedIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
            </Box>
          </Box>
        </Stack>

        {/* Booking Details */}
        <Box
          sx={{
            py: 3,
            px: 2,
            mt: 2,
            border: "1px solid rgba(226, 223, 223, 1)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: 1,
            backgroundColor: "#fff",
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
            Your Booking
          </Typography>

          <Stack spacing={1.5}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <CalendarTodayIcon sx={{ fontSize: 20, color: "gray" }} />
                <Typography sx={{ fontSize: 15, ml: 1 }}>Date</Typography>
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{date}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <AccessTimeIcon sx={{ fontSize: 20, color: "gray" }} />
                <Typography sx={{ fontSize: 15, ml: 1 }}>Timeslot</Typography>
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{time}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <PersonIcon sx={{ fontSize: 20, color: "gray" }} />
                <Typography sx={{ fontSize: 15, ml: 1 }}>Worker</Typography>
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                {worker.name || "NA"}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <BuildIcon sx={{ fontSize: 20, color: "gray" }} />
                <Typography sx={{ fontSize: 15, ml: 1 }}>Service</Typography>
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{service}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <PhoneIcon sx={{ fontSize: 20, color: "gray" }} />
                <Typography sx={{ fontSize: 15, ml: 1 }}>Phone</Typography>
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                {worker.phone || "NA"}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={1.5}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Full Address
              </Typography>
              <Typography fontSize={15} fontWeight={550}>
                {fullAddress}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Special Instruction
              </Typography>
              <Typography fontSize={15} fontWeight={550}>
                {specialInstruction}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Conditional Buttons */}
        {status === "in-progress" && (
  <Stack
    direction="row"
    spacing={2} // gap between buttons
    width="100%"
    mt={3} // margin top
    px={2} // padding left/right
  >
    <Button
      variant="outlined"
      sx={{ flex: 1, color: "black", fontSize: 14 }}
    >
      Cancel
    </Button>
    <Button
      variant="contained"
      sx={{ flex: 1, textTransform: "none", fontSize: 14 }}
    >
      Mark as completed
    </Button>
  </Stack>
)}

      </Box>
    </Grid>
  );
};

export default MobBookingInfo;
