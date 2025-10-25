import { Grid, Avatar, Box, Rating, Stack, Typography } from "@mui/material";

const MobWorkerReviewCard = ({ name, rate, date,review, avatar }) => {
  return (
    <Grid
      sx={{
        p: { xs: 1.5, sm: 2, md: 2.5 },
        mb: { xs: 1.5, sm: 2 },
        border: "1.5px solid #e9e9f8ff",
        borderRadius: 2,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
        bgcolor: "white",
      }}
    >
      {/* 🔹 Top Row: Avatar + Name + Rating + Date */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "flex-end" },
          flexWrap: "wrap",
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Avatar
            src={avatar}
            sx={{
              width: { xs: 45, sm: 55, md: 65 },
              height: { xs: 45, sm: 55, md: 65 },
              border: "3px solid white",
              boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
              mr: { xs: 1.5, sm: 2 },
            }}
          />
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: 15, sm: 17, md: 18 },
              }}
            >
              {name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: 13, sm: 15, md: 16 },
                }}
              >
                {rate}
              </Typography>
              <Rating
                size="small"
                name="half-rating-read"
                value={rate}
                precision={0.5}
                readOnly
              />
            </Stack>
          </Box>
        </Box>

        <Typography
          sx={{
            color: "grey",
            fontSize: { xs: 11, sm: 13, md: 14 },
            fontWeight: 500,
            mt: { xs: 1, sm: 0 }, // pushes down on mobile
          }}
        >
          {date}
        </Typography>
      </Box>

      {/* 🔹 Review Text */}
      <Box sx={{ maxWidth: 850, mt: { xs: 1.5, sm: 2 } }}>
        <Typography
          sx={{
            fontSize: { xs: 13, sm: 15, md: 16 },
            lineHeight: 1.5,
            textAlign: "justify",
          }}
        >
          {review}
        </Typography>
      </Box>
    </Grid>
  );
};

export default MobWorkerReviewCard;
