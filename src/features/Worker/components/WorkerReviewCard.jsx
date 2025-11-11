import { Box, Avatar, Rating, Typography, Stack } from "@mui/material";
import { formatDate } from "../utils/formatDate";

const WorkerReviewCard = ({ reviewer, rating, message, created_at }) => {
  const name = reviewer
    ? [reviewer.first_name, reviewer.last_name].filter(Boolean).join(" ")
    : "Anonymous";

  const avatar = reviewer?.avatar_url;
  const date = formatDate(created_at);

  return (
    <Box
      sx={{
        p: 2.5,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        bgcolor: "background.paper",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={1.5}>
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            width: 52,
            height: 52,
            border: "2px solid white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        />

        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            {name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.7}>
            <Rating value={rating} precision={0.5} size="small" readOnly />
            <Typography variant="body2" color="text.secondary">
              {rating.toFixed(1)}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              {date}
            </Typography>
          </Stack>
        </Box>
      </Box>

      {message && (
        <Typography
          variant="body2"
          color="text.primary"
          lineHeight={1.6}
          sx={{ mt: 1 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default WorkerReviewCard;
