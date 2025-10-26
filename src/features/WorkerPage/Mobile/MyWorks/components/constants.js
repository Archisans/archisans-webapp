// src/constants.js
import plumbingImg from "@/assets/Images/plumbingImg.png";
import electricalImg from "@/assets/Images/plumbingImg.png";
import cleaningImg from "@/assets/Images/plumbingImg.png";
import paintingImg from "@/assets/Images/plumbingImg.png";
import carpentryImg from "@/assets/Images/plumbingImg.png";
import gardeningImg from "@/assets/Images/plumbingImg.png";

export const JOBS_ACTIVE = [
  {
    id: 1,
    service: { name: "Plumbing", img: plumbingImg },
    date: "Sunday, 12 June",
    time: "11:00 – 12:00 AM",
    fullAddress:"abc house, P.O Chelakkara, 6806001, Thrissur",
    specialInstruction:"Be carefull. House is guarded by dog.",
    worker: {
      name: "Daison Babu",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      location: "Palakkad",
      phone: "+91 90123xxxxx",
    },
    status: "Active",
  },
  {
    id: 2,
    service: { name: "Electrical", img: electricalImg },
    date: "Monday, 13 June",
    time: "02:00 – 03:00 PM",
    fullAddress:"abc house, P.O Chelakkara, 6806001, Thrissur",
    specialInstruction:"Be carefull. House is guarded by dog.",
    worker: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      location: "Kochi",
      phone: "+91 90123xxxxx",
    },
    status: "Active",
  },
];

export const JOBS_COMPLETED = [
  {
    id: 1,
    service: { name: "Cleaning", img: cleaningImg },
    date: "Sunday, 12 June",
    time: "11:00 – 12:00 AM",
    fullAddress:"abc house, P.O Chelakkara, 6806001, Thrissur",
    specialInstruction:"Be carefull. House is guarded by dog.",
    worker: {
      name: "Daison Babu",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      location: "Palakkad",
      phone: "+91 90123xxxxx",
    },
    status: "Completed",
  },
  {
    id: 2,
    service: { name: "Painting", img: paintingImg },
    date: "Monday, 13 June",
    time: "02:00 – 03:00 PM",
    fullAddress:"abc house, P.O Chelakkara, 6806001, Thrissur",
    specialInstruction:"Be carefull. House is guarded by dog.",
    worker: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      location: "Kochi",
      phone: "+91 90123xxxxx",
    },
    status: "Completed",
  },
];

export const JOBS_OFFERS = [
  {
    id: 1,
    service: { name: "Carpentry", img: carpentryImg },
    date: "Sunday, 12 June",
    time: "11:00 – 12:00 AM",
    fullAddress:"abc house, P.O Chelakkara, 6806001, Thrissur",
    specialInstruction:"Be carefull. House is guarded by dog.",
    worker: {
      name: "Daison Babu",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      location: "Palakkad",
      phone: "+91 90123xxxxx",
    },
    status: "New Request",
  },
  {
    id: 2,
    service: { name: "Gardening", img: gardeningImg },
    date: "Monday, 13 June",
    time: "02:00 – 03:00 PM",
    fullAddress:"abc house, P.O Chelakkara, 6806001, Thrissur",
    specialInstruction:"Be carefull. House is guarded by dog.",
    worker: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      location: "Kochi",
      phone: "+91 90123xxxxx",
    },
    status: "New Request",
  },
];
