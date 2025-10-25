import { Box, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { services } from "@/features/Worker/constants";

const MobWorkerServices = () => {
  return (
    <Grid sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
      <Box>
        {/* Section Title */}
        <Typography
          sx={{
            fontSize: { xs: 15, sm: 16, md: 17 },
            fontWeight: 600,
            mt: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 1, sm: 2 },
            ml: { xs: 1, sm: 2 },
            color: "#050a56ff",
          }}
        >
          My Services
        </Typography>

        {/* Service Cards */}
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {services.map((service, idx) => (
            <Grid
              item
              xs={12} // full width on mobile
              sm={6} // two per row on tablet
              md={4} // three per row on desktop
              key={idx}
            >
              <Box
                sx={{
                  p: { xs: 1, sm: 1.5 },
                  borderRadius: 1.5,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  bgcolor: "white",
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={service.img}
                  alt={service.title}
                  sx={{
                    borderRadius: 1,
                    width: "100%",
                    height: { xs: 100, sm: 120, md: 140 },
                    objectFit: "cover",
                  }}
                />

                {/* Content */}
                <Box sx={{ p: 0.5 }}>
                  <Typography
                    fontWeight="550"
                    color="black"
                    gutterBottom
                    sx={{ fontSize: { xs: 12, sm: 13, md: 14 } }}
                  >
                    {service.title} ({service.years})
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
                    <Box display="flex" alignItems="center" gap={0.3}>
                      <StarIcon
                        sx={{
                          fontSize: { xs: 11, sm: 12 },
                          mb: 0.3,
                          color: "#FFD700",
                        }}
                      />
                      <Typography
                        fontSize={{ xs: 9, sm: 10, md: 11 }}
                        fontWeight={500}
                      >
                        {service.rating} ({service.reviews} reviews)
                      </Typography>
                    </Box>

                    {/* <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography
                        fontSize={{ xs: 9, sm: 10, md: 11 }}
                        color="gray"
                      >
                        From{" "}
                        <Typography
                          component="span"
                          fontWeight={500}
                          fontSize={{ xs: 9, sm: 10, md: 11 }}
                          color="black"
                        >
                          {service.price.toLocaleString()} Rs
                        </Typography>
                        /hr
                      </Typography>
                    </Box> */}
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default MobWorkerServices;
