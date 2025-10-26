import { useState } from "react";
import { Box, Tabs, Tab, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Rating, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabPanel } from "@mui/lab";
import BookingCard from "./mobMyBookingscard";
import { bookingsData } from "@/components/Desktop/MyBookings/BookingsData";

const MobMyBookingsTopTab = () => {
  const [tabValue, setTabValue] = useState("0");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  const handleOpenRateDialog = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
    setRating(0);
    setComment("");
  };

  const handleSubmitRating = () => {
    console.log("Rated:", selectedBooking, "Rating:", rating, "Comment:", comment);
    handleCloseDialog();
  };

  const renderBookingCards = (status, options = {}) => (
    <Grid>
      <Box sx={{ pl: 2, pr: 2 }}>
        {bookingsData
          .filter((b) => b.status === status)
          .map((booking, idx) => (
            <BookingCard
              key={idx}
              {...booking}
              showRateButton={options.showRateButton}
              actionLabel={options.actionLabel}
              onActionClick={options.onActionClick?.bind(null, booking)}
              onRateClick={options.onRateClick?.bind(null, booking)}
            />
          ))}
      </Box>
    </Grid>
  );

  const handleMarkCompleted = (booking) => console.log("Marked as completed:", booking);

  return (
    <TabContext value={tabValue}>
      <Box sx={{ position: "fixed", zIndex: 1000, width: "100%", backgroundColor: "#fff", borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="booking tabs">
          <Tab value="0" label="In progress" sx={{ fontSize: "15px" }} />
          <Tab value="1" label="Completed" sx={{ fontSize: "15px" }} />
          <Tab value="2" label="Cancelled" sx={{ fontSize: "15px" }} />
        </Tabs>
      </Box>

      <Box sx={{ paddingTop: "55px", paddingBottom: "10px" }}>
        <TabPanel value="0" sx={{ p: 0 }}>
          {renderBookingCards("in-progress", { actionLabel: "Mark as completed", onActionClick: handleMarkCompleted })}
        </TabPanel>

        <TabPanel value="1" sx={{ p: 0 }}>
          {renderBookingCards("completed", { showRateButton: true, onRateClick: handleOpenRateDialog })}
        </TabPanel>

        <TabPanel value="2" sx={{ p: 0 }}>
          {renderBookingCards("cancelled")}
        </TabPanel>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <Box sx={{ p: 3, position: "relative" }}>
          <IconButton aria-label="close" onClick={handleCloseDialog} sx={{ position: "absolute", right: 12, top: 12, color: "#aaa" }}>
            <CloseIcon />
          </IconButton>

          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", pb: 1 }}>
            Rate the Service
          </DialogTitle>

          <DialogContent sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "#555", mb: 2 }}>
              How was your experience? We value your feedback! 😇
            </Typography>
            <Rating name="service-rating" value={rating} onChange={(event, newValue) => setRating(newValue)} size="large" sx={{ fontSize: "2.5rem" }} />
            <TextField fullWidth multiline rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your feedback here..." variant="outlined" sx={{ mt: 2, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }} />
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
            <Button onClick={handleSubmitRating} variant="contained" sx={{ textTransform: "none", borderRadius: "50px", px: 5, color: "white", fontWeight: "bold" }}>
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </TabContext>
  );
};

export default MobMyBookingsTopTab;
