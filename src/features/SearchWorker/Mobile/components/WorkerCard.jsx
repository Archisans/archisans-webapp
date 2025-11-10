import {
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  Chip,
  useTheme,
} from "@mui/material";
import { MapPinIcon, StarIcon } from "@phosphor-icons/react";
import { RouteProvider } from "@/config/RouteProvider";
import FavouriteAndShareButton from "@/components/Desktop/FavouriteAndShareButton";
import DefaultWorkerImg from '@/assets/Images/DefaultWorkerImg.png'
const WorkerCard = ({ worker, navigate }) => {
  const theme = useTheme();

  return (
    <Box
      onClick={() =>
        navigate(
          RouteProvider.USER_WORKER_INFO.replace(
            ":phoneNumber",
            worker.phone.slice(3)
          )
        )
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
      <Box sx={{ position: "relative", height: 150 }}>
        <img
          src={worker.image ? worker.image : DefaultWorkerImg}
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
          <Box
            sx={{
              position: "absolute",
              top: 7,
              right: 1,
              display: "flex",
              gap: 1,
            }}
          >
            <FavouriteAndShareButton />
          </Box>
        </Stack>
      </Box>

      {/* Info Section */}
      <Box sx={{ px: 1, py: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ maxWidth: "65%", overflow: "hidden" }}
          >
            <Avatar
              src={worker.avatar}
              sx={{ height: 53, width: 53, flexShrink: 0 }}
            />
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                mb={0.4}
                fontSize={18}
                fontWeight={580}
                color="black"
                noWrap
                sx={{ textOverflow: "ellipsis" }}
              >
                {worker.name}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <MapPinIcon size={18} />
                <Typography
                  color="#6c6868ff"
                  fontSize={14}
                  noWrap
                  sx={{ textOverflow: "ellipsis" }}
                >
                  {worker.location}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Stack>

        {/* Roles */}
        <Stack direction="row" spacing={1} mt={1} mb={1}>
          {worker.roles.slice(0, 2).map((role, i) => (
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

          {worker.roles.length > 2 && (
            <Chip
              label={`+${worker.roles.length - 2}`}
              size="small"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                fontWeight: 400,
                fontSize: 10,
                px: 1,
              }}
            />
          )}
        </Stack>

        {/* Description */}
        <Typography
          fontSize={13}
          mb={1.7}
          ml={0.8}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {worker.about}
        </Typography>

        {/* Call Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            textTransform: "none",
            fontSize: 15,
            py: 0.4,
            fontWeight: 400,
          }}
          onClick={() => window.open(`tel:${worker.worker.phone}`, "_self")}
        >
          Call Now
        </Button>
      </Box>
    </Box>
  );
};

export default WorkerCard;
