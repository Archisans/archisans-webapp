import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Divider,
  Collapse,
  IconButton,
  Button,
} from "@mui/material";
import { CalendarMonth, AccessTime, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { RouteProvider } from "@/config/RouteProvider";
import plumbingImg from "@/assets/Images/plumbingImg.png";

const NewRequestsPanel = () => {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const requests = [
    {
      id: 1,
      service: "Plumbing",
      date: "Sunday, 12 June",
      time: "11:00 - 12:00 AM",
      customer: "Dr. Joseph Brostito",
      location: "Palakkad",
      img: plumbingImg,
    },
    {
      id: 2,
      service: "Plumbing",
      date: "Monday, 13 June",
      time: "2:00 - 3:00 PM",
      customer: "Alex Thomas",
      location: "Thrissur",
      img: plumbingImg,
    },
  ];

  const handleToggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        borderLeft: "2px solid #e5e7eb",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        pl:2,
        pr: 1,
      }}
    >
      {/* Heading with View All */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} pt={2}>
        <Typography fontSize={21} fontWeight="600" color="#1e293b">
          New Requests
        </Typography>
        <Typography
          sx={{ color: "#0ea5e9", fontWeight: 600, cursor: "pointer" }}
          onClick={() => navigate(RouteProvider.WORKER_ASSIGNED_WORKS)}
        >
          View All
        </Typography>
      </Box>

      {requests.map((r) => (
        <Card
          key={r.id}
          sx={{
            mb: 2,
            borderRadius: 1,
            bgcolor: "white",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Box
            onClick={() => handleToggle(r.id)}
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={r.img} variant="rounded" sx={{ width: 50, height: 50, borderRadius: 1 }} />
              <Typography fontWeight={700} color="#111827">
                {r.service}
              </Typography>
            </Box>
            <IconButton size="small">{expandedId === r.id ? <ExpandLess /> : <ExpandMore />}</IconButton>
          </Box>

          <Collapse in={expandedId === r.id} timeout="auto" unmountOnExit>
            <Divider />
            <Box p={2}>
              <Box display="flex" alignItems="center" gap={1} mb={0.7}>
                <CalendarMonth fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {r.date}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <AccessTime fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {r.time}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar />
                <Box>
                  <Typography fontSize={14} fontWeight={600} color="#111827">
                    {r.customer}
                  </Typography>
                  <Typography fontSize={12.5} color="#838282ff">
                    {r.location}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  variant="outlined"
                  sx={{ fontSize: "0.85rem", minHeight: 28, py: 0.3, px: 3.6, textTransform: "none" }}
                >
                  Decline
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "0.85rem",
                    minHeight: 28,
                    py: 0.3,
                    px: 3.6,
                    bgcolor: "#e11d48",
                    "&:hover": { bgcolor: "#be123c" },
                    textTransform: "none",
                  }}
                >
                  Accept
                </Button>
              </Box>
            </Box>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
};

export default NewRequestsPanel;
