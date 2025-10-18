import { Grid } from '@mui/material';
import MobAuthHeading from '@/components/Mobile/mobAuthHeading';

const MobAuthLayout = ({ children, heading1, heading2 }) => {
    return (
        <Grid container sx={{ bgcolor: '#B08B6F', width: "100%", height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >

            <Grid bgcolor={'#B08B6F'} sx={{ minHeight: '80vh', width: "100%", display: 'flex', flexDirection: 'column' }}>


                <MobAuthHeading heading1={heading1} heading2={heading2} />

                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                    {children}

                </Grid>

            </Grid>
        </Grid>
    )
}

export default MobAuthLayout