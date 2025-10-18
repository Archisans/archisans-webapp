import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import MobHeading from "@/components/Mobile/mobileHeading";
import RoomIcon from "@mui/icons-material/Room";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const serviceCategories = [
  "Architectural Design",
  "Civil Engineering",
  "Interior Design",
  "Landscaping",
  "Structural Engineering",
  "MEP Services",
  "Pool Design",
  "Steel Fabrication",
  "Construction Contracting",
  "Masonry Work",
  "Carpentry Services",
  "Metal Fabrication",
  "Electrical Services",
  "Plumbing Services",
  "Painting Services",
  "Waterproofing Solutions",
  "Flooring Installation",
  "Security & Surveillance",
  "Smart Home Automation",
  "Audio & Video Systems",
  "Automated Smart Locks",
  "Aluminium Fabrication",
  "Stainless Steel Fabrication",
  "Roofing Solutions",
  "Mild Steel Fabrication",
  "Glass Fabrication",
];

const MobSearchFilter = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [showServices, setShowServices] = useState(false);
  const [priceRange, setPriceRange] = useState(["", ""]);
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [dateOption, setDateOption] = useState("all");
  const [selectedDates, setSelectedDates] = useState([]);

  const handleCalendarSelect = (date) => {
    const formatted = dayjs(date).format("YYYY-MM-DD");
    setSelectedDates((prev) =>
      prev.includes(formatted)
        ? prev.filter((d) => d !== formatted)
        : [...prev, formatted]
    );
  };
  const theme = useTheme();

  return (
    <Grid
      sx={{
        p: 2,
        fontFamily: "'Poppins', sans-serif",
        pb: 10,
        bgcolor: "#fff",
      }}
    >
      {/* Header */}
      <MobHeading Heading="Filter" />

      {/* Category of Services */}
      <Box sx={{ mb: 2 }}>
        <Typography fontSize={14} fontWeight={500}>
          Category of Services
        </Typography>
        <Box
          onClick={() => setShowServices(!showServices)}
          sx={{
            mt: 1,
            p: 1.2,
            border: "1px solid #ccc",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          <Typography fontSize={14} color="#444">
            {selectedServices.length
              ? selectedServices.join(", ")
              : "Select Services"}
          </Typography>
        </Box>
      </Box>

      <Collapse in={showServices}>
        <Box
          border="1px solid #eee"
          borderRadius={2}
          maxHeight={200}
          overflow="auto"
        >
          {serviceCategories.map((service, idx) => (
            <Box
              key={idx}
              onClick={() =>
                setSelectedServices((prev) =>
                  prev.includes(service)
                    ? prev.filter((s) => s !== service)
                    : [...prev, service]
                )
              }
              sx={{
                px: 2,
                py: 1,
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                bgcolor: selectedServices.includes(service)
                  ? "#f7f2ee"
                  : "#fff",
              }}
            >
              <Typography fontSize={14}>{service}</Typography>
            </Box>
          ))}
        </Box>
      </Collapse>

      {/* Price Range */}
      <Box sx={{ mt: 3 }}>
        <Typography fontSize={14} fontWeight={500}>
          Price Range (Rs)
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography fontSize={12} mb={0.5}>
              Min
            </Typography>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
              style={{
                width: "90%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography fontSize={12} mb={0.5}>
              Max
            </Typography>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
              style={{
                width: "90%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Location */}
      <Box sx={{ mb: 2, mt: 4 }}>
        <Typography fontSize={14} fontWeight={500}>
          Location
        </Typography>
        <Box
          sx={{
            mt: 1,
            px: 1.5,
            py: 1.3,
            border: "1px solid #ccc",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <RoomIcon sx={{ color: "gray", fontSize: 20 }} />
            <Typography
              sx={{
                fontSize: 15,
                color: "#aaa",
                fontStyle: "italic",
              }}
            >
              Thrissur, Kerala
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Select Worker Available Date */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography fontSize={14} fontWeight={500}>
          Select Worker Available Date
        </Typography>
        <Box
          onClick={() => setOpenDateDialog(true)}
          sx={{
            mt: 1,
            p: 1.2,
            border: "1px solid #ccc",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          <Typography fontSize={14} color="#444">
            {dateOption === "all"
              ? "All Dates"
              : dateOption === "today"
              ? "Today"
              : dateOption === "tomorrow"
              ? "Tomorrow"
              : selectedDates.length
              ? `Selected: ${selectedDates.length} day(s)`
              : "Choose from Calendar"}
          </Typography>
        </Box>
      </Box>

      {/* Date Dialog */}
      <Dialog
        open={openDateDialog}
        onClose={() => setOpenDateDialog(false)}
        sx={{ width: "112%", ml: -3 }}
      >
        <DialogTitle sx={{ bgcolor: "#f7f2ee", fontWeight: 600 }}>
          Choose Date
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#fff" }}>
          <RadioGroup
            value={dateOption}
            onChange={(e) => setDateOption(e.target.value)}
          >
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All Dates"
            />
            <FormControlLabel value="today" control={<Radio />} label="Today" />
            <FormControlLabel
              value="tomorrow"
              control={<Radio />}
              label="Tomorrow"
            />
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="Choose from Calendar"
            />
          </RadioGroup>

          {dateOption === "custom" && (
            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  disablePast
                  onChange={handleCalendarSelect}
                  slots={{
                    day: (props) => {
                      const formatted = dayjs(props.day).format("YYYY-MM-DD");
                      const isSelected = selectedDates.includes(formatted);
                      return (
                        <Box
                          onClick={() => handleCalendarSelect(props.day)}
                          sx={{
                            width: 36,
                            height: 36,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: isSelected ? theme.palette.primary.main : "transparent",
                            borderRadius: "50%",
                            color: isSelected ? "#fff" : "#000",
                            cursor: "pointer",
                          }}
                        >
                          {dayjs(props.day).date()}
                        </Box>
                      );
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDateDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => setOpenDateDialog(false)}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Apply Filter Button */}
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bgcolor="#fff"
        px={2}
        py={1.5}
        zIndex={1300}
      >
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "bold",
            py: 1.4,
          }}
        >
          Apply Filter
        </Button>
      </Box>
    </Grid>
  );
};

export default MobSearchFilter;
