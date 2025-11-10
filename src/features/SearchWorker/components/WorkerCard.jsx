import {
  Box,
  Avatar,
  Typography,
  Button,
  Stack,
  Chip,
  useTheme,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { MapPinIcon, StarIcon } from "@phosphor-icons/react";
import { RouteProvider } from "@/config/RouteProvider";
import FavouriteAndShareButton from "@/components/Desktop/FavouriteAndShareButton";
import DefaultWorkerImg from '@/assets/Images/DefaultWorkerImg.png'


const WorkerCard = ({ worker, navigate }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 400,
        borderRadius: 3,
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
        },
        maxWidth: 320, // good for 3–4 cards per row on desktop
        mx: "auto",
      }}
      onClick={() =>
        navigate(
          RouteProvider.USER_WORKER_INFO.replace(
            ":phoneNumber",
            worker.phone.slice(3)
          )
        )
      }
    >
      {/* IMAGE + ACTIONS */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
  component="img"
  height="160"
  image={worker.image ? worker.image : DefaultWorkerImg}
  alt={worker.name}
  sx={{
    objectFit: "cover",
    objectPosition: worker.image ? "center" : "left center", // default image starts from left
    backgroundColor: "#f5f5f5", // optional, looks good if image has transparent edges
  }}
/>



        {/* Favourite + Share */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            display: "flex",
            gap: 1,
            zIndex: 2,
          }}
        >
          <FavouriteAndShareButton />
        </Box>

        {/* Rating Badge */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(4px)",
            color: "black",
            borderRadius: 2,
            px: 1.4,
            py: 0.4,
            display: "flex",
            alignItems: "center",
            gap: 0.4,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <StarIcon size={14} weight="fill" color="#FFD700" />
          <Typography fontSize={12} fontWeight={600}>
            {worker.rating}
          </Typography>
          <Typography fontSize={10} sx={{ opacity: 0.7 }}>
            ({worker.reviews})
          </Typography>
        </Box>
      </Box>

      {/* CONTENT */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2.5,
        }}
      >
        <Box>
          {/* AVATAR + NAME + LOCATION */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            mb={1.8}
            sx={{ minWidth: 0 }}
          >
            <Avatar
              src={worker.avatar}
              sx={{
                width: 56,
                height: 56,
                border: "3px solid white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                noWrap
                fontSize={17}
                sx={{ textOverflow: "ellipsis" }}
              >
                {worker.name}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <MapPinIcon size={13} color="#777" />
                <Typography
                  color="text.secondary"
                  fontSize={12}
                  noWrap
                  sx={{ textOverflow: "ellipsis" }}
                >
                  {worker.location}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          {/* ROLES */}
          <Stack
            direction="row"
            spacing={0.5}
            mb={1.3}
            flexWrap="wrap"
            gap={0.5}
            sx={{ maxHeight: 56, overflow: "hidden" }}
          >
            {worker.roles.slice(0, 3).map((role, i) => (
              <Chip
                key={i}
                label={role}
                size="small"
                sx={{
                  bgcolor: `${theme.palette.primary.main}12`,
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: 11,
                  height: 24,
                  border: `1px solid ${theme.palette.primary.main}25`,
                }}
              />
            ))}
            {worker.roles.length > 3 && (
              <Chip
                label={`+${worker.roles.length - 3}`}
                size="small"
                sx={{
                  bgcolor: `${theme.palette.primary.main}12`,
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: 11,
                  height: 24,
                  border: `1px solid ${theme.palette.primary.main}25`,
                }}
              />
            )}
          </Stack>

          {/* ABOUT / DESCRIPTION */}
          <Typography
            fontSize={13}
            color="text.secondary"
            mb={2.2}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.5,
              Height: "3em",
              wordBreak:"break-word",
            }}
          >
            {worker.about}
          </Typography>
        </Box>

        {/* CALL BUTTON */}
        <Button
          fullWidth
          variant="contained"
          size="medium"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: 15,
            py: 1,
            borderRadius: 2,
            mt: "auto",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              transform: "translateY(-1px)",
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(`tel:${worker.phone}`, "_self");
          }}
        >
          Call Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkerCard;
