import React, { useState } from "react";
import MyWorksTable from "./MyWorksTable";
import { JOBS_OFFERS } from "../../Mobile/MyWorks/components/constants";
import BookingInfoModal from "@/features/Bookings/BookingInfoModal";

const DesktopJobOffers = () => {
 const [selectedBooking, setSelectedBooking] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);
 
   const handleViewDetails = (job) => {
     setSelectedBooking(job);
     setModalOpen(true);
   };
 
   const handleCloseModal = () => {
     setModalOpen(false);
     setSelectedBooking(null);
   };
  return (
    <>
    <MyWorksTable
      jobs={JOBS_OFFERS}
      showActions
      onViewDetails={handleViewDetails}
    />

    <BookingInfoModal
        open={modalOpen}
        onClose={handleCloseModal}
        bookingData={selectedBooking}
      />
    </>
  );
};

export default DesktopJobOffers;
