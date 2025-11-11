import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Chip,
} from "@mui/material";

const WorkerServices = ({ professions = [] }) => {
  const services = professions.flatMap((category) =>
    category.services.map((service) => ({
      ...service,
      categoryTitle: category.title,
    }))
  );

  if (!services.length) {
    return (
      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          bgcolor: "white",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          No services added yet.
        </Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
        mb: 3,
        border: "1px solid #e5e7eb",
        bgcolor: "white",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={3}
        sx={{ borderBottom: "2px solid #f1f5f9", pb: 1 }}
      >
        <Typography variant="h6" fontWeight={700} color="#1e293b">
          My Services
        </Typography>
      </Box>

      {/* ✅ Equal height & width cards with modern layout */}
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {services.map((s, idx) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={s.id || idx}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 260, // ✅ fixed consistent width
                minHeight: 100,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                cursor: "pointer",
                bgcolor: "white",
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
                  src={s.imageUrl}
                  alt={s.title}
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
                  wordBreak: "break-word",
                  textAlign: "center",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1, // ✅ limit to 2 lines
                  overflow: "hidden",
                  minHeight: "1.2em", // ✅ maintain equal height
                }}
              >
                {s.title || "No title available"}
              </Typography>

              {/* Experience */}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt="auto"
              >
                <Chip
                  label={`Experience: ${s.experience || "0"} years`}
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
    </Card>
  );
};

export default WorkerServices;
