import React from 'react'
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobWorkDetails from '@/features/WorkerPage/Mobile/MyWorks/components/mobWorkDetails';
export default function WorkerWorkInfo() {
     const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return (
    <div>
      {isMobile ? <MobWorkDetails/> : <MobWorkDetails/>}
    </div>
  )
}
