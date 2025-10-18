import { Box, Typography, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const AccessDenied = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
      textAlign="center"
      px={2}
    >
      <LockOutlinedIcon sx={{ fontSize: 80, color: '#d32f2f', mb: 2 }} />
      <Typography variant="h6" color="error" gutterBottom>
        403 – Access Denied
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={3}>
        You are not authorized to view this page.
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          localStorage.removeItem("access_token");
          window.location.href = "/";
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default AccessDenied;
