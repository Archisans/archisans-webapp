import { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Rating,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MobWorkerReviewCard from "@/features/Worker/Mobile/components/WorkerReviewCard";
import { workerReviews } from "@/features/Worker/constants";

const MobWorkerReview = () => {
  const [sortOption, setSortOption] = useState("latest");

  const handleChange = (event) => {
    setSortOption(event.target.value);
  };

  // 🔹 Sorting logic
  const sortedReviews = [...workerReviews].sort((a, b) => {
    if (sortOption === "latest") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  return (
    <Grid sx={{ p: 1 }}>
      {/* Header Section */}
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          border: "2px solid #eaeaea",
          p: 1,
          borderRadius: 1,
        }}
      >
        <Stack spacing={0.5} sx={{ pl: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
              4.5
            </Typography>
            <Rating
              size="medium"
              name="half-rating-read"
              defaultValue={4.5}
              precision={0.5}
              readOnly
            />
          </Stack>
          <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
            {workerReviews.length} reviews
          </Typography>
        </Stack>

        <Box sx={{ width: 120 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="sort-select-label">Sort</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortOption}
              label="Sort"
              onChange={handleChange}
            >
              <MenuItem value="latest">Latest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>

      {/* Review Cards */}
      {sortedReviews.map((review) => (
        <MobWorkerReviewCard key={review.id} {...review} />
      ))}
    </Grid>
  );
};

export default MobWorkerReview;
