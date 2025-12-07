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
import FavouriteAndShareButton from "@/components/FavouriteAndShareButton/FavouriteAndShareButton";
import DefaultWorkerImg from '@/assets/Images/DefaultWorkerImg.png';

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
        bgcolor: "neutral.bg.50",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Image */}
      <Box sx={{ position: "relative", height: 150 }}>
        <img
          src={worker.image || DefaultWorkerImg}
          alt="Worker"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Rating */}
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "neutral.bg.100",
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
          />

          <Typography fontSize={11} fontWeight={600} ml={0.3}>
            {worker.rating}
          </Typography>

          <Typography fontSize={9} fontWeight={600} ml={0.4}>
            ({worker.reviews} reviews)
          </Typography>
        </Box>

        {/* Action Button */}
        {/* <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <FavouriteAndShareButton showShare={false} />
        </Box> */}
      </Box>

      {/* Info Section */}
      <Box sx={{ px: 1, py: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            src={worker.avatar}
            sx={{ height: 53, width: 53, flexShrink: 0 }}
          />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Name */}
            <Typography
              fontSize={18}
              fontWeight={580}
              color="neutral.content.900"
              noWrap
              sx={{ textOverflow: "ellipsis" }}
            >
              {worker.name}
            </Typography>

            {/* Location */}
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <MapPinIcon size={14} />

              <Typography
                color="neutral.content.700"
                fontSize={14}
                noWrap
                sx={{
                  maxWidth: 190,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {worker.location}
              </Typography>
            </Stack>
          </Box>
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
                color: "neutral.bg.50",
                fontSize: 10,
              }}
            />
          ))}

          {worker.roles.length > 2 && (
            <Chip
              label={`+${worker.roles.length - 2}`}
              size="small"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "neutral.bg.50",
                fontSize: 10,
              }}
            />
          )}
        </Stack>

        {/* About */}
        <Typography
          fontSize={13}
          mb={1.7}
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
          sx={{ textTransform: "none", fontSize: 15, py: 0.4 }}
          onClick={() => window.open(`tel:${worker.phone}`, "_self")}
        >
          Call Now
        </Button>
      </Box>
    </Box>
  );
};

export default WorkerCard;
