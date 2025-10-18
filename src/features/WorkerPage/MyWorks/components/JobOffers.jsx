import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";
import { CalendarBlankIcon, ClockIcon, MapPinIcon } from "@phosphor-icons/react";
import plumbingImg from "@/assets/Images/plumbingImg.png";
import { useNavigate } from "react-router-dom";
import { RouteProvider } from "@/config/RouteProvider";

const DesktopJobOffers = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RouteProvider.WORKER_WORK_INFO);
  };

  const jobs = [
    {
      id: 1,
      job: "Plumbing",
      jobImg: plumbingImg,
      date: "Sunday, 12 June",
      time: "11:00 – 12:00 AM",
      requester: "Daison Babu",
      requesterImg: "https://randomuser.me/api/portraits/men/45.jpg",
      location: "Palakkad",
      status: "New Request",
    },
    {
      id: 2,
      job: "Plumbing",
      jobImg: plumbingImg,
      date: "Monday, 13 June",
      time: "02:00 – 03:00 PM",
      requester: "John Doe",
      requesterImg: "https://randomuser.me/api/portraits/men/46.jpg",
      location: "Kochi",
      status: "New Request",
    },
  ];

  return (
    <Box mt={3} px={5} mb={5}>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>Job</TableCell>
              <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>Date</TableCell>
              <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>Time</TableCell>
              <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>Requester</TableCell>
              <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>Location</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} hover sx={{ cursor: "pointer" }}>
                {/* Job */}
                <TableCell
                  sx={{ borderRight: "1px solid #f0f0f0" }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar
                      variant="rounded"
                      src={job.jobImg}
                      sx={{ width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 } }}
                    />
                    <Typography fontSize={{ xs: 14, sm: 16 }} fontWeight={600}>
                      {job.job}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Date */}
                <TableCell
                  sx={{ borderRight: "1px solid #f0f0f0" }}
                >
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <CalendarBlankIcon size={14} />
                    <Typography fontSize={{ xs: 12, sm: 14 }}>{job.date}</Typography>
                  </Box>
                </TableCell>

                {/* Time */}
                <TableCell
                  sx={{ borderRight: "1px solid #f0f0f0" }}
                >
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <ClockIcon size={14} />
                    <Typography fontSize={{ xs: 12, sm: 14 }}>{job.time}</Typography>
                  </Box>
                </TableCell>

                {/* Requester */}
                <TableCell
                  sx={{ borderRight: "1px solid #f0f0f0" }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar
                      src={job.requesterImg}
                      sx={{ width: { xs: 30, sm: 36 }, height: { xs: 30, sm: 36 } }}
                    />
                    <Typography fontSize={{ xs: 12, sm: 14 }}>
                      {job.requester}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Location */}
                <TableCell
                  sx={{ borderRight: "1px solid #f0f0f0" }}
                >
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <MapPinIcon size={12} color="grey" />
                    <Typography fontSize={{ xs: 11, sm: 13 }} color="grey">
                      {job.location}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Status + View Details (aligned horizontally) */}
                <TableCell>
                  <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    {/* Status */}
                    <Typography
                      fontSize={{ xs: 10, sm: 13 }}
                      sx={{
                        bgcolor: "#E0F7FA",
                        px: 1,
                        borderRadius: 0.5,
                        textAlign: "center",
                        display: "inline-block",
                      }}
                    >
                      {job.status}
                    </Typography>

                    {/* View Details */}
                    <Typography
                      fontSize={{ xs: 10, sm: 12 }}
                      sx={{
                        color: "primary.main",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={handleClick}
                    >
                      View Details
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DesktopJobOffers;
