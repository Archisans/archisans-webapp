import { Grid, Typography, Box  } from '@mui/material';
import Signupimg from '@/assets/Images/signup.png';

const MobAuthHeading = ({heading1, heading2}) => {
    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column',alignItems:'center' }}>
            <Typography sx={{ fontSize:{xs:'2.5rem',sm:'3.8rem',md:'5rem'}, color: 'white', fontWeight: 'bold',whiteSpace:'pre'}} >
                {heading1}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',mt:-3 }}>
                <Typography sx={{ fontSize:{xs:'2.5rem',sm:'3.8rem',md:'5rem'}, color: 'white', mb: 2, mr: 3, fontWeight: 'bold' }}> {heading2}</Typography>
                <Box
                    component="img"
                    src={Signupimg}
                    alt="My image"
                    sx={{ width:{xs:"100px",sm:'170px',md:'200px'}, height: 'auto', borderRadius: 2 }}
                />
            </Box>

        </Grid>
    )
}

export default MobAuthHeading