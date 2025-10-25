// src/constants.js
import plumbingImg from "@/assets/Images/plumbingImg.png";

export const JOBS_ACTIVE = [
  {
    id: 1,
    service: "Plumbing",
    date: "Sunday, 12 June",
    time: "11:00 – 12:00 AM",
    worker: {
      name: "Daison Babu",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      location: "Palakkad",
    },
    status: "in-progress",
  },
  {
    id: 2,
    service: "Electrical",
    date: "Monday, 13 June",
    time: "02:00 – 03:00 PM",
    worker: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      location: "Kochi",
    },
    status: "in-progress",
  },
];

export const JOBS_COMPLETED = [
  {
    id: 1,
    service: "Cleaning",
    date: "Sunday, 12 June",
    time: "11:00 – 12:00 AM",
    worker: {
      name: "Daison Babu",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      location: "Palakkad",
    },
    status: "completed",
  },
  {
    id: 2,
    service: "Painting",
    date: "Monday, 13 June",
    time: "02:00 – 03:00 PM",
    worker: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      location: "Kochi",
    },
    status: "completed",
  },
];

export const JOBS_OFFERS = [
  {
    id: 1,
    service: "Carpentry",
    date: "Sunday, 12 June",
    time: "11:00 – 12:00 AM",
    worker: {
      name: "Daison Babu",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      location: "Palakkad",
    },
    status: "new-request",
  },
  {
    id: 2,
    service: "Gardening",
    date: "Monday, 13 June",
    time: "02:00 – 03:00 PM",
    worker: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      location: "Kochi",
    },
    status: "new-request",
  },
];
