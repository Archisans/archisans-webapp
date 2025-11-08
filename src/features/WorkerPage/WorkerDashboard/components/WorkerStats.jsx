import { Box, Card, Typography, Divider } from "@mui/material";

const WorkerStats = () => {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          gap: 4,
        }}
      >
        <Box flex={1} textAlign="center">
          <Typography variant="h4" fontWeight={700} color="text.primary">
            0
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Works Completed
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box flex={1} textAlign="center">
          <Typography variant="h4" fontWeight={700} color="text.primary">
            0
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Works Cancelled
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box flex={1} textAlign="center">
          <Typography variant="h4" fontWeight={700} color="text.primary">
            0
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Current Review
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default WorkerStats;
