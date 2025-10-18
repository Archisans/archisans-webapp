import { Box, Tabs, Tab, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import MobWorkerServices from '@/features/WorkerPage1/Worker/Mobile/components/WorkerServices';
import MobWorkerPortFolio from '@/features/WorkerPage1/Worker/Mobile/components/WorkerPortFolio';
import MobWorkerBusiness from '@/features/WorkerPage1/Worker/Mobile/components/WorkerBusiness';
import MobWorkerReview from '@/features/WorkerPage1/Worker/Mobile/components/WorkerReview';



const MobWorkerTopTab = ({ service, setIsAlert }) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      {/* Tabs Header */}
      <Box
        sx={{
          borderColor: 'divider',
          bgcolor: 'white',
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons={isMobile ? 'auto' : false}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            label="Services"
            sx={{
              fontWeight: 550,
              fontSize: { xs: 13, sm: 15, md: 16 },
              textTransform: 'none',
            }}
          />
          
          <Tab
            label="Portfolio"
            sx={{
              fontWeight: 550,
              fontSize: { xs: 13, sm: 15, md: 16 },
              textTransform: 'none',
            }}
          />
          <Tab
            label="Business"
            sx={{
              fontWeight: 550,
              fontSize: { xs: 13, sm: 15, md: 16 },
              textTransform: 'none',
            }}
          />
          <Tab
            label="Reviews"
            sx={{
              fontWeight: 550,
              fontSize: { xs: 13, sm: 15, md: 16 },
              textTransform: 'none',
            }}
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mt: 2 }}>
        {value === 0 && (
          <MobWorkerServices setIsAlert={setIsAlert} selectedService={service} />
        )}
       
        {value === 1 && <MobWorkerPortFolio />}
        {value === 2 && <MobWorkerBusiness />}
        {value === 3 && <MobWorkerReview />}
      </Box>
    </Box>
  );
};

export default MobWorkerTopTab;
