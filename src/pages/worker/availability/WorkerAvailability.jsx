import React from 'react'
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import Availability from '@/features/WorkerPage/Mobile/Availability/Availability';
import DesktopAvailability from '@/features/WorkerPage/Availability/Availability';

export default function WorkerAvailability() {
      const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return (
    <div>
      {isMobile ? <Availability/> : <DesktopAvailability/>}
    </div>
  )
}
