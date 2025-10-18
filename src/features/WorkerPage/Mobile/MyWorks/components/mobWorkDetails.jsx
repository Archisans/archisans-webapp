import React from 'react'
import {
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Stack,
  Avatar
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import PhoneIcon from "@mui/icons-material/Phone";
import MobHeading from "@/components/Mobile/mobileHeading";

const MobWorkDetails = () => {
  // const theme = useTheme();

  return (
    <Grid container>
      <MobHeading Heading="Work Details" />

      <Box sx={{ p: 2, width: "100%" }}>
        {/* Profile Header */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{ width: 66, height: 66, borderRadius: 0.5 }}
            src="https://randomuser.me/api/portraits/men/83.jpg"
          />
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                Daison Babu
              </Typography>

            </Box>

            <Stack direction="row" alignItems="center" spacing={0.5} mb={0.9}>
              <LocationOnIcon sx={{ fontSize: 16, color: "gray" }} />
              <Typography sx={{ fontSize: 12, color: "gray" }}>
                Thrissur, Kerala
              </Typography>
            </Stack>

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
            backgroundColor: "#fff"
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
            Work request
          </Typography>

          <Stack spacing={1.5}>
            {/* Date */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <CalendarTodayIcon sx={{ fontSize: 20, color: "gray" }} />
                <Typography sx={{ fontSize: 15, ml: 1 }}>Date</Typography>
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                12 - 14 Nov 2024
              </Typography>
            </Box>

            {/* Timeslot */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <AccessTimeIcon sx={{ fontSize: 20, color: "gray" }} />
                <Typography sx={{ fontSize: 15, ml: 1 }}>Timeslot</Typography>
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                10:00 AM - 12:00 PM
              </Typography>
            </Box>

            {/* Worker */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <PersonIcon sx={{ fontSize: 20, color: "gray" }} />
                <Typography sx={{ fontSize: 15, ml: 1 }}>Client</Typography>
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                Daison Babu
              </Typography>
            </Box>

            {/* Service */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <BuildIcon sx={{ fontSize: 20, color: "gray" }} />
                <Typography sx={{ fontSize: 15, ml: 1 }}>Service</Typography>
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                Plumbing
              </Typography>
            </Box>

            {/* Phone */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <PhoneIcon sx={{ fontSize: 20, color: "gray" }} />
                <Typography sx={{ fontSize: 15, ml: 1 }}>Phone</Typography>
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                9864251275
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Additional Info */}
          <Stack spacing={1.5}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Special Instruction
              </Typography>
              <Typography fontSize={15} fontWeight={550}>
                Gate is locked, call on arrival
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                City / Area
              </Typography>
              <Typography fontSize={15} fontWeight={550}>
                Thrissur, Arnattukara, National Studio
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', mt: 1, mx: 2.5 }}>
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

    </Grid>
  );
};


export default MobWorkDetails