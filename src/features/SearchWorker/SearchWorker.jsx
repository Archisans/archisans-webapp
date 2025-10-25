import React, { useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import WorkerCard from "@/features/SearchWorker/WorkerCard";
import { WORKERS } from "@/features/SearchWorker/constants";
import AlertMessage from "@/components/Desktop/BookingAlert";
import UserSpecificBooking from "@/features/Bookings/UserSpecificBookingModal";

const DesktopSearchWorker = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const { slug } = useParams();
  const workers = WORKERS(slug);

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            bgcolor: "white",
            border: "1px solid #e2e8f0",
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={1} color="#1e293b">
            {`Available ${
              slug
                ? slug
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                : "Professionals"
            }`}
          </Typography>
          {/* <Typography color="text.secondary" fontSize={16}>
            {WORKERS.length} skilled professionals ready to help with your projects
          </Typography> */}
        </Paper>

        {/* Worker Grid - Perfect horizontal gaps */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "24px",
            px: 3,
          }}
        >
          {workers.map((worker, idx) => (
            <WorkerCard
              key={idx}
              worker={worker}
              navigate={navigate}
              setOpen={setOpen}
            />
          ))}
        </Box>
      </Container>

      <AlertMessage isAlert={isAlert} />
      <UserSpecificBooking
        open={open}
        setIsAlert={setIsAlert}
        setOpen={setOpen}
      />
    </Box>
  );
};

export default DesktopSearchWorker;
