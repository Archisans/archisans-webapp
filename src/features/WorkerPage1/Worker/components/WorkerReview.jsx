import { useState } from "react";
import {
  Typography,
  Box,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import WorkerReviewCard from "@/features/WorkerPage1/Worker/components/WorkerReviewCard";

const WorkerReview = ({ worker }) => {
  const [sortOption, setSortOption] = useState("latest");

  const handleChange = (event) => setSortOption(event.target.value);

  // Use reviews from the worker prop
  const reviews = worker?.workerReviews || [];

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === "latest") return new Date(b.date) - new Date(a.date);
    return new Date(a.date) - new Date(b.date);
  });

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (r.rate || 0), 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight={600}>
          Reviews ({reviews.length})
        </Typography>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort</InputLabel>
          <Select value={sortOption} label="Sort" onChange={handleChange}>
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Average rating */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          {averageRating}
        </Typography>
        <Rating value={Number(averageRating)} precision={0.1} readOnly />
        <Typography variant="body2" color="#666">
          ({reviews.length} reviews)
        </Typography>
      </Box>

      {/* Reviews list */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sortedReviews.map((review) => (
          <WorkerReviewCard key={review.id} {...review} />
        ))}
      </Box>
    </Paper>
  );
};

export default WorkerReview;
