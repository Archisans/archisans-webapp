import React from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Grid,
  TextField,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "@mui/icons-material";

const MigrantWorkersModal = ({ open, onClose }) => {
  const theme = useTheme();

  const handleSubmit = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onClose={onClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.35 }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 850,
                maxHeight: "90vh",
                overflow: "hidden",
                background: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(20px)",
                borderRadius: "24px",
                p: 3,
                boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
              }}
            >
              {/* Scrollable Area */}
              <Box
                sx={{
                  maxHeight: "82vh",
                  overflowY: "auto",
                  pr: 1,
                  scrollbarWidth: "thin",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={800}
                    >
                      ARCHISANS
                    </Typography>

                    <Typography
                      color="text.secondary"
                      fontSize="14px"
                    >
                      Book Migrant Workers
                    </Typography>
                  </Box>

                  <IconButton onClick={onClose}>
                    <Close />
                  </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Form */}
                <Grid container spacing={2}>
                  {/* Company */}
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>
                      Company / Builder Details
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Contact Person"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Office Address"
                    />
                  </Grid>

                  {/* Project */}
                  <Grid item xs={12} mt={1}>
                    <Typography fontWeight={700}>
                      Project Details
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Project Name"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Project Location"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Project Duration"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Workers Required"
                    />
                  </Grid>

                  {/* Worker Requirement */}
                  <Grid item xs={12} mt={1}>
                    <Typography fontWeight={700}>
                      Worker Categories Needed
                    </Typography>
                  </Grid>

                  {[
                    "Mason",
                    "Carpenter",
                    "Electrician",
                    "Plumber",
                    "Painter",
                    "Welder",
                    "Helper",
                    "Tile Worker",
                  ].map((item) => (
                    <Grid item xs={12} md={6} key={item}>
                      <TextField
                        fullWidth
                        label={`${item} Quantity`}
                      />
                    </Grid>
                  ))}

                  {/* Notes */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Additional Instructions"
                    />
                  </Grid>

                  {/* Submit */}
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      onClick={handleSubmit}
                      sx={{
                        mt: 2,
                        height: "52px",
                        borderRadius: "14px",
                        fontWeight: 700,
                        fontSize: "16px",
                        textTransform: "none",
                        background:
                          "linear-gradient(135deg,#FFD700,#FFC107)",
                        color: "#111",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg,#FFC107,#FFB300)",
                        },
                      }}
                    >
                      Submit Request
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default MigrantWorkersModal;