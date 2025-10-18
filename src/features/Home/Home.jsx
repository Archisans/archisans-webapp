import React,{useRef} from "react";
import { Box } from "@mui/material";

import Footer from "@/components/Desktop/Footer/Footer";
import PopularServices from "@/features/Home/Components/popularServices";
import PopularCities from "@/features/Home/Components/popularCities";
import InstantService from "@/features/Home/Components/InstantService";
import WorkerJoin from "@/features/Home/Components/WorkerJoin";
import Landing from "@/features/Home/Components/Landing";
import WorkerBanner from "@/features/Home/Components/WorkerBanner";
import CategoriesGrid from "./Components/CategoriesGrid";
import Advertisements from "./Components/Advertisements";

export default function Home({ bootstrapConfiguration }) {

  const categoriesRef = useRef(null);

const scrollToCategories = () => {
  if (categoriesRef.current) {
    const targetY =
      categoriesRef.current.getBoundingClientRect().top + window.scrollY - 80;

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1000; // 🔧 adjust speed here (in ms)
    let startTime = null;

    const smoothStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 0.5 * (1 - Math.cos(Math.PI * progress)); // smooth easing
      window.scrollTo(0, startY + distance * ease);
      if (progress < 1) requestAnimationFrame(smoothStep);
    };

    requestAnimationFrame(smoothStep);
  }
};



  return (
    <div>
      {/* HERO */}
      <Landing onGetStartedClick={scrollToCategories} />

      {/* CATEGORIES GRID */}
      <Box ref={categoriesRef}>
      <CategoriesGrid categories={bootstrapConfiguration?.serviceCategories} />
      </Box>

      {/* Join as Worker Section */}
      <WorkerJoin />

      <Advertisements
        advertisements={bootstrapConfiguration?.advertisements?.central}
      />

      {/*Instant Service */}
      <InstantService />

      <PopularServices onGetStartedClick={scrollToCategories}/>

      {/* CITIES */}
      <PopularCities />

      {/* CTA BANNER */}
      <WorkerBanner />

      <Footer />
    </div>
  );
}
