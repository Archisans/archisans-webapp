import { Box, Typography, Avatar, Button, Chip } from "@mui/material";
import { Edit as EditIcon, Verified } from "@mui/icons-material";
import { RouteProvider } from "@/config/RouteProvider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const WorkerHeader = ({ navigate, worker }) => {
  console.log(worker)
  return (
    <Box sx={{ mb: 4, position: "relative" }}>
      <Box sx={{ position: "relative", overflow: "hidden", borderRadius: 3 }}>
        {/* Background Image */}
        <Box
          component="img"
          src={worker.coverPhoto || "https://images.unsplash.com/photo-1505691938895-1758d7feb511"}
          alt="Header Background"
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            filter: "blur(40px)",
            zIndex: 1,
          }}
        />
      </Box>

      {/* Main Content Card */}
      <Box
        sx={{
          mt: -6,
          mx: 3,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          border: "1px solid",
          borderColor: "divider",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={worker.personal.imageUrl}
                alt={worker.personal.fullName}
                sx={{
                  width: 88,
                  height: 88,
                  border: "4px solid",
                  borderColor: "background.paper",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                  width: 16,
                  height: 16,
                  bgcolor: "#22c55e",
                  borderRadius: "50%",
                  border: "3px solid",
                  borderColor: "background.paper",
                }}
              />
            </Box>

            {/* Name and Details */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="text.primary"
                  sx={{ letterSpacing: "-0.02em" }}
                >
                  {worker.personal.fullName}
                </Typography>
                <Verified sx={{ fontSize: 20, color: "#3b82f6" }} />
              </Box>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 1, fontWeight: 500 }}
              >
                {worker.personal.phoneNumber}
              </Typography>

              {/* Status Chips */}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  label="Available"
                  size="small"
                  sx={{
                    bgcolor: "rgba(34, 197, 94, 0.1)",
                    color: "#16a34a",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    height: 24,
                  }}
                />
              </Box>
            </Box>
          </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  <Button
    variant="contained"
    startIcon={<EditIcon />}
    onClick={() => navigate(RouteProvider.WORKER_PROFILE)}
    sx={{
      bgcolor: "#0e1c79",
      color: "white",
      textTransform: "none",
      borderRadius: 2,
      px: 3,
      py: 1.2,
      fontWeight: 600,
      fontSize: "0.9rem",
      "&:hover": { bgcolor: "#0e1c79" },
    }}
  >
    Edit Profile
  </Button>

  <Button
    variant="outlined"
    startIcon={<AddCircleOutlineIcon />}
    onClick={() => navigate(RouteProvider.WORKER_PORTFOLIO)}
    sx={{
      color: "#0e1c79",
      borderColor: "#0e1c79",
      textTransform: "none",
      borderRadius: 2,
      px: 3,
      py: 1.2,
      fontWeight: 600,
      fontSize: "0.9rem",
      "&:hover": {
        borderColor: "#0e1c79",
        backgroundColor: "rgba(14, 28, 121, 0.06)",
      },
    }}
  >
    Add Portfolio
  </Button>
</Box>

        </Box>
      </Box>
    </Box>
  );
};

export default WorkerHeader;