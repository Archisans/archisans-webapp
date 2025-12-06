import React, { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AllIcon from "@/assets/Images/All.png";

const CategoriesCarousal = ({ categories, fakeScrollBarWidthPercent = 50 }) => {
  const realRef = useRef(null);
  const fakeRef = useRef(null);
  const navigate = useNavigate();

  const categoriesData = [
    { title: "All", iconUrl: AllIcon, slug: "all" },
    ...categories,
  ];

  const handleClick = (slug) => {
    if (slug) {
      navigate("/services/" + slug);
    }
  };

  useEffect(() => {
    const real = realRef.current;
    const fake = fakeRef.current;

    let isSyncingFromFake = false;
    let isSyncingFromReal = false;

    const syncScroll = () => {
      const realScrollableWidth = real.scrollWidth - real.clientWidth;
      const fakeScrollableWidth = fake.scrollWidth - fake.clientWidth;

      fake.onscroll = () => {
        if (isSyncingFromReal) {
          isSyncingFromReal = false;
          return;
        }
        isSyncingFromFake = true;
        real.scrollLeft =
          (fake.scrollLeft / fakeScrollableWidth) * realScrollableWidth;
      };

      real.onscroll = () => {
        if (isSyncingFromFake) {
          isSyncingFromFake = false;
          return;
        }
        isSyncingFromReal = true;
        fake.scrollLeft =
          (real.scrollLeft / realScrollableWidth) * fakeScrollableWidth;
      };
    };

    if (real && fake) {
      syncScroll();
    }
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        pb: 3,
      }}
    >
      {/* Real Scrollable Content */}
      <Box
        ref={realRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          pb: 1.5,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box
          sx={{
            flex: "0 0 100vw",
            scrollSnapAlign: "start",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(2, auto)",
            gap: 2,
            boxSizing: "border-box",
            padding: 2,
          }}
        >
          {categoriesData.slice(0, 10).map((item) => (
            <Box
              key={item?.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                gap: 0.5,
              }}
              onClick={() => handleClick(item?.slug)}
            >
              <Box
                sx={{
                  borderRadius: 1,
                  width: 72,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={item?.iconUrl}
                  alt={item?.title}
                  sx={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </Box>

              {/* Label outside the box */}
              <Typography
                color="neutral.content.900"
                fontSize={11.5}
                fontWeight={500}
                textAlign="center"
                sx={{ width: 70 }}
              >
                {item?.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Fake Scrollbar */}
      <Box
        ref={fakeRef}
        sx={{
          position: "absolute",
          bottom: 20,
          left: `${(28 + fakeScrollBarWidthPercent) / 1.8}vw`,
          width: `${fakeScrollBarWidthPercent / 4}vw`,
          height: "auto",
          overflowX: "auto",
          overflowY: "hidden",
          zIndex: 10,
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.bg.focus",
            borderRadius: "100px",
            width: "35px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "primary.bg.disabled",
            borderRadius: "100px",
          },
        }}
      >
        <Box sx={{ width: "40vw", height: "5px" }} />
      </Box>
    </Box>
  );
};

export default CategoriesCarousal;
