import React from "react";
import { Box, Stack, Typography, Divider, Button, Avatar } from "@mui/material";

import {
  CalendarBlankIcon,
  ClockIcon,
  MapPinIcon,
} from "@phosphor-icons/react";

import plumbingImg from "@/assets/Images/plumbingImg.png";

const MobActiveJobs = () => {
  return (
    <Box mt={2} px={2} mb={4}>
      {[1, 2].map((_, idx) => (
        <Box
          key={idx}
          sx={{
            bgcolor: "#fff",
            borderRadius: 1,
            p: 2,
            mt: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
          <Divider sx={{ my: 2, height: 2, color: "rgba(243, 235, 235, 1)" }} />
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
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
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
                      Active
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
                  Complete
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MobActiveJobs;
3;
