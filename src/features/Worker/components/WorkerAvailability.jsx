import React from "react";
import { Box, Typography, Paper, Divider, Chip } from "@mui/material";
import dayjs from "dayjs";
import { STATES, WEEKDAYS } from "../../WorkerPage/Availability/constant";

const WorkerAvailability = ({ availability = {} }) => {
  const today = dayjs();
  const currentMonth = today.month();
  const currentYear = today.year();

  const startOfMonth = dayjs().year(currentYear).month(currentMonth).startOf("month");
  const daysInMonth = startOfMonth.daysInMonth();
  const startDay = startOfMonth.day();

  const getDayState = (date) => availability[date];

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          Availability
        </Typography>

        {/* Month Title */}
        <Typography
          variant="body1"
          fontWeight={600}
          align="center"
          sx={{ mb: 2 }}
        >
          {dayjs().month(currentMonth).format("MMMM")} {currentYear}
        </Typography>

        {/* Weekdays */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 32px)",
              gap: 0.7,
            }}
          >
            {WEEKDAYS.map((day) => (
              <Typography
                key={day}
                sx={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "0.65rem",
                  color: "#666",
                }}
              >
                {day}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Days */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 32px)",
              gap: 0.7,
            }}
          >
            {/* Empty */}
            {Array.from({ length: startDay }).map((_, i) => (
              <Box key={`empty-${i}`} sx={{ width: 32, height: 32 }} />
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const date = startOfMonth.date(index + 1).format("YYYY-MM-DD");
              const stateKey = getDayState(date);
              const state = STATES[stateKey] || {};

              return (
                <Paper
                  key={date}
                  sx={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    bgcolor: state.color || "#fff",
                    border: "1px solid #e0e0e0",
                    fontWeight: 500,
                    fontSize: "0.75rem",
                  }}
                >
                  {index + 1}
                </Paper>
              );
            })}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Legend */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {Object.values(STATES).map((state) => (
            <Chip
              key={state.label}
              label={state.label}
              size="small"
              sx={{
                bgcolor: state.color,
                color: "#fff",
                fontWeight: 500,
                height: 22,
              }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default WorkerAvailability;
