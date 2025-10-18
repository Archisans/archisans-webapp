import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { Box, Card, CardMedia, Typography } from "@mui/material";

import Ad4 from "@/assets/Images/Ad4.png";
import Ad5 from "@/assets/Images/Ad5.png";
import Ad6 from "@/assets/Images/Ad6.png";

const imageData = [
  { img: Ad4 },
  { img: Ad5 },
  { img: Ad6 },
  { img: Ad5 },
  { img: Ad4 },
  { img: Ad6 },
];

const AdvertisementCarousel2 = () => {
  return (
    <Box sx={{ width: "100%", py: 1, pb: 2 }}>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        slidesPerView={1.2}
        centeredSlides={true}
        spaceBetween={1}
      >
        {imageData.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                transition: "all 0.4s ease",
                transform: "scale(0.95)",
                height: "auto",
                borderRadius: 1,
                overflow: "hidden",
                boxShadow: 1,
                backgroundColor: "#f5f5f5",
              }}
              className="slide-box"
            >
              <CardMedia
                component="img"
                image={item.img}
                alt={`Slide ${index}`}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default AdvertisementCarousel2;
