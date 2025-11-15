import React from 'react'
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import ServiceCustomize from '@/features/ServiceCustomize/ServiceCustomize';

export default function ServiceDetails() {
      const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return (
    <div>
      {isMobile ? <ServiceCustomize/> : <ServiceCustomize/>}
    </div>
  )
}
