import {
  Box,
  Typography,
  Avatar,
  Stack,
  IconButton,
  InputBase,
} from "@mui/material";
import {
  Tune,
  Search,
  LocationOnOutlined,
  ArrowBackIos,
} from "@mui/icons-material";
import { BellIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { RouteProvider } from "@/config/RouteProvider";
import WorkerCard from "./components/WorkerCard";

const SearchWorker = ({ workers }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 2,
          px: 2,
        }}
      >
        {/* Location Info */}
        <Box display="flex" alignItems="center">
          <ArrowBackIos
            sx={{ fontSize: 23, cursor: "pointer", color: "grey" }}
            onClick={() => navigate(-1)}
          />
          <Box display="flex">
            <LocationOnOutlined
              sx={{ fontSize: 25, mr: 1, mt: 0.5, color: "black" }}
            />
            <Box display="flex" flexDirection="column">
              <Typography
                variant="caption"
                color="gray"
                sx={{ lineHeight: 1, fontSize: 13 }}
              >
                Current Location
              </Typography>
              <Typography sx={{ fontWeight: "Bold", fontSize: 15 }}>
                Thrissur, Kerala
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Notification and Avatar */}
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            onClick={() => navigate(RouteProvider.USER_SETTINGS_NOTIFICATION)}
          >
            <BellIcon color="#050b5fff" />
          </IconButton>
          <Avatar
            onClick={() => navigate(RouteProvider.USER_PROFILE_EDIT)}
            sx={{ width: 32, height: 32 }}
            src="https://randomuser.me/api/portraits/men/83.jpg"
          />
        </Stack>
      </Box>

      {/* Search Bar */}
      <Box
        mt={2}
        display="flex"
        alignItems="center"
        border="1px solid #ccc"
        borderRadius={1}
        px={1}
        py={1}
        mx={1}
        mb={2}
      >
        <Search
          sx={{ mr: 1, cursor: "pointer" }}
          onClick={() => navigate(RouteProvider.USER_WORKER_SEARCH)}
        />
        <InputBase
          sx={{ fontSize: "14px" }}
          placeholder="Search Services & Workers"
          fullWidth
        />
        <Tune
          sx={{ color: "#888" }}
          onClick={() => navigate("/mobile-Search-filter")}
        />
      </Box>

      {/* Worker Cards or Empty State */}
      {workers && workers.length > 0 ? (
        workers.map((worker, idx) => (
          <WorkerCard key={idx} worker={worker} navigate={navigate} />
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            px: 3,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Search sx={{ fontSize: 40, color: "#9e9e9e" }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#424242",
              textAlign: "center",
              mb: 1,
            }}
          >
            No Matching Professionals
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#757575",
              textAlign: "center",
              maxWidth: "300px",
              lineHeight: 1.5,
            }}
          >
            No Professionals found in your location. Try searching for different
            services or check back later.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchWorker;
