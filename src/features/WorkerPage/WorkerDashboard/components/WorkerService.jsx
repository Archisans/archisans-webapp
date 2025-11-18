import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

const WorkerServices = ({ professions = [] }) => {
  const services = professions.flatMap((category) =>
    category.services.map((service) => ({
      ...service,
      categoryTitle: category.title,
    }))
  );

  if (!services.length) {
    return (
      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          bgcolor: "white",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          No services added yet.
        </Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
        mb: 3,
        border: "1px solid #e5e7eb",
        bgcolor: "white",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={3}
        sx={{ borderBottom: "2px solid #f1f5f9", pb: 1 }}
      >
        <Typography variant="h6" fontWeight={700} color="#1e293b">
          My Services
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {services.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.id}>
            <Card
              sx={{
                borderRadius: 2,
                border: "1px solid #f1f5f9",
                bgcolor: "white",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease-in-out",
                "&:hover": { boxShadow: "0px 3px 8px rgba(0,0,0,0.1)" },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={s.imageUrl}
                alt={s.name}
                sx={{
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  gutterBottom
                  noWrap
                >
                  {s.title?.endsWith("s") ? s.title.slice(0, -1) : s.title}
                </Typography>
                {s.experience && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Experience: {s.experience} years
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default WorkerServices;
