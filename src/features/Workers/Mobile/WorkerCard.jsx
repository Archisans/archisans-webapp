import {
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  IconButton,
  Chip,
  useTheme,
} from "@mui/material";
import {
  MapPinIcon,
  ShareNetworkIcon,
  HeartIcon,
  StarIcon,
} from "@phosphor-icons/react";

import { RouteProvider } from "@/config/RouteProvider";

const WorkerCard = ({ worker, navigate, setOpen }) => {
  const theme = useTheme();

  return (
    <Box
      onClick={() =>
        navigate(RouteProvider.USER_WORKER_INFO, {
          state: {
            name: worker.name,
            img: worker.avatar,
          },
        })
      }
      sx={{
        mx: 2,
        mb: 2,
        borderRadius: 0.5,
        bgcolor: "#fff",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Image with Rating */}
      <Box sx={{ position: "relative", height: 110 }}>
        <img
          src={worker.image}
          alt="background"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Rating Box */}
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "rgba(255, 255, 255, 0.8)",
            borderRadius: 2,
            px: 1,
            py: 0.1,
            display: "flex",
            alignItems: "center",
            boxShadow: 2,
          }}
        >
          <StarIcon
            fontSize={12}
            weight="fill"
            color={theme.palette.primary.main}
            mb={1}
          />
          <Typography
            fontSize={11}
            fontWeight={600}
            color="black"
            ml={0.3}
            mt={0.2}
          >
            {worker.rating}
          </Typography>
          <Typography fontSize={9} fontWeight={600} color="black" mt={0.4}>
            ({worker.reviews} reviews)
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <IconButton sx={{ bgcolor: "rgba(255,255,255,0.75)" }} size="small">
            <ShareNetworkIcon
              fontSize="medium"
              color={theme.palette.primary.main}
            />
          </IconButton>
          <IconButton sx={{ bgcolor: "rgba(255,255,255,0.75)" }} size="small">
            <HeartIcon fontSize="medium" color="#ff0000ff" />
          </IconButton>
        </Stack>
      </Box>

      {/* Info Section */}
      <Box sx={{ px: 1, py: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={worker.avatar} sx={{ height: 53, width: 53 }} />
            <Box>
              <Typography mb={0.4} fontSize={18} fontWeight={580} color="black">
                {worker.name}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <MapPinIcon size={18} />
                <Typography color="#6c6868ff" fontSize={14}>
                  {worker.location}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Box textAlign="right" mr={1.5}>
            <Typography fontSize={15.5} color="grey">
              Starts from
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography fontSize={18} fontWeight={500} color="black">
                {worker.price}
              </Typography>
              <Typography color="grey"> /hr</Typography>
            </Box>
          </Box>
        </Stack>

        {/* Roles */}
        <Stack direction="row" spacing={1} mt={1} mb={1}>
          {worker.roles.map((role, i) => (
            <Chip
              key={i}
              label={role}
              size="small"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                fontWeight: 400,
                fontSize: 10,
                px: 1,
              }}
            />
          ))}
        </Stack>

        {/* Description */}
        <Typography fontSize={13} mb={1.7} ml={0.8}>
          {worker.description}
        </Typography>

        {/* Book Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            textTransform: "none",
            fontSize: 15,
            py: 0.4,
            fontWeight: 400,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

export default WorkerCard;
