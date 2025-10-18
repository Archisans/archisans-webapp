import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Box, CardMedia } from "@mui/material";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

const AdvertisementCarousel = ({ advertisements }) => {
  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
      }}
    >
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.9,
          slideShadows: false,
        }}
        modules={[Autoplay, EffectCoverflow]}
        style={{ paddingBottom: "10px" }}
      >
        {advertisements?.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              className="slide-box"
              sx={{
                borderRadius: 0.5,
                overflow: "hidden",
                backgroundColor: "inherit",
                aspectRatio: "17/8",
                transform: "scale(0.85)",
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <CardMedia
                component="img"
                image={item?.mobileImageUrl}
                alt={item?.title}
                sx={{
                  width: "100%",
                  height: "100%",
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

export default AdvertisementCarousel;
