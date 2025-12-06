import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import { Clock, ArrowRight, AlertCircle } from "lucide-react";
import {
  convertToMinutes,
  isEndMinuteDisabled,
  isEndPeriodDisabled,
  HOURS,
  MINUTES,
  PERIODS,
} from "../utils/timeUtils";
import { deepPurple } from "@/config/Theme/config/color";

const TimeDropdown = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  timeError,
}) => {
  const handleStartChange = (field, value) => {
    setStartTime({ ...startTime, [field]: value });
  };

  const handleEndChange = (field, value) => {
    setEndTime({ ...endTime, [field]: value });
  };

  const startMinutes = convertToMinutes(startTime);

  const CompositeTimeInput = ({
    label,
    time,
    onChange,
    isEnd = false,
    error,
  }) => {
    const selectStyles = {
      "& .MuiSelect-select": {
        py: 1.5,
        pl: 2,
        pr: 4,
        display: "flex",
        alignItems: "center",
      },
      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
      "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
      minWidth: 70,
    };

    return (
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: error ? "error.main" : "pirmary.content.default",
            fontWeight: 600,
            mb: 0.5,
            display: "block",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid",
            borderColor: error ? "error.main" : "divider",
            borderRadius: 1.5,
            bgcolor: "background.paper",
            transition: "all 0.2s",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            "&:hover": {
              borderColor: error ? "error.dark" : "primary.bg.default",
              boxShadow: `0 0 0 3px ${
                error
                  ? alpha(deepPurple[900], 0.1)
                  : alpha(deepPurple[900], 0.1)
              }`,
            },
            "&:focus-within": {
              borderColor: "primary.main",
              boxShadow: `0 0 0 3px ${alpha(deepPurple[900], 0.2)}`,
            },
          }}
        >
          {/* Hour */}
          <FormControl fullWidth>
            <Select
              value={time.hour || ""}
              onChange={(e) => onChange("hour", e.target.value)}
              displayEmpty
              sx={selectStyles}
              renderValue={(val) => val || "HH"}
            >
              {HOURS.map((h) => (
                <MenuItem key={h} value={h}>
                  {h}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 24, alignSelf: "center" }}
          />

          {/* Minute */}
          <FormControl fullWidth>
            <Select
              value={time.minute || ""}
              onChange={(e) => onChange("minute", e.target.value)}
              displayEmpty
              sx={selectStyles}
              renderValue={(val) => val || "MM"}
            >
              {MINUTES.map((m) => (
                <MenuItem
                  key={m}
                  value={m}
                  disabled={
                    isEnd && isEndMinuteDisabled(endTime, startMinutes, m)
                  }
                >
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 24, alignSelf: "center" }}
          />

          {/* AM/PM */}
          <FormControl fullWidth>
            <Select
              value={time.period || ""}
              onChange={(e) => onChange("period", e.target.value)}
              displayEmpty
              sx={{
                ...selectStyles,
                "& .MuiSelect-select": {
                  ...selectStyles["& .MuiSelect-select"],
                  color: "primary.bg.default",
                  fontWeight: 600,
                },
              }}
              renderValue={(val) => val || "--"}
            >
              {PERIODS.map((p) => (
                <MenuItem
                  key={p}
                  value={p}
                  disabled={
                    isEnd && isEndPeriodDisabled(endTime, startMinutes, p)
                  }
                >
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    );
  };

  return (
    <Grid item xs={12} md={8} lg={6}>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 4,
          background: "linear-gradient(to bottom, #ffffff, #fafafa)",
        }}
      >
        {/* Header Section */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 4 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: "50%",
              bgcolor: alpha(deepPurple[900], 0.1),
              color: "primary.main",
              display: "flex",
            }}
          >
            <Clock size={20} />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, lineHeight: 1.2,color:"primary.content.default" }}
            >
              Work Schedule
            </Typography>
            <Typography variant="caption" color="neutral.content.700">
              Set your start and end working hours
            </Typography>
          </Box>
        </Stack>

        {/* Inputs Container */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems={{ xs: "stretch", md: "flex-start" }}
        >
          <CompositeTimeInput
            label="Start Time"
            time={startTime}
            onChange={handleStartChange}
            error={!!timeError}
          />

          {/* Arrow Connector */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pt: { xs: 0, md: 3.5 },
              color: "neutral.disabled.content",
            }}
          >
            <ArrowRight size={24} />
          </Box>

          <CompositeTimeInput
            label="End Time"
            time={endTime}
            onChange={handleEndChange}
            isEnd
            error={!!timeError}
          />
        </Stack>

        {/* Error Message */}
        {timeError && (
          <Box
            sx={{
              mt: 3,
              display: "flex",
              gap: 1.5,
              alignItems: "center",
              p: 1.5,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.error.main, 0.05),
              color: "error.main",
              border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
            }}
          >
            <AlertCircle size={18} />
            <Typography variant="body2" fontWeight={500}>
              {timeError}
            </Typography>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

export default TimeDropdown;
