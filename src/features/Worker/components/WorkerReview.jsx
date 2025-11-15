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
  Divider,
  CircularProgress,
} from "@mui/material";
import WorkerReviewCard from "@/features/Worker/Components/WorkerReviewCard";
import { useWorkerReview } from "@/hooks/useWorkerReview";

const WorkerReview = ({ workerId }) => {
  const [sortOption, setSortOption] = useState("latest");
  const { reviews, loading, error } = useWorkerReview(workerId);

  const handleChange = (event) => setSortOption(event.target.value);

  const sortedReviews = [...(reviews || [])].sort((a, b) => {
    const da = new Date(a.created_at);
    const db = new Date(b.created_at);
    return sortOption === "latest" ? db - da : da - db;
  });

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length
        ).toFixed(1)
      : 0;

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" mt={2}>
        {error}
      </Typography>
    );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        bgcolor: "background.paper",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
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
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={3}
        sx={{ flexWrap: "wrap" }}
      >
        <Typography variant="h5" fontWeight={600}>
          {averageRating}
        </Typography>
        <Rating value={Number(averageRating)} precision={0.1} readOnly />
        <Typography variant="body2" color="text.secondary">
          ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Reviews list */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <WorkerReviewCard key={review.id} {...review} />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No reviews yet.
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default WorkerReview;
