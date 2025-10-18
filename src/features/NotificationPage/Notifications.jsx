import { Grid, } from '@mui/material';
import MobHeading from "@/components/Mobile/mobileHeading"
import NotificationTopTab from "@/components/Desktop/Notification/NotificationTopTab"
import TopBar from '@/components/Desktop/TopBar';
import Heading from '@/components/Desktop/Heading';

const Notifications = () => {
    return (
        <Grid>
            <Heading value="Notifications" />
            <NotificationTopTab />
        </Grid>

    )
}

export default Notifications