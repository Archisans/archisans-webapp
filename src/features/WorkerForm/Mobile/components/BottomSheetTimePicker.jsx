import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  IconButton,
  Stack,
  styled,
  alpha,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { HOURS, MINUTES, PERIODS } from "../../utils/timeUtils";

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const WheelContainer = styled(Box)(({ theme }) => ({
  height: WHEEL_HEIGHT,
  width: "100%",
  overflowY: "auto",
  position: "relative",
  scrollbarWidth: "none", // Firefox
  "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
  scrollSnapType: "y mandatory",
  maskImage:
    "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
}));

const WheelItem = styled(Box)(({ active, theme }) => ({
  height: ITEM_HEIGHT,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  scrollSnapAlign: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: active ? 700 : 400,
  fontSize: active ? "1.2rem" : "1rem",
  opacity: active ? 1 : 0.5,
  "&:hover": {
    opacity: 1,
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
  },
}));

const SelectionIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: 0,
  right: 0,
  transform: "translateY(-50%)",
  height: ITEM_HEIGHT,
  borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
  pointerEvents: "none",
  zIndex: 0,
}));

const Wheel = ({ data, value, onChange }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (rootRef.current) {
      const index = data.indexOf(value);
      if (index !== -1) {
        rootRef.current.scrollTop = index * ITEM_HEIGHT;
      }
    }
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%", flex: 1 }}>
      <SelectionIndicator />
      <WheelContainer ref={rootRef}>
        <Box sx={{ height: ITEM_HEIGHT * 2 }} />

        {data.map((item) => (
          <WheelItem
            key={item}
            active={value === item ? 1 : 0}
            onClick={() => {
              onChange(item);
              const index = data.indexOf(item);
              if (rootRef.current) {
                rootRef.current.scrollTo({
                  top: index * ITEM_HEIGHT,
                  behavior: "smooth",
                });
              }
            }}
          >
            {item}
          </WheelItem>
        ))}

        <Box sx={{ height: ITEM_HEIGHT * 2 }} />
      </WheelContainer>
    </Box>
  );
};

const BottomSheetTimePicker = ({ open, onClose, onConfirm, initialValue }) => {
  const [hour, setHour] = useState(initialValue?.hour || "09");
  const [minute, setMinute] = useState(initialValue?.minute || "00");
  const [period, setPeriod] = useState(initialValue?.period || "AM");

  const handleConfirm = () => {
    onConfirm({ hour, minute, period });
    onClose();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          pb: 2,
          overflow: "visible",
        },
      }}
    >
      <Box sx={{ position: "relative", pt: 3, px: 3 }}>
        <Puller />

        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h6" fontWeight={700}>
            Select Time
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* Wheels Container */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{
            position: "relative",
            height: WHEEL_HEIGHT,
          }}
        >
          <Wheel data={HOURS} value={hour} onChange={setHour} />
          <Typography
            sx={{
              alignSelf: "center",
              fontWeight: "bold",
              color: "text.disabled",
              pb: 0.5,
            }}
          >
            :
          </Typography>
          <Wheel data={MINUTES} value={minute} onChange={setMinute} />
          <Box sx={{ width: 16 }} />
          <Wheel data={PERIODS} value={period} onChange={setPeriod} />
        </Stack>

        {/* Confirm Button */}
        <Box sx={{ mt: 4, mb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            disableElevation
            onClick={handleConfirm}
            sx={{
              borderRadius: 3,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Confirm Time
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default BottomSheetTimePicker;
