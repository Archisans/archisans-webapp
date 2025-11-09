import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import WorkerCard from "@/features/SearchWorker/components/WorkerCard";

const SearchWorker = ({ workers = [], loading = false }) => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const formattedTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Professionals";

  return (
    <Box
      sx={{
        bgcolor: "linear-gradient(180deg, #f9fafb 0%, #f1f5f9 100%)",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 5,
            borderRadius: 4,
            bgcolor: "white",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            sx={{ mb: 1, letterSpacing: "-0.5px" }}
          >
            {`Available ${formattedTitle}`}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse vetted professionals ready to work on your project.
          </Typography>
        </Paper>

        {/* Empty State */}
        {workers.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              textAlign: "center",
              p: 6,
              borderRadius: 4,
              border: "1px dashed #cbd5e1",
              bgcolor: "#f8fafc",
            }}
          >
            <Typography variant="h6" color="text.secondary" fontWeight={500}>
              No {formattedTitle.toLowerCase()} found
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Try adjusting your filters or check back later.
            </Typography>
          </Paper>
        ) : (
          /* Worker Grid */
          <Grid container spacing={2} justifyContent="center">
            {workers.map((worker, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx} display="flex" justifyContent="center">
                <WorkerCard worker={worker} navigate={navigate} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SearchWorker;
