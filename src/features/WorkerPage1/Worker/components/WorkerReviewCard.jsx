import { Box, Avatar, Rating, Typography } from "@mui/material";

const WorkerReviewCard = ({ name, rate, date, review, avatar }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        "&:hover": {
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar src={avatar} sx={{ width: 48, height: 48 }} />
        <Box flex={1}>
          <Typography variant="subtitle2" fontWeight={600}>
            {name}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Rating value={rate} size="small" readOnly />
            <Typography variant="caption" color="#666">
              {date}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Typography variant="body2" color="#666" lineHeight={1.5}>
        {review}
      </Typography>
    </Box>
  );
};

export default WorkerReviewCard;
