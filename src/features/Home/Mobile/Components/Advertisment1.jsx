import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

import { Box, CardMedia } from "@mui/material";

import Ad5 from "@/assets/Images/Ad5.png";
import VGuard from "@/assets/Images/VGuard.png";
import Ad6 from "@/assets/Images/Ad6.png";
import EBCO from "@/assets/Images/EBCO.jpeg"
import IKEA from "@/assets/Images/IKEA.jpeg"

const imageData = [
  { img: VGuard },
  { img: Ad5 },
  { img: EBCO },
  { img: Ad6 },
  { img: IKEA },
];

const Advertisement1 = () => {
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
        {imageData.map((item, index) => (
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
                image={item.img}
                alt={`Slide ${index}`}
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

export default Advertisement1;
