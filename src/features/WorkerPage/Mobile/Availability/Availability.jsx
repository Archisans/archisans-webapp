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
} from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import dayjs from "dayjs";
import MobHeading from "@/components/Mobile/mobileHeading";
import { STATES,WEEKDAYS } from "./constant";

const Availability = () => {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today.month());
  const [currentYear, setCurrentYear] = useState(today.year());
  const [selectedDates, setSelectedDates] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedDates, setClickedDates] = useState([]);
  const [showInfo, setShowInfo] = useState(true);

  // Range selection
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

  const open = Boolean(anchorEl);

  const handleWeekdayToggle = (dayIndex) => {
    setSelectedWeekdaysInRange((prev) =>
      prev.includes(dayIndex) ? prev.filter((d) => d !== dayIndex) : [...prev, dayIndex]
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 950, mx: "auto" }}>
      <MobHeading Heading="Schedule Availability" />

      <Collapse in={showInfo}>
        <Alert
          severity="info"
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={() => setShowInfo(false)}>
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Click on a date to set your availability or use the range/weekday options below!
        </Alert>
      </Collapse>

      {/* Calendar Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: "center" }}>
        <IconButton onClick={prevMonth}><ArrowBack /></IconButton>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {dayjs().month(currentMonth).format("MMMM")} {currentYear}
        </Typography>
        <IconButton onClick={nextMonth}><ArrowForward /></IconButton>
      </Box>

      {/* Weekdays */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, mb: 1 }}>
        {WEEKDAYS.map((day) => (
          <Box key={day} sx={{ textAlign: "center", fontWeight: "bold", py: 1, bgcolor: "#f0f0f0", borderRadius: 1 }}>
            {day}
          </Box>
        ))}
      </Box>

      {/* Days */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
        {Array.from({ length: startDay }).map((_, i) => <Box key={`empty-${i}`} />)}

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
                width: "100%",
                paddingTop: "100%",
                position: "relative",
                bgcolor: isPast
                  ? state.color
                    ? `${state.color}66` // dimmed status color for past
                    : "#e0e0e0"
                  : isSelected
                  ? "#b3e5fc"
                  : state.color || "#fff",
                color: isPast ? "#9e9e9e" : "#000",
                borderRadius: 1,
                cursor: isPast ? "default" : "pointer",
                boxShadow: 1,
                "&:hover": {
                  boxShadow: isPast ? 1 : 3,
                  transform: isPast ? "none" : "scale(1.05)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                {index + 1}
              </Box>
            </Paper>
          );
        })}
      </Box>

      {/* Popover */}
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

      {/* Advanced Selection */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
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

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {WEEKDAYS.map((day, idx) => (
            <Button
              key={day}
              variant={selectedWeekdaysInRange.includes(idx) ? "contained" : "outlined"}
              onClick={() => handleWeekdayToggle(idx)}
              sx={{ textTransform: "none" }}
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
            <MenuItem key={key} value={key}>{state.label}</MenuItem>
          ))}
        </TextField>

        <Button variant="contained" onClick={applyRangeWeekdayStatus} fullWidth>
          Apply to Selected Weekdays
        </Button>
      </Box>
    </Box>
  );
};

export default Availability;
