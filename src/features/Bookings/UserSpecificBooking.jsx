import BottomDrawerLayout from "@/layouts/BottomDrawer/BottomDrawer";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  GlobalStyles,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Checkbox,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { textStyle,address,work,slots } from "./constant";
import NotAvailable from "@/components/NotAvailable";

export default function UserSpecificBooking({ open, setOpen, setIsAlert }) {
  const [date, setDate] = useState(dayjs());
  const [workItem, setWorkItem] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [showAllSlots, setShowAllSlots] = useState(false);
  const [notAvailableOpen, setNotAvailableOpen] = useState(false);
  const navigate = useNavigate();

  const visibleAddresses = showAll ? address : address.slice(0, 2);
  const hiddenCount = address.length - 2;

  const visibleSlot = showAllSlots ? slots : slots.slice(0, 2);
  const hiddenSlotCount = slots.length - 2;
  const theme = useTheme();
  return (
    <BottomDrawerLayout open={open} setOpen={setOpen}>
      <Box sx={{ backgroundColor: "white" }}>
        <Typography variant={"h6"} fontWeight={700} pl={1} pb={2}>
          Book Now
        </Typography>
      </Box>
      <Box sx={{ height: "100%", overflow: "auto", scrollbarWidth: "none" }}>
        <Grid container size={12} justifyContent={"center"}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* Global style override to hide the toolbar */}
            <GlobalStyles
              styles={{
                ".MuiPickersToolbar-root": {
                  display: "none !important",
                },
                ".MuiPickersCalendarHeader-root": {
                  paddingTop: "0px", // adjust spacing if needed
                },
              }}
            />

            <Paper
              elevation={3}
              sx={{
                display: "inline-block", // shrink-wrap content
                borderRadius: 2,
                border: "1px solid #ccc",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                width: "auto", // instead of 90vw, let it fit content
              }}
            >
              <StaticDatePicker
                orientation="portrait"
                openTo="day"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                slotProps={{
                  actionBar: {
                    actions: [],
                    sx: {
                      height: 0,
                      minHeight: 0,
                      padding: 0,
                      margin: 0,
                      display: "none", // fully hide
                    },
                  },
                }}
                sx={{
                  borderRadius: 2,
                  border: "1px solid #ccc",
                }}
              />
            </Paper>
          </LocalizationProvider>
        </Grid>
        <Grid container flexDirection={"column"} size={12} pb={2}>
          {/* <Grid container alignItems={"center"}>
            <Typography {...textStyle.BasicHeading}>Type of Work?</Typography>
          </Grid>
          <FormControl sx={{ m: 1, minWidth: 200, paddingBottom: 0 }}>
            <InputLabel id="work-select-label">Choose one</InputLabel>
            <Select
              labelId="work-select-label"
              id="work-select"
              value={workItem}
              onChange={(e) => setWorkItem(e.target.value)}
              label="Choose one"
              renderValue={(selected) => selected || "Choose one"}
              displayEmpty
            >
              {work.map((val, index) => (
                <MenuItem key={index} value={val}>
                  <Checkbox checked={workItem === val} />
                  <ListItemText primary={val} />
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Grid container>
            <Typography {...textStyle.BasicHeading}>Location</Typography>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            {visibleAddresses.map((address, index) => (
              <Grid key={index}>
                <Chip
                  label={address}
                  variant={selectedIndex === index ? "filled" : "outlined"}
                  sx={{
                    backgroundColor:
                      selectedIndex === index
                        ? theme.palette.primary.mainLight
                        : "transparent",
                    color: selectedIndex === index ? "white" : "inherit",
                    borderColor:
                      selectedIndex === index
                        ? theme.palette.primary.mainLight
                        : undefined,
                    "&:hover": {
                      backgroundColor:
                        selectedIndex === index
                          ? theme.palette.primary.mainLight
                          : "#f5f5f5",
                    },
                  }}
                  onClick={() => setSelectedIndex(index)}
                />
              </Grid>
            ))}

            {!showAll && hiddenCount > 0 && (
              <Grid>
                <Chip
                  label={`+${hiddenCount} more`}
                  onClick={() => setShowAll(true)}
                  variant="outlined"
                />
              </Grid>
            )}

            <Grid>
              <Tooltip title="Add Address">
                <Chip
                  icon={
                    <Avatar
                      sx={{
                        height: "20px",
                        width: "20px",
                        backgroundColor: "transparent",
                        border: "1px solid grey",
                      }}
                    >
                      <Add sx={{ fontSize: "18px" }} />
                    </Avatar>
                  }
                  label="Add"
                  onClick={() => navigate("/")}
                  variant="outlined"
                  clickable
                />
              </Tooltip>
            </Grid>
          </Grid>
          <Grid>
            <Typography {...textStyle.BasicHeading}>
              Prefered Time Slot
            </Typography>
          </Grid>
          <Grid container spacing={1} alignItems={"center"}>
            {visibleSlot.map((val, index) => (
              <Grid key={index}>
                <Chip
                  label={val}
                  variant={selectedSlot === index ? "filled" : "outlined"}
                  sx={{
                    backgroundColor:
                      selectedSlot === index
                        ? theme.palette.primary.mainLight
                        : "transparent",
                    color: selectedSlot === index ? "white" : "inherit",
                    borderColor:
                      selectedSlot === index
                        ? theme.palette.primary.mainLight
                        : undefined,
                    "&:hover": {
                      backgroundColor:
                        selectedSlot === index
                          ? theme.palette.primary.mainLight
                          : "#f5f5f5",
                    },
                  }}
                  onClick={() => setSelectedSlot(index)}
                />
              </Grid>
            ))}
            {!showAllSlots && hiddenSlotCount > 0 && (
              <Grid>
                <Chip
                  label={`+${hiddenSlotCount} more`}
                  onClick={() => setShowAllSlots(true)}
                  variant="outlined"
                />
              </Grid>
            )}
          </Grid>
          <Grid container flexDirection={"column"} size={12}>
            <Typography {...textStyle.BasicHeading}>
              Specify instruction if any
            </Typography>
            <TextField
              multiline
              rows={2}
              variant="outlined"
              sx={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid container justifyItems={"center"} pt={2}>
            <Typography
              color="primary"
              textAlign={"center"}
              sx={{ fontSize: "15px" }}
            >
              *The duration of work will be confirmed after the worker’s initial
              site visit and assessment.
            </Typography>
          </Grid>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              mt: 3,
            }}
            pb={3}
          >
            <Button
              sx={{
                height: "50px",
                borderRadius: "20px",
                bgcolor: theme.palette.primary.mainLight,
                color: "white",
                width: "85%",
                textTransform: "none",
              }}
              onClick={() => {
                // setOpen(false);
                // setIsAlert(true);
                // setTimeout(() => {
                //   setIsAlert(false);
                // }, 2000);
                setNotAvailableOpen(true);
              }}
            >
              Book now
            </Button>
          </Box>
        </Grid>
      </Box>
      <Box pb={1} />
      <NotAvailable 
        open={notAvailableOpen} 
        onClose={() => setNotAvailableOpen(false)} 
      />
      </BottomDrawerLayout>
    
  );
}
