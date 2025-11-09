import { Box, Typography, Paper, Chip, Grid } from "@mui/material";

const WorkerServices = ({ services = [] }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={3}>
        Services
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "stretch", // ✅ makes all cards same height
        }}
      >
        {services.map((service, idx) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={service.id || idx}
            sx={{
              display: "flex",
              justifyContent: "center", // ✅ keeps all cards centered
            }}
          >
            <Box
              sx={{
                width: "100%", // ✅ same width within grid cell
                maxWidth: 320, // ✅ uniform card width (can adjust)
                height: "100%",
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderColor: "#0073b1",
                  transform: "translateY(-3px)", // ✅ smooth lift hover
                },
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  width: "100%",
                  height: 150, // ✅ uniform image height
                  mb: 1.5,
                  borderRadius: 1,
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              {/* Title */}
              <Typography
                variant="subtitle1"
                fontWeight={600}
                mb={1}
                sx={{
                  wordBreak: "break-word",
                  textAlign: "center",
                  flexGrow: 1,
                }}
              >
                {service.title || "No title available"}
              </Typography>

              {/* Experience */}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt="auto"
              >
                <Chip
                  label={`${service.experience || "0"} years exp`}
                  size="small"
                  sx={{
                    bgcolor: "#f3f2ef",
                    color: "#666",
                    fontSize: "0.75rem",
                    fontWeight: 500,
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
