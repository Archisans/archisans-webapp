import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';
import { Construction, Close } from '@mui/icons-material';

const NotAvailable = ({ open = true, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: 400 },
          bgcolor: 'white',
          borderRadius: 3,
          p: 4,
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        }}
      >
        {onClose && (
          <Button
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              minWidth: 'auto',
              p: 1,
              color: '#64748b',
            }}
          >
            <Close />
          </Button>
        )}
        
        <Construction 
          sx={{ 
            fontSize: 64, 
            color: '#f59e0b', 
            mb: 2 
          }} 
        />
        
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700, 
            color: '#1e293b', 
            mb: 2 
          }}
        >
          Coming Soon!
        </Typography>
        
        <Typography 
          sx={{ 
            color: '#64748b', 
            mb: 3,
            lineHeight: 1.6 
          }}
        >
          This feature is temporarily unavailable. We're working hard to bring it to you soon!
        </Typography>
        
        {onClose && (
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              bgcolor: '#334155',
              '&:hover': { bgcolor: '#475569' },
              borderRadius: 2,
              px: 3,
            }}
          >
            Got it
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default NotAvailable;
