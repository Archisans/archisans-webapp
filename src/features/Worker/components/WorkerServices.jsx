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
        justifyContent="left"
        alignItems="stretch" // ✅ same height alignment
      >
        {services.map((service, idx) => (
          <Grid
            item
            key={service.id || idx}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 260, // ✅ fixed width for all cards
                minHeight: 100, // ✅ gives consistent height baseline
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                transition: "all 0.25s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  borderColor: "#0073b1",
                  transform: "translateY(-3px)",
                },
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  width: "100%",
                  height: 150,
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
                mb={1.5}
                sx={{
                  wordBreak: "break-word", // ✅ wrap long text
                  textAlign: "center",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2, // ✅ limit to 2 lines
                  overflow: "hidden",
                  minHeight: "3.2em", // ✅ maintain equal height
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
