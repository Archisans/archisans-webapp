import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import plumbingImg from "@/assets/Images/plumbingImg.png";

const services = [
  { id: 1, title: "Plumbing service", rating: 4.8, reviews: 320, img: plumbingImg },
  { id: 2, title: "Electrical service", rating: 4.6, reviews: 280, img: plumbingImg },
];

const WorkerServices = () => {
  return (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: "0px 2px 10px rgba(0,0,0,0.05)", mb: 3, border: "1px solid #e5e7eb", bgcolor: "white" }}>
      <Box display="flex" alignItems="center" mb={3} sx={{ borderBottom: "2px solid #f1f5f9", pb: 1 }}>
        <Typography variant="h6" fontWeight={700} color="#1e293b">My Services</Typography>
      </Box>
      <Grid container spacing={2}>
        {services.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.id}>
            <Card sx={{ borderRadius: 2, border: "1px solid #f1f5f9", bgcolor: "white", boxShadow: "0px 1px 3px rgba(0,0,0,0.05)", transition: "all 0.2s ease-in-out" }}>
              <CardMedia component="img" height="140" image={s.img} alt={s.title} sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>{s.title}</Typography>
                <Typography variant="body2" color="text.secondary">⭐ {s.rating} ({s.reviews} reviews)</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default WorkerServices;
