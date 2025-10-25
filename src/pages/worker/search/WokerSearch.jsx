import React from 'react'
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import MobSearchWorker from '@/features/SearchWorker/Mobile/mobSearchWorker';
import DesktopSearchWorker from '@/features/SearchWorker/SearchWorker';
export default function WorkerSearch() {
      const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return (
    <div>
      {isMobile ? <MobSearchWorker/> : <DesktopSearchWorker/>}
    </div>
  )
}
