import { Box, Stack, Avatar, Typography, Divider, Button } from "@mui/material";
import { CalendarBlankIcon, ClockIcon, MapPinIcon } from "@phosphor-icons/react";
import { useState } from "react";
import plumbingImg from "@/assets/Images/plumbingImg.png";
import BookingInfoModal from "@/features/Bookings/BookingInfoModal";

const MyBookingsCard = ({
  service,
  date,
  time,
  worker,
  actionLabel,
  onActionClick,
  showRateButton = false,
  onRateClick,
  specialInstruction,
  fullAddress,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const bookingData = {
    service,
    date,
    time,
    worker,
    specialInstruction,
    fullAddress,
  };

  const handleCardClick = (e) => {
    // Prevent modal from opening when buttons are clicked
    if (e.target.closest('button')) return;
    setModalOpen(true);
  };

  return (
    <>
      <Box
        onClick={handleCardClick}
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          p: 2,
          mb: 2,
          ml: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          maxWidth: 600,
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
          },
        }}
      >
        {/* Top Section */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            variant="rounded"
            src={plumbingImg}
            sx={{ width: 64, height: 64 }}
          />
          <Box flex={1}>
            <Typography fontWeight={600} fontSize={16}>
              {service}
            </Typography>

            <Stack direction="row" spacing={2} mt={0.5}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CalendarBlankIcon size={14} />
                <Typography fontSize={13}>{date}</Typography>
              </Stack>

              <Stack direction="row" spacing={0.5} alignItems="center">
                <ClockIcon size={14} />
                <Typography fontSize={13}>{time}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        {/* Worker & Actions */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src={worker.avatar} alt={worker.name} sx={{ width: 40, height: 40 }} />
          <Box flex={1}>
            <Typography fontSize={14} fontWeight={600}>
              {worker.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.2}>
              <MapPinIcon size={14} color="grey" />
              <Typography fontSize={12} color="grey.600">
                {worker.location}
              </Typography>
            </Stack>
          </Box>

          {/* Action Buttons */}
          {showRateButton && (
            <Button
              variant="outlined"
              size="small"
              onClick={onRateClick}
              sx={{ textTransform: "none", fontSize: 12, px: 2, py: 0.5, borderRadius: 20 }}
            >
              Rate Service
            </Button>
          )}

          {actionLabel && (
            <Button
              variant="contained"
              size="small"
              onClick={onActionClick}
              sx={{ textTransform: "none", fontSize: 12, px: 2, py: 0.5, borderRadius: 20 }}
            >
              {actionLabel}
            </Button>
          )}
        </Stack>
      </Box>

      <BookingInfoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        bookingData={bookingData}
      />
    </>
  );
};

export default MyBookingsCard;