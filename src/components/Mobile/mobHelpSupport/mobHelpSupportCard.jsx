import { Box, Typography, Grid, } from '@mui/material';

const MobHelpSupportCard = ({ title, icon }) => {
    return (

        <Grid >
            <Box>
                <Box
                    sx={{
                        bgcolor: '#f1f1f7ff',
                        width: '140px',
                        height: '140px',
                        borderRadius: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0px 2px 8px rgba(90, 69, 1, 0.1)', // 👈 small shadow added
                        border:'1px solid rgba(184, 147, 87, 0.3)'
                    }}
                >
                    <Box sx={{ mb: 2 ,fontSize:0}}>
                        {icon}
                    </Box>
                    <Typography sx={{ fontSize: '14px' }}>{title}</Typography>
                </Box>
            </Box>
        </Grid>
    )
}

export default MobHelpSupportCard