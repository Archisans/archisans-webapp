import { Grid, Box } from "@mui/material";
import MobHeading from "@/components/Mobile/mobileHeading";
import MobMyBookingsTopTab from "@/components/Mobile/mobMyBookings/mobMyBookingsTopTab";

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
