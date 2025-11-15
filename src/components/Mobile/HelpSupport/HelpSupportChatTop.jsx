import { Box, Typography, IconButton, Grid, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const MobHelpSupportChatTop = ({ name, img }) => {
    const navigate = useNavigate();

    return (
        <Grid container direction="column">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 1.1,
                    pl: 0,
                    borderBottom: '1px solid #ddd',
                    boxShadow: 0.7,
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    backgroundColor: '#F1E6DD',
                }}
            >
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>

                {/* ✅ Render image as avatar if available */}
                {img && (
                    <Avatar
                        src={img}
                        alt={name}
                        sx={{ width: 40, height: 47, mr: 2, ml: 1 }}
                    />
                )}

                <Typography variant="subtitle1" fontWeight={500} fontSize={20}>
                    {name}
                </Typography>
            </Box>
        </Grid>
    );
};

export default MobHelpSupportChatTop;
