import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Popover,
  MenuItem,
  IconButton,
  Alert,
  Collapse,
  TextField,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import dayjs from "dayjs";
import { STATES, WEEKDAYS } from "./constant";

const DesktopAvailability = () => {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today.month());
  const [currentYear, setCurrentYear] = useState(today.year());
  const [selectedDates, setSelectedDates] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedDates, setClickedDates] = useState([]);
  const [showInfo, setShowInfo] = useState(true);

  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [rangeStatus, setRangeStatus] = useState("");
  const [selectedWeekdaysInRange, setSelectedWeekdaysInRange] = useState([]);

  const startOfMonth = dayjs().year(currentYear).month(currentMonth).startOf("month");
  const daysInMonth = startOfMonth.daysInMonth();
  const startDay = startOfMonth.day();

  const handleDayClick = (event, date) => {
    if (dayjs(date).isBefore(today, "day")) return;
    if (!clickedDates.includes(date)) {
      setClickedDates((prev) => [...prev, date]);
    } else {
      setClickedDates((prev) => prev.filter((d) => d !== date));
    }
    setAnchorEl(event.currentTarget);
  };

  const handleStateChange = (stateKey) => {
    setSelectedDates((prev) => {
      const updated = { ...prev };
      clickedDates.forEach((date) => {
        updated[date] = stateKey;
      });
      return updated;
    });
    setClickedDates([]);
    setAnchorEl(null);
  };

  const applyRangeWeekdayStatus = () => {
    if (!rangeStart || !rangeEnd || !rangeStatus || selectedWeekdaysInRange.length === 0) return;
    const start = dayjs(rangeStart);
    const end = dayjs(rangeEnd);
    if (end.isBefore(start)) return;
    const updated = { ...selectedDates };
    for (let d = start; d.isBefore(end.add(1, "day")); d = d.add(1, "day")) {
      if (d.isBefore(today, "day")) continue;
      if (selectedWeekdaysInRange.includes(d.day())) {
        updated[d.format("YYYY-MM-DD")] = rangeStatus;
      }
    }
    setSelectedDates(updated);
    setRangeStart("");
    setRangeEnd("");
    setRangeStatus("");
    setSelectedWeekdaysInRange([]);
  };

  const getDayState = (date) => {
    const dayObj = dayjs(date);
    if (dayObj.isBefore(today, "day")) return null;
    return selectedDates[date];
  };

  const nextMonth = () => {
    const next = dayjs().year(currentYear).month(currentMonth).add(1, "month");
    setCurrentMonth(next.month());
    setCurrentYear(next.year());
  };

  const prevMonth = () => {
    const prev = dayjs().year(currentYear).month(currentMonth).subtract(1, "month");
    if (prev.isBefore(today.startOf("month"))) return;
    setCurrentMonth(prev.month());
    setCurrentYear(prev.year());
  };

  const handleWeekdayToggle = (dayIndex) => {
    setSelectedWeekdaysInRange((prev) =>
      prev.includes(dayIndex) ? prev.filter((d) => d !== dayIndex) : [...prev, dayIndex]
    );
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1300, mx: "auto" }}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 3,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 3,
          bgcolor: "#fff",
          border: "1px solid #dcdbdbff",
        }}
      >
        {/* Calendar Section */}
        <Box sx={{ flex: 2 }}>
          <Collapse in={showInfo}>
            <Alert
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setShowInfo(false)}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Click on a date to set your availability or use the range/weekday options!
            </Alert>
          </Collapse>

          {/* Calendar Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: "center" }}>
            <IconButton onClick={prevMonth}><ArrowBack /></IconButton>
            <Typography variant="h5" fontWeight="bold">
              {dayjs().month(currentMonth).format("MMMM")} {currentYear}
            </Typography>
            <IconButton onClick={nextMonth}><ArrowForward /></IconButton>
          </Box>

          {/* Weekdays */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 68px)", gap: 1.5 }}>
              {WEEKDAYS.map((day) => (
                <Typography
                  key={day}
                  sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "text.secondary",
                    width: 68,
                  }}
                >
                  {day}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Days */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 68px)", gap: 1.5 }}>
              {Array.from({ length: startDay }).map((_, i) => (
                <Box key={`empty-${i}`} sx={{ width: 68, height: 68 }} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, index) => {
                const date = startOfMonth.date(index + 1).format("YYYY-MM-DD");
                const stateKey = getDayState(date);
                const state = STATES[stateKey] || {};
                const isPast = dayjs(date).isBefore(today, "day");
                const isSelected = clickedDates.includes(date);

                return (
                  <Paper
                    key={date}
                    onClick={(e) => !isPast && handleDayClick(e, date)}
                    sx={{
                      width: 68,
                      height: 68,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      cursor: isPast ? "default" : "pointer",
                      bgcolor: isPast
                        ? "#f5f5f5"
                        : isSelected
                          ? "#e3f2fd"
                          : state.color || "#fff",
                      color: isPast ? "text.disabled" : "text.primary",
                      border: "1px solid",
                      borderColor: isSelected ? "#90caf9" : "#e0e0e0",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      transition: "0.2s",
                      "&:hover": {
                        boxShadow: isPast ? "none" : 3,
                        transform: isPast ? "none" : "scale(1.04)",
                      },
                    }}
                  >
                    {index + 1}
                  </Paper>
                );
              })}
            </Box>
          </Box>

          {/* Legend */}
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
              {Object.values(STATES).map((state) => (
                <Chip
                  key={state.label}
                  label={state.label}
                  size="small"
                  sx={{
                    bgcolor: state.color,
                    color: "#fff",
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Divider between calendar and side panel */}
        <Divider orientation="vertical" flexItem />

        {/* Side Panel */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            borderRadius: 2,
            bgcolor: "#fafafa",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mt={1} mb={4}>
            Quick Actions
          </Typography>

          <TextField
            label="Start Date"
            type="date"
            value={rangeStart}
            onChange={(e) => setRangeStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="End Date"
            type="date"
            value={rangeEnd}
            onChange={(e) => setRangeEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <Typography variant="subtitle2" fontWeight="600">
            Apply on weekdays:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {WEEKDAYS.map((day, idx) => (
              <Button
                key={day}
                variant={selectedWeekdaysInRange.includes(idx) ? "contained" : "outlined"}
                onClick={() => handleWeekdayToggle(idx)}
                sx={{ textTransform: "none", fontSize: "0.75rem", px: 1.5 }}
              >
                {day}
              </Button>
            ))}
          </Box>

          <TextField
            select
            label="Status"
            value={rangeStatus}
            onChange={(e) => setRangeStatus(e.target.value)}
            fullWidth
          >
            {Object.entries(STATES).map(([key, state]) => (
              <MenuItem key={key} value={key}>
                {state.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            onClick={applyRangeWeekdayStatus}
            fullWidth
            sx={{ mt: 1 }}
          >
            Apply
          </Button>
        </Box>
      </Paper>

      {/* Popover for date state selection */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Box sx={{ p: 1, minWidth: 160 }}>
          {Object.entries(STATES).map(([key, state]) => (
            <MenuItem key={key} onClick={() => handleStateChange(key)}>
              {state.label}
            </MenuItem>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default DesktopAvailability;
