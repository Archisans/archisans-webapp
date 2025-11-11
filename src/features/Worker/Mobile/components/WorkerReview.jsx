import { useState, useMemo } from "react";
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
  CircularProgress,
} from "@mui/material";
import WorkerReviewCard from "@/features/Worker/Mobile/components/WorkerReviewCard";
import { useWorkerReview } from "@/hooks/useWorkerReview";

const WorkerReview = ({ workerId }) => {
  const [sortOption, setSortOption] = useState("latest");
  const { reviews, loading, error, stats } = useWorkerReview(workerId);

  const handleChange = (event) => setSortOption(event.target.value);

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOption === "latest" ? dateB - dateA : dateA - dateB;
    });
    return sorted;
  }, [reviews, sortOption]);

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
          borderRadius: 2,
        }}
      >
        <Stack spacing={0.5} sx={{ pl: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontWeight: "bold", fontSize: "22px" }}>
              {stats.average}
            </Typography>
            <Rating
              size="medium"
              name="worker-rating"
              value={parseFloat(stats.average)}
              precision={0.5}
              readOnly
            />
          </Stack>
          <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
            {stats.count} reviews
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 5,
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
          {error}
        </Typography>
      ) : sortedReviews.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          No reviews yet.
        </Typography>
      ) : (
        sortedReviews.map((review) => (
          <WorkerReviewCard key={review.id} {...review} />
        ))
      )}
    </Grid>
  );
};

export default WorkerReview;
