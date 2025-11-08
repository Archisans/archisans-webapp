import { Box, Typography, Paper, Chip, Grid } from "@mui/material";

const WorkerServices = ({ services }) => {
  return (
    <Paper
      elevation={0}
      sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}
    >
      <Typography variant="h6" fontWeight={600} mb={3}>
        Services
      </Typography>

      <Grid container spacing={2}>
        {services.map((service, idx) => (
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
                src={service.image}
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

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Chip
                  label={`${service.experience} years exp`}
                  size="small"
                  sx={{
                    bgcolor: "#f3f2ef",
                    color: "#666",
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default WorkerServices;
