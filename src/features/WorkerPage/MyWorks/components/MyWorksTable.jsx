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
  Button,
} from "@mui/material";
import { CalendarBlankIcon, ClockIcon, MapPinIcon } from "@phosphor-icons/react";

const MyWorksTable = ({
  jobs,
  showActions = false,
  showStatus = true,
  onViewDetails,
  onCancel,
  onComplete,
}) => {
  return (
    <Box mt={2} px={2} mb={4}>
      <TableContainer component={Paper} sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Service</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Location</TableCell>
              {showStatus && <TableCell>Status</TableCell>}
              {showActions && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} hover>
                {/* Service */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontSize={14} fontWeight={600}>
                      {job.service.name}
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

                {/* User  */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={job.worker.avatar} sx={{ width: 36, height: 36 }} />
                    <Typography fontSize={13}>{job.worker.name}</Typography>
                  </Box>
                </TableCell>

                {/* Location */}
                <TableCell>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <MapPinIcon size={12} color="grey" />
                    <Typography fontSize={12} color="grey">
                      {job.fullAddress}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Status + View Details */}
                {showStatus && (
                  <TableCell>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={0.5}>
                      <Typography
                        fontSize={12}
                        sx={{
                          bgcolor: "#E0F7FA",
                          display: "inline-block",
                          px: 1,
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
                        }}
                        onClick={() => onViewDetails && onViewDetails(job)}
                      >
                        View Details
                      </Typography>
                    </Box>
                  </TableCell>
                )}

                {/* Actions */}
                {showActions && (
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ color: "black", textTransform: "none" }}
                        onClick={() => onCancel && onCancel(job)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ textTransform: "none" }}
                        onClick={() => onComplete && onComplete(job)}
                      >
                        Complete
                      </Button>
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyWorksTable;
