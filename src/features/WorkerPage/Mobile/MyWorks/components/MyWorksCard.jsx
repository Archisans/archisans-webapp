import React from "react";
import { Box, Stack, Typography, Divider, Avatar, Button } from "@mui/material";
import { CalendarBlankIcon, ClockIcon, MapPinIcon } from "@phosphor-icons/react";


const MyWorksCard = ({
  service,
  date,
  time,
  worker,
  status,
  showActions = false,
  onCancel,
  onComplete,
  onClick,
}) => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 1,
        p: 2,
        mt: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar variant="rounded" src={service.img} sx={{ width: 56, height: 56 }} />
        <Box flex={1}>
          <Typography fontWeight={650}>{service.name}</Typography>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src={worker.avatar} alt={worker.name} sx={{ width: 40, height: 40 }} />
          <Box sx={{ flex: 1 }}>
            <Typography fontSize={14} fontWeight={600}>
              {worker.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mt: 0.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <MapPinIcon size={14} color="grey" />
                <Typography fontSize={12} color="grey">
                  {worker.location}
                </Typography>
              </Box>
              <Typography
                fontSize={10}
                sx={{ bgcolor: "#E0F7FA", display: "inline-block", px: 1 }}
              >
                {status}
              </Typography>
            </Box>
          </Box>
        </Box>

        {showActions && (
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Button variant="outlined" sx={{ color: "black", fontSize: 14, flex: 1 }} onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ textTransform: "none", fontSize: 14, flex: 1 }} onClick={onComplete}>
              Complete
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyWorksCard;
