import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  Divider,
  Stack,
  Avatar,
  useTheme,
  IconButton,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import PhoneIcon from "@mui/icons-material/Phone";

const BookingInfoModal = ({ open, onClose, bookingData }) => {
  const theme = useTheme();

  if (!bookingData) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
          Booking Info
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 0 }}>
        {/* Worker Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar
            sx={{ width: 60, height: 60 }}
            src={bookingData.worker.avatar}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.5,
              }}
            >
              <Typography sx={{ fontSize: 17, fontWeight: 600 }}>
                {bookingData.worker.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <StarIcon sx={{ color: "#FFC107", fontSize: 18 }} />
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                  {bookingData.worker.rating || "4.7"}
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <LocationOnIcon sx={{ fontSize: 15, color: "gray" }} />
              <Typography sx={{ fontSize: 13, color: "gray" }}>
                {bookingData.worker.location}
              </Typography>
            </Stack>

            <Box display="flex" alignItems="center" gap={1} mt={0.7}>
              <Typography fontSize={13} fontWeight={500}>
                Booking Confirmed by worker
              </Typography>
              <VerifiedIcon
                sx={{ color: theme.palette.primary.main, fontSize: 18 }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Booking Details */}
        <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
          Your Booking
        </Typography>

        <Stack spacing={1.8}>
          {[
            { icon: <CalendarTodayIcon />, label: "Date", value: bookingData.date },
            { icon: <AccessTimeIcon />, label: "Timeslot", value: bookingData.time },
            { icon: <PersonIcon />, label: "Worker", value: bookingData.worker.name },
            { icon: <BuildIcon />, label: "Service", value: bookingData.service },
            {
              icon: <PhoneIcon />,
              label: "Phone",
              value: bookingData.worker.phone || "9864251275",
            },
          ].map((item, idx) => (
            <Box
              key={idx}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" gap={1}>
                {React.cloneElement(item.icon, {
                  sx: { fontSize: 18, color: "gray" },
                })}
                <Typography sx={{ fontSize: 14 }}>{item.label}</Typography>
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Additional Info */}
        <Stack spacing={1.5}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Special Instruction
            </Typography>
            <Typography fontSize={14} fontWeight={500}>
              {bookingData.specialInstruction ||
                "Gate is locked, call on arrival"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              City / Area
            </Typography>
            <Typography fontSize={14} fontWeight={500}>
              {bookingData.fullAddress ||
                `${bookingData.worker.location}, National Studio`}
            </Typography>
          </Box>
        </Stack>

        {/* Action Buttons */}
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 4 }}
        >
          <Button
            variant="outlined"
            sx={{ color: "black", fontSize: 14, px: 4 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              fontSize: 14,
              px: 4,
            }}
          >
            Mark as completed
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookingInfoModal;
