import { Grid, Box } from "@mui/material";
import MobHeading from "@/components/Mobile/MobileHeading";
import MobMyBookingsTopTab from "@/components/Mobile/MyBookings/MyBookingsTopTab";

const MobMyBookings = () => {
  return (
    <Grid>
      <MobHeading Heading="My Bookings" backArrow={false} />
      <Box sx={{ width: "100%" }}>
        <MobMyBookingsTopTab />
      </Box>
    </Grid>
  );
};

export default MobMyBookings;
