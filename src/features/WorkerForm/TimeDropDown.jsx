import React from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem, Box, Typography, Divider } from "@mui/material";
import { convertToMinutes, validateTimeRange, isEndMinuteDisabled, isEndPeriodDisabled } from "./utils/timeUtils";

const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
const ampm = ["AM", "PM"];

const TimeDropdowns = ({ startTime, setStartTime, endTime, setEndTime, timeError, setTimeError }) => {
  const handleStartChange = (field, value) => {
    const updated = { ...startTime, [field]: value };
    setStartTime(updated);
    setTimeError(validateTimeRange(updated, endTime));
  };

  const handleEndChange = (field, value) => {
    const updated = { ...endTime, [field]: value };
    setEndTime(updated);
    setTimeError(validateTimeRange(startTime, updated));
  };

  const startMinutes = convertToMinutes(startTime);

  return (
    <Grid item xs={12} md={6}>
      <InputLabel shrink sx={{ mb: 0, px: 0.5, background: "#fff" }}>Working Hours</InputLabel>

      <Box sx={{ border: "1px solid #cbd5e1", borderRadius: 2, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Start Time */}
        <Box>
          <InputLabel shrink sx={{ mb: 0, px: 0.5, background: "#fff" }}>Start Time</InputLabel>
          <Box sx={{ display: "flex", gap: 1 }}>
            <FormControl fullWidth sx={{ minWidth: 80 }}>
              <Select value={startTime.hour || ""} onChange={(e) => handleStartChange("hour", e.target.value)} displayEmpty>
                <MenuItem value="">Hour</MenuItem>
                {hours.map(h => <MenuItem key={h} value={h}>{h}</MenuItem>)}
              </Select>
            </FormControl>

            <Divider orientation="vertical" flexItem />

            <FormControl fullWidth sx={{ minWidth: 80 }}>
              <Select value={startTime.minute || ""} onChange={(e) => handleStartChange("minute", e.target.value)} displayEmpty>
                <MenuItem value="">Minute</MenuItem>
                {minutes.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
              </Select>
            </FormControl>

            <Divider orientation="vertical" flexItem />

            <FormControl fullWidth sx={{ minWidth: 80 }}>
              <Select value={startTime.period || ""} onChange={(e) => handleStartChange("period", e.target.value)} displayEmpty>
                <MenuItem value="">AM/PM</MenuItem>
                {ampm.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* End Time */}
        <Box>
          <InputLabel shrink sx={{ mb: 0, px: 0.5, background: "#fff" }}>End Time</InputLabel>
          <Box sx={{ display: "flex", gap: 1 }}>
            <FormControl fullWidth sx={{ minWidth: 80 }}>
              <Select value={endTime.hour || ""} onChange={(e) => handleEndChange("hour", e.target.value)} displayEmpty>
                <MenuItem value="">Hour</MenuItem>
                {hours.map(h => <MenuItem key={h} value={h}>{h}</MenuItem>)}
              </Select>
            </FormControl>

            <Divider orientation="vertical" flexItem />

            <FormControl fullWidth sx={{ minWidth: 80 }}>
              <Select value={endTime.minute || ""} onChange={(e) => handleEndChange("minute", e.target.value)} displayEmpty>
                <MenuItem value="">Minute</MenuItem>
                {minutes.map(m => <MenuItem key={m} value={m} disabled={isEndMinuteDisabled(endTime, startMinutes, m)}>{m}</MenuItem>)}
              </Select>
            </FormControl>

            <Divider orientation="vertical" flexItem />

            <FormControl fullWidth sx={{ minWidth: 80 }}>
              <Select value={endTime.period || ""} onChange={(e) => handleEndChange("period", e.target.value)} displayEmpty>
                <MenuItem value="">AM/PM</MenuItem>
                {ampm.map(p => <MenuItem key={p} value={p} disabled={isEndPeriodDisabled(endTime, startMinutes, p)}>{p}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {timeError && <Typography variant="caption" color="error">{timeError}</Typography>}
      </Box>
    </Grid>
  );
};

export default TimeDropdowns;
