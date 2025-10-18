import { Box, Stack, Avatar, Typography, Divider, Button } from "@mui/material";
import { CalendarBlankIcon, ClockIcon, MapPinIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import plumbingImg from "@/assets/Images/plumbingImg.png";
import { RouteProvider } from "@/config/RouteProvider";

const BookingCard = ({
  service,
  date,
  time,
  worker,
  actionLabel,
  onActionClick,
  showRateButton = false,
  onRateClick,
  status,  
}) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() =>
        navigate(RouteProvider.USER_BOOKINGS_INFO, {
          state: { service, date, time, worker, status }, 
        })
      }
      sx={{
        bgcolor: "#fff",
        borderRadius: 1,
        p: 2,
        mt: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "0.2s ease",
        "&:hover": {
          boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
          transform: "scale(1.01)",
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar variant="rounded" src={plumbingImg} sx={{ width: 56, height: 56 }} />
        <Box flex={1}>
          <Typography fontWeight={650}>{service}</Typography>
          <Stack direction="row" spacing={1} mt={0.5}>
            <CalendarBlankIcon size={14} />
            <Typography fontSize={12}>{date}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} mt={0.5}>
            <ClockIcon size={14} />
            <Typography fontSize={12}>{time}</Typography>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ my: 2, height: 2, color: "rgba(243, 235, 235, 1)" }} />

      <Box mt={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar src={worker.avatar} alt={worker.name} sx={{ width: 40, height: 40 }} />
          <Box flex={1}>
            <Typography fontSize={14} fontWeight={600}>
              {worker.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
              <MapPinIcon size={14} color="grey" />
              <Typography fontSize={12} color="grey">
                {worker.location}
              </Typography>
            </Stack>
          </Box>

          {showRateButton && (
            <Button
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation
                onRateClick();
              }}
            >
              <Typography sx={{ fontSize: "0.8em", color: "white" }}>
                Rate Service
              </Typography>
            </Button>
          )}

          {actionLabel && (
            <Button
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation
                onActionClick();
              }}
            >
              <Typography sx={{ fontSize: "0.8em", color: "white" }}>
                {actionLabel}
              </Typography>
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default BookingCard;
