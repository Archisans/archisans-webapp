import { Box, Typography, Chip } from "@mui/material";

const WorkerServices = ({ services }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
        }}
      >
        {services.map((service) => (
          <Box
            key={service.id}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                borderColor: "#0073b1",
              },
            }}
          >
            <Box
              component="img"
              src={service.image}
              alt={service.title}
              sx={{
                width: "100%",
                height: 100,
                objectFit: "cover",
              }}
            />

            <Box sx={{ p: 1.5 }}>
              <Typography
                variant="body1"
                fontWeight={500}
                mb={1}
                sx={{
                  fontSize: "0.813rem",
                  lineHeight: 1.3,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  minHeight: "1.6em",
                }}
              >
                {service.title}
              </Typography>

              <Chip
                label={`${service.experience} yrs`}
                size="small"
                sx={{
                  bgcolor: "#f3f2ef",
                  color: "#666",
                  fontSize: "0.688rem",
                  height: 22,
                  width: "fit-content",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WorkerServices;
