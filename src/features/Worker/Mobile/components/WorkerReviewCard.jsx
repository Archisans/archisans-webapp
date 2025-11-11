import { Grid, Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import { formatDate } from "../../utils/formatDate";

const WorkerReviewCard = ({ reviewer, rating, message, created_at }) => {
  const name = reviewer
    ? [reviewer.first_name, reviewer.last_name].filter(Boolean).join(" ")
    : "Anonymous";

  const avatar = reviewer?.avatar_url;
  const date = formatDate(created_at);

  return (
    <Grid
      sx={{
        p: { xs: 2, sm: 2.5 },
        mb: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            src={avatar}
            alt={name}
            sx={{
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              border: "2px solid white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          />

          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: 15, sm: 17 },
              }}
            >
              {name}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={0.6} sx={{ mt: 0.5 }}>
              <Rating
                name="worker-rating"
                value={rating}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography
                sx={{
                  fontSize: 13,
                  color: "text.secondary",
                  fontWeight: 500,
                }}
              >
                {rating.toFixed(1)}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 12, sm: 13 },
            fontWeight: 500,
            mt: { xs: 1, sm: 0 },
          }}
        >
          {date}
        </Typography>
      </Box>

      {/* Review Text */}
      {message && (
        <Box sx={{ mt: 1.5 }}>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 15 },
              lineHeight: 1.6,
              color: "text.primary",
              textAlign: "justify",
            }}
          >
            {message}
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default WorkerReviewCard;
