import React from 'react'
import { BREAKPOINTS } from "@/config/breakPoints";
import { useMediaQuery } from "@mui/material";
import AddressDetails from "@/features/Address/AdressDetails/AddressDetails";
export default function AddAddress() {
      const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  return (
    <div>
      {isMobile ? <AddressDetails/>: <AddressDetails/>}
    </div>
  )
}
