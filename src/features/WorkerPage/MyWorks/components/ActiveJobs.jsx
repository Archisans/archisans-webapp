import React, { useState } from "react";
import MyWorksTable from "./MyWorksTable";
import { JOBS_ACTIVE } from "../../Mobile/MyWorks/components/constants";
import BookingInfoModal from "@/features/Bookings/BookingInfoModal";

const DesktopActiveJobs = () => {
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
        jobs={JOBS_ACTIVE}
        showActions
        onViewDetails={handleViewDetails}
        onCancel={(job) => console.log("Cancelled:", job)}
        onComplete={(job) => console.log("Completed:", job)}
      />
      
      <BookingInfoModal
        open={modalOpen}
        onClose={handleCloseModal}
        bookingData={selectedBooking}
      />
    </>
  );
};

export default DesktopActiveJobs;
