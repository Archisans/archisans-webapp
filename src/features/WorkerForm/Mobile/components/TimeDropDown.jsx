import { useState } from "react";
import { Box, Typography, OutlinedInput, FormHelperText } from "@mui/material";
import BottomSheetTimePicker from "./BottomSheetTimePicker";

const formatTime = (t) => {
  if (!t.hour) return "";
  return `${t.hour}:${t.minute} ${t.period}`;
};

const TimeDropDown = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  timeError,
}) => {
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const onConfirmStart = (newTime) => {
    console.log(newTime);
    setStartTime(newTime);
  };

  const onConfirmEnd = (newTime) => {
    setEndTime(newTime);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, mb: 0.5, display: "block" }}
      >
        Working Hours (Start)
      </Typography>
      <OutlinedInput
        fullWidth
        value={formatTime(startTime)}
        readOnly
        onClick={() => setOpenStart(true)}
        error={!!timeError}
        sx={{ mb: 2, bgcolor: "background.paper" }}
      />

      <Typography
        variant="caption"
        sx={{ fontWeight: 600, mb: 0.5, display: "block" }}
      >
        Working Hours (End)
      </Typography>
      <OutlinedInput
        fullWidth
        value={formatTime(endTime)}
        readOnly
        onClick={() => setOpenEnd(true)}
        error={!!timeError}
        sx={{ bgcolor: "background.paper" }}
      />

      {timeError && (
        <FormHelperText error sx={{ mt: 1 }}>
          {timeError}
        </FormHelperText>
      )}

      {/* Start Picker */}
      <BottomSheetTimePicker
        open={openStart}
        onClose={() => setOpenStart(false)}
        initialValue={startTime}
        onConfirm={onConfirmStart}
      />

      {/* End Picker */}
      <BottomSheetTimePicker
        open={openEnd}
        onClose={() => setOpenEnd(false)}
        initialValue={endTime}
        onConfirm={onConfirmEnd}
      />
    </Box>
  );
};

export default TimeDropDown;
