import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Modal,
  IconButton,
  Checkbox,
  ListItemText,
  Tooltip,
  Divider,
} from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  Add,
  Close,
  CalendarToday,
  Work,
  LocationOn,
  Schedule,
  Notes,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { address, slots } from "./constant";
import NotAvailable from "@/components/NotAvailable";

export default function UserSpecificBooking({ open, setOpen }) {
  const [date, setDate] = useState(dayjs());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [showAllSlots, setShowAllSlots] = useState(false);
  const navigate = useNavigate();
  const [notAvailableOpen, setNotAvailableOpen] = useState(false);

  const visibleAddresses = showAll ? address : address.slice(0, 2);
  const hiddenCount = address.length - 2;
  const visibleSlots = showAllSlots ? slots : slots.slice(0, 2);
  const hiddenSlotCount = slots.length - 2;

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1.5,
        }}
      >
        <Paper
          elevation={20}
          sx={{
            width: "95%",
            maxWidth: 900,
            maxHeight: "88vh",
            // make outer non-scrollable; use inner content as scroll area
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            borderRadius: 1,
            bgcolor: "#fff",
            background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              background: "linear-gradient(135deg, #667eea 0%, #4b4fa2ff 100%)",
              color: "white",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Book Service
            </Typography>
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Content (scrolls) */}
          <Box
            sx={(t) => ({
              p: 3,
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 3,
              flex: 1,
              overflow: "auto",

              // keep content away from scrollbar and pull scrollbar inside
              scrollbarGutter: "stable",
              marginInlineEnd: t.spacing(2), // moves scrollbar inward (LTR: right)
              paddingInlineEnd: `calc(${t.spacing(3)} + 12px)`,

              // Firefox
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(102,126,234,0.5) transparent",

              // WebKit
              "&::-webkit-scrollbar": { width: 8 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(102,126,234,0.5)",
                borderRadius: 9999,
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "rgba(102,126,234,0.8)",
              },
              "&::-webkit-scrollbar-track": { background: "transparent" },
            })}
          >
            {/* Left: Calendar */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <CalendarToday sx={{ color: "#667eea", fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color="#333">
                  Select Date
                </Typography>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  value={date}
                  onChange={setDate}
                  slotProps={{ actionBar: { actions: [] } }}
                  sx={{
                    "& .Mui-selected": {
                      bgcolor: "#667eea !important",
                      "&:hover": { bgcolor: "#5a6fd8 !important" },
                    },
                    "& .MuiPickersDay-root": {
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      "&:hover": { bgcolor: "rgba(102, 126, 234, 0.1)" },
                    },
                    "& .MuiPickersCalendarHeader-root": {
                      bgcolor: "rgba(102, 126, 234, 0.05)",
                      borderRadius: 1.5,
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>

            {/* Right: Form */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              {/* Type of Work */}
              {/* <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <Work sx={{ color: "#667eea", fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color="#333">
                    Service Type
                  </Typography>
                </Box>
                <FormControl fullWidth size="small">
                  <InputLabel>Choose service</InputLabel>
                  <Select
                    value={workItem}
                    onChange={(e) => setWorkItem(e.target.value)}
                    label="Choose service"
                    sx={{
                      borderRadius: 2,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(102, 126, 234, 0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#667eea",
                      },
                    }}
                  >
                    {work.map((val, idx) => (
                      <MenuItem key={idx} value={val}>
                        <Checkbox checked={workItem === val} size="small" />
                        <ListItemText primary={val} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box> */}

              <Divider sx={{ my: 0.5 }} />

              {/* Location */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <LocationOn sx={{ color: "#667eea", fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color="#333">
                    Location
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {visibleAddresses.map((addr, idx) => (
                    <Chip
                      key={idx}
                      size="small"
                      label={addr}
                      variant={selectedIndex === idx ? "filled" : "outlined"}
                      color={selectedIndex === idx ? "primary" : "default"}
                      onClick={() => setSelectedIndex(idx)}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 500,
                        "&.MuiChip-filled": {
                          bgcolor: "#667eea",
                          color: "white",
                        },
                      }}
                    />
                  ))}
                  {!showAll && hiddenCount > 0 && (
                    <Chip
                      size="small"
                      label={`+${hiddenCount} more`}
                      onClick={() => setShowAll(true)}
                      sx={{ borderRadius: 2 }}
                    />
                  )}
                  <Tooltip title="Add New Address">
                    <Chip
                      size="small"
                      icon={<Add fontSize="small" />}
                      label="Add New"
                      onClick={() => navigate("/")}
                      variant="outlined"
                      color="secondary"
                      sx={{ borderRadius: 2 }}
                    />
                  </Tooltip>
                </Box>
              </Box>

              <Divider sx={{ my: 0.5 }} />

              {/* Time Slot */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <Schedule sx={{ color: "#667eea", fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color="#333">
                    Time Slot
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {visibleSlots.map((slot, idx) => (
                    <Chip
                      key={idx}
                      size="small"
                      label={slot}
                      variant={selectedSlot === idx ? "filled" : "outlined"}
                      color={selectedSlot === idx ? "primary" : "default"}
                      onClick={() => setSelectedSlot(idx)}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 500,
                        "&.MuiChip-filled": {
                          bgcolor: "#667eea",
                          color: "white",
                        },
                      }}
                    />
                  ))}
                  {!showAllSlots && hiddenSlotCount > 0 && (
                    <Chip
                      size="small"
                      label={`+${hiddenSlotCount} more`}
                      onClick={() => setShowAllSlots(true)}
                      sx={{ borderRadius: 2 }}
                    />
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 0.5 }} />

              {/* Instructions */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <Notes sx={{ color: "#667eea", fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color="#333">
                    Special Instructions
                  </Typography>
                </Box>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                  placeholder="Enter any special instructions or requirements..."
                  sx={{
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& fieldset": {
                        borderColor: "rgba(102, 126, 234, 0.3)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              bgcolor: "#f8fafc",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              💡 Duration will be confirmed after worker's site visit
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpen(false)}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  borderColor: "#667eea",
                  color: "#667eea",
                  "&:hover": {
                    borderColor: "#5a6fd8",
                    bgcolor: "rgba(102, 126, 234, 0.05)",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setNotAvailableOpen(true);
                }}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                  },
                }}
              >
                Book Now
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
      <NotAvailable
        open={notAvailableOpen}
        onClose={() => setNotAvailableOpen(false)}
      />
    </>
  );
}
