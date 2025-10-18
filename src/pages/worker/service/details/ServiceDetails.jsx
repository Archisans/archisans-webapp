import React from 'react'
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import ServiceCustomize from '@/features/servicecustomize/ServiceCustomize';

export default function ServiceDetails() {
      const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return (
    <div>
      {isMobile ? <ServiceCustomize/> : <ServiceCustomize/>}
    </div>
  )
}
