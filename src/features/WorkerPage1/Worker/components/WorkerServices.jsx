import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  Modal,
  IconButton,
  Divider,
  Rating,
} from "@mui/material";
import { Close, Verified, Schedule, CurrencyRupee } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";

const WorkerServices = ({ worker }) => {
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const sid = parseInt(localStorage.getItem("sid"));
    if (!worker?.services?.length) return;

    // Find the service by sid
    const mainService = worker.services.find((s) => s.id === sid);

    // Pick a random different service
    const otherServices = worker.services.filter((s) => s.id !== sid);
    const randomService =
      otherServices[Math.floor(Math.random() * otherServices.length)];

    // Set filtered services to display
    setFilteredServices([mainService, randomService].filter(Boolean));
  }, [worker]);

  const handleOpen = (service) => {
    setCurrentService(service);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentService(null);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}
      >
        <Typography variant="h6" fontWeight={600} mb={3}>
          Services
        </Typography>

        <Grid container spacing={2}>
          {filteredServices.map((service, idx) => (
            <Grid item xs={12} sm={6} key={service.id}>
              <Box
                onClick={() => handleOpen(service)}
                sx={{
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    borderColor: "#0073b1",
                  },
                }}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                />

                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                  {service.title}
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Chip
                    label={`${service.years} years exp`}
                    size="small"
                    sx={{ bgcolor: "#f3f2ef", color: "#666", fontSize: "0.75rem" }}
                  />
                </Box>

                <Box display="flex" alignItems="center" gap={0.5}>
                  <StarIcon sx={{ fontSize: 16, color: "#ffd700" }} />
                  <Typography variant="body2" color="#666">
                    {service.rating} ({service.reviews})
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper
          elevation={8}
          sx={{
            maxWidth: 450,
            width: "90%",
            maxHeight: "85vh",
            overflow: "auto",
            borderRadius: 3,
            position: "relative",
          }}
        >
          {currentService && (
            <>
              <Box sx={{ position: "relative", height: 140, overflow: "hidden" }}>
                <img
                  src={currentService.img}
                  alt={currentService.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                  }}
                />
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "rgba(255,255,255,0.9)",
                    "&:hover": { bgcolor: "white" },
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>

                <Box sx={{ position: "absolute", bottom: 12, left: 16, right: 16 }}>
                  <Typography variant="h6" fontWeight={700} color="white" mb={0.5}>
                    {currentService.title}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Rating
                      value={currentService.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                    <Typography variant="caption" color="white">
                      {currentService.rating} ({currentService.reviews} reviews)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ p: 3 }}>
                <Grid container spacing={1.5} mb={2}>
                  <Grid item xs={4}>
                    <Paper
                      elevation={1}
                      sx={{ p: 1.5, textAlign: "center", borderRadius: 2, bgcolor: "#e3f2fd" }}
                    >
                      <Schedule sx={{ color: "#1976d2", fontSize: 28, mb: 0.5 }} />
                      <Typography variant="subtitle1" fontWeight={600} color="#1976d2">
                        {currentService.years}
                      </Typography>
                      <Typography variant="caption" color="#666">
                        Experience
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    {/* <Paper
                      elevation={1}
                      sx={{ p: 1.5, textAlign: "center", borderRadius: 2, bgcolor: "#e8f5e8" }}
                    >
                      <CurrencyRupee sx={{ color: "#2e7d32", fontSize: 28, mb: 0.5 }} />
                      <Typography variant="subtitle1" fontWeight={600} color="#2e7d32">
                        ₹{currentService.price}
                      </Typography>
                      <Typography variant="caption" color="#666">
                        {currentService.type || "Per Hour"}
                      </Typography>
                    </Paper> */}
                  </Grid>
                  <Grid item xs={4}>
                    <Paper
                      elevation={1}
                      sx={{ p: 1.5, textAlign: "center", borderRadius: 2, bgcolor: "#fff3e0" }}
                    >
                      <Verified sx={{ color: "#f57c00", fontSize: 28, mb: 0.5 }} />
                      <Typography variant="subtitle1" fontWeight={600} color="#f57c00">
                        {currentService.verified ? "Licensed" : "Unverified"}
                      </Typography>
                      <Typography variant="caption" color="#666">
                        Status
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box mb={2}>
                  <Typography variant="subtitle1" fontWeight={600} mb={1} color="#1976d2">
                    Service Details
                  </Typography>
                  <Typography variant="body2" color="#666" lineHeight={1.6}>
                    {currentService.notes || "Professional service with quality guarantee."}
                  </Typography>
                </Box>

                {currentService.licenseImg && (
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight={600} mb={1} color="#1976d2">
                      Professional License
                    </Typography>
                    <Paper elevation={1} sx={{ p: 1.5, borderRadius: 2, border: "2px solid #e3f2fd" }}>
                      <img
                        src={currentService.licenseImg}
                        alt="License"
                        style={{
                          width: "100%",
                          maxHeight: 150,
                          objectFit: "contain",
                          borderRadius: 6,
                        }}
                      />
                    </Paper>
                  </Box>
                )}
              </Box>
            </>
          )}
        </Paper>
      </Modal>
    </>
  );
};

export default WorkerServices;
