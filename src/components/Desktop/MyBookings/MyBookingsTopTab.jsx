import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  IconButton,
  useTheme,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import MyBookingsCard from "./MyBookingsCard";
import { bookingsData } from "./BookingsData";

const MyBookingsTopTab = () => {
  const [value, setValue] = useState("0");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const theme = useTheme();

  const tabData = [
    { value: "0", label: "In Progress", status: "in-progress" },
    { value: "1", label: "Completed", status: "completed" },
    { value: "2", label: "Cancelled", status: "cancelled" },
  ];

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

  const handleMarkCompleted = (booking) =>
    console.log("Marked as completed:", booking);

  return (
    <TabContext value={value}>
      <Box sx={{ display: "flex", height: "85vh", width: "100%", bgcolor: "#f7f7f7" }}>
        {/* Sidebar Tabs */}
        <Box
          sx={{
            width: "240px",
            borderRight: "1px solid #e0e0e0",
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tabs
            orientation="vertical"
            value={value}
            onChange={(e, nv) => setValue(nv)}
            sx={{
              flex: 1,
              "& .MuiTab-root": {
                alignItems: "flex-start",
                textTransform: "none",
                fontSize: "1rem",
                px: 2,
                ml:2,
              },
              "& .Mui-selected": {
                fontWeight: 600,
                color: theme.palette.primary.main,
              },
            }}
          >
            {tabData.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>
        </Box>

        {/* Bookings List Panel */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {tabData.map((tab) => (
            <TabPanel
              key={tab.value}
              value={tab.value}
              sx={{
                p: 3,
                mt: 0,
                "&.MuiTabPanel-root": {
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            >
              {bookingsData.filter((b) => b.status === tab.status).length === 0 ? (
                <Box sx={{ p: 3 }}>
                  <Typography sx={{ color: "grey.600" }}>No bookings found</Typography>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {bookingsData
                    .filter((b) => b.status === tab.status)
                    .map((booking, i) => (
                      <Grid item xs={12} key={i}>
                        <MyBookingsCard
                          {...booking}
                          showRateButton={tab.status === "completed"}
                          onRateClick={() => handleOpenRateDialog(booking)}
                          actionLabel={
                            tab.status === "in-progress" ? "Mark as completed" : null
                          }
                          onActionClick={() => handleMarkCompleted(booking)}
                        />
                      </Grid>
                    ))}
                </Grid>
              )}
            </TabPanel>
          ))}
        </Box>
      </Box>

      {/* Rating Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3, position: "relative" }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 12, top: 12, color: "#aaa" }}
          >
            <CloseIcon />
          </IconButton>

          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
            Rate the Service
          </DialogTitle>

          <DialogContent sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "#555", mb: 2 }}>
              How was your experience? We value your feedback! 😇
            </Typography>
            <Rating
              name="service-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
              sx={{ fontSize: "3rem" }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback here..."
              variant="outlined"
              sx={{ mt: 2, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            />
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
            <Button
              onClick={handleSubmitRating}
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "50px",
                px: 6,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </TabContext>
  );
};

export default MyBookingsTopTab;
