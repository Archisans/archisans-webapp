import { Grid, } from '@mui/material';
import MobHeading from "@/components/Mobile/MobileHeading"
import MobNotificationTopTab from "@/components/Mobile/Notification/NotificationTopTab"

const MobNotifications = () => {
    return (
        <Grid>
            <MobHeading Heading='Notifications' />
            <MobNotificationTopTab />
        </Grid>

    )
}

export default MobNotifications