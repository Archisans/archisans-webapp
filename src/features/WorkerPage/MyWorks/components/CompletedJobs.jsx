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

const DesktopCompletedJobs = () => {

  const navigate = useNavigate();

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
      status: "Completed",
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
      status: "Completed",
    },
  ];

  const handleClick = () => {
    navigate(RouteProvider.WORKER_WORK_INFO);
  };

  return (
    <Box mt={2} px={2} mb={4}>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Job</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Requester</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} hover>
                {/* Job */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar
                      variant="rounded"
                      src={job.jobImg}
                      sx={{ width: 50, height: 50 }}
                    />
                    <Typography fontSize={14} fontWeight={600}>
                      {job.job}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Date */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <CalendarBlankIcon size={14} />
                    <Typography fontSize={13}>{job.date}</Typography>
                  </Box>
                </TableCell>

                {/* Time */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <ClockIcon size={14} />
                    <Typography fontSize={13}>{job.time}</Typography>
                  </Box>
                </TableCell>

                {/* Requester */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar
                      src={job.requesterImg}
                      sx={{ width: 36, height: 36 }}
                    />
                    <Typography fontSize={13}>{job.requester}</Typography>
                  </Box>
                </TableCell>

                {/* Location */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <MapPinIcon size={12} color="grey" />
                    <Typography fontSize={12} color="grey">
                      {job.location}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Status + View Details */}
{/* Status + View Details */}
<TableCell>
  <Box display="flex" flexDirection="column" alignItems="flex-start" gap={0.5}>
                 <Typography
                      fontSize={12}
                      sx={{
                        bgcolor: "#E0F7FA",
                        display: "inline-block",
                        pr: 1,
                        borderRadius: 0.5,
                      }}
                    >
                      {job.status}
                    </Typography>

    <Typography
      fontSize={12}
      sx={{
        color: "primary.main",
        cursor: "pointer",
        textDecoration: "underline",
        fontWeight: 500,
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

export default DesktopCompletedJobs;
