import React, { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserSpecificBooking from "@/features/Bookings/UserSpecificBooking";
import WorkerCard from "./WorkerCard";
import MobHeading from "@/components/Mobile/mobileHeading";

const workers = [
  {
    name: "Alan Jose",
    location: "Thrissur",
    rating: 3.8,
    reviews: 520,
    roles: ["Designer", "Architect", "+ 2"],
    description: "I am a professional Architect with 5 years of experience",
    price: "899 Rs",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    name: "Athul Murali",
    location: "Thrissur",
    rating: 3.8,
    reviews: 520,
    roles: ["Designer", "Architect", "+ 2"],
    description: "I am a professional Architect with 7 years of experience",
    price: "799 Rs",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const Workers = ({ title }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState();

  return (
    <Box sx={{ pb: 8 }}>
      {/* <MobHeading Heading={title}/> */}

      {/* Worker Cards */}
      {workers.map((worker, idx) => (
        <WorkerCard
          key={idx}
          worker={worker}
          navigate={navigate}
          open={open}
          setOpen={setOpen}
        />
      ))}
      
      <UserSpecificBooking
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
};

export default Workers;
