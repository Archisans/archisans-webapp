import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import { Box, Card, CardMedia, Typography } from '@mui/material';

import img1 from '@/assets/Images/Interior.png';
import img2 from '@/assets/Images/AdIcon.png';



const imageData = [
  { img: img1 },
  { img: img2 },
  { img: img1 },
  { img: img2 },

  // Add more images
];

const AdvertisementCarousel = () => {
  return (
    <Box sx={{ width: '95%', px: 1, py: 1 , pb:2}}>
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
                transition: 'all 0.4s ease',
                transform: 'scale(0.95)',
                height: 'auto',
                borderRadius: 1,
                overflow: 'hidden',
                boxShadow: 1,
                backgroundColor: '#f5f5f5',
              }}
              className="slide-box"
            >
              <CardMedia
                component="img"
                image={item.img}
                alt={`Slide ${index}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
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

