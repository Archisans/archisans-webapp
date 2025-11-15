import React from 'react'
import {
  Grid,
  Box,
  Typography,
} from "@mui/material";
import MobMyWorksTopBar from './components/mobMyWorksTopBar';
import MobHeading from '@/components/Mobile/MobileHeading';

const MobMyWorks = () => {
  return (
    <Grid>
        <MobHeading Heading="My Works"/>
        <MobMyWorksTopBar/>
    </Grid>
  )
}

export default MobMyWorks