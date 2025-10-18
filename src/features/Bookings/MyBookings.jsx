import { Grid, } from '@mui/material';
import TopBar from '@/components/Desktop/TopBar';
import Heading from '@/components/Desktop/Heading';
import MyBookingsTopTab from '@/components/Desktop/MyBookings/MyBookingsTopTab';

const MyBookings = () => {
    return (
        <Grid>
            <Heading value="My Bookings" />
            <MyBookingsTopTab />
        </Grid>

    )
}

export default MyBookings