import React, { useState } from "react";
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
import FavouriteAndShareButton from "@/components/FavouriteAndShareButton/FavouriteAndShareButton";


const WorkerCard = ({ worker, navigate, setOpen }) => {
  const theme = useTheme();
  const [saved,setSaved] = useState(true);

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": { 
          transform: "translateY(-8px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)"
        },
      }}
      onClick={() =>
        navigate(RouteProvider.USER_WORKER_INFO, {
          state: { name: worker.name, img: worker.avatar },
        })
      }
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="120"
          image={worker.image}
          alt={worker.name}
        />
        
        {/* Action buttons */}
        <Box
  sx={{
    position: "absolute",
    top: 12,
    right: 12,
    display: "flex",
    gap: 1,
  }}
>
  <FavouriteAndShareButton />
</Box>

        {/* Rating badge */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            bgcolor: "rgba(255, 255, 255, 0.85)",
            color: "black",
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <StarIcon size={14} weight="fill" color="#FFD700" />
          <Typography fontSize={12} fontWeight={600}>
            {worker.rating}
          </Typography>
          <Typography fontSize={10} sx={{ opacity: 0.8 }}>
            ({worker.reviews})
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column" }}>
        {/* Worker info */}
        <Stack direction="row" spacing={2} alignItems="flex-start" mb={1.2}>
          <Avatar 
            src={worker.avatar} 
            sx={{ 
              width: 48, 
              height: 48, 
              border: "3px solid white", 
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
            }} 
          />
          <Box flex={1} minWidth={0}>
            <Typography
              variant="h6"
              fontWeight={600}
              mb={0}
              fontSize={16}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {worker.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <MapPinIcon size={12} color="#666" />
              <Typography color="text.secondary" fontSize={11}>
                {worker.location}
              </Typography>
            </Stack>
          </Box>
          {/* <Box textAlign="right">
            <Typography fontSize={11} color="text.secondary" mb={0}>
              Starting at
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={600} fontSize={16}>
              {worker.price}
              <Typography component="span" fontSize={11} color="text.secondary">
                /hr
              </Typography>
            </Typography>
          </Box> */}
        </Stack>

        {/* Skills */}
        <Stack direction="row" spacing={0.5} mb={1} flexWrap="wrap" gap={0.5}>
          {worker.roles.slice(0, 3).map((role, i) => (
            <Chip
              key={i}
              label={role}
              size="small"
              sx={{
                bgcolor: `${theme.palette.primary.main}15`,
                color: theme.palette.primary.main,
                fontWeight: 500,
                fontSize: 10,
                height: 24,
                border: `1px solid ${theme.palette.primary.main}30`,
              }}
            />
          ))}
        </Stack>

        <Typography 
          fontSize={12} 
          color="text.secondary" 
          mb={2}
          sx={{ 
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.4
          }}
        >
          {worker.description}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          size="medium"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            py: 1,
            borderRadius: 2,
            boxShadow: "none",
            "&:hover": { 
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transform: "translateY(-1px)"
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkerCard;