import React , { useState } from "react";
import MyWorksTable from "./MyWorksTable";
import { JOBS_COMPLETED } from "../../Mobile/MyWorks/components/constants";
import BookingInfoModal from "@/features/Bookings/BookingInfoModal";

const DesktopCompletedJobs = () => {
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
      jobs={JOBS_COMPLETED}
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

export default DesktopCompletedJobs;
