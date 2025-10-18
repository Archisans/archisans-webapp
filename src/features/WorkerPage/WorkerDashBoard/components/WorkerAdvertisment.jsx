import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Box, CardMedia, Typography } from "@mui/material";

import "swiper/css";
import "swiper/css/autoplay";

import Ad4 from "@/assets/Images/Ad4.png";
import Ad5 from "@/assets/Images/Ad5.png";
import Ad6 from "@/assets/Images/Ad6.png";

const WorkerAdvertisment = () => {
  const dummyAds = [
    { title: "Plumbing Discount", mobileImageUrl: Ad6 },
    { title: "Electrical Promo", mobileImageUrl: Ad4 },
    { title: "Home Cleaning Offer", mobileImageUrl: Ad5 },
    { title: "Painting Discount", mobileImageUrl: Ad6 },
    { title: "Carpentry Promo", mobileImageUrl: Ad4 },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", py: 2 }}>
      {/* Sponsored Heading */}
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 16,
          mb: 2,
          color: "#1e293b",
        }}
      >
        Sponsored
      </Typography>

      <Swiper
        slidesPerView={3} 
        spaceBetween={10}
        loop={true} 
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },   // mobile
          600: { slidesPerView: 2 }, // small screens / tablet
          900: { slidesPerView: 3 }, // desktop and larger screens
        }}
        modules={[Autoplay]}
      >
        {dummyAds.map((item, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ cursor: "pointer" }}>
              <CardMedia
                component="img"
                image={item.mobileImageUrl}
                alt={item.title}
                sx={{
                  width: "100%",
                  height: 130,
                  objectFit: "cover",
                  borderRadius: 1,
                  mb: 1,
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  textAlign: "center",
                  color: "#111827",
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default WorkerAdvertisment;
