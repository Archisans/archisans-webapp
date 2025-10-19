// constants.jsx
import { Instagram, Facebook, Linkedin, Globe } from "lucide-react";
import pic1 from "@/assets/Images/Ad4.png";
import a1 from "@/assets/Images/avatar/avatar1.jpg";
import a2 from "@/assets/Images/avatar/avatar2.jpg";
import a3 from "@/assets/Images/avatar/avatar3.jpg";
import a4 from "@/assets/Images/avatar/avatar4.jpg";
import a5 from "@/assets/Images/avatar/avatar5.jpg";
import a6 from "@/assets/Images/avatar/avatar6.jpg";
import a7 from "@/assets/Images/avatar/avatar7.jpg";
import a8 from "@/assets/Images/avatar/avatar8.jpg";
import a9 from "@/assets/Images/avatar/avatar9.jpg";

import b1 from "@/assets/Images/bannerimages/banner1.jpg";
import b2 from "@/assets/Images/bannerimages/banner2.jpg";
import b3 from "@/assets/Images/bannerimages/banner3.jpg";
import b4 from "@/assets/Images/bannerimages/banner4.jpg";
import b5 from "@/assets/Images/bannerimages/banner5.jpg";
import b6 from "@/assets/Images/bannerimages/banner6.jpg";
import b7 from "@/assets/Images/bannerimages/banner7.jpg";
import b8 from "@/assets/Images/bannerimages/banner8.jpg";

import sl1 from "@/assets/Images/servicelicense/license1.png"

import s1 from "@/assets/Images/services/service1.jpg";
import s2 from "@/assets/Images/services/service2.jpg";
import s3 from "@/assets/Images/services/service3.jpg";
import s4 from "@/assets/Images/services/service4.jpg";
import s5 from "@/assets/Images/services/service5.jpg";
import s6 from "@/assets/Images/services/service6.jpg";
import s7 from "@/assets/Images/services/service7.jpg";
import s8 from "@/assets/Images/services/service8.jpg";


const WORKER_TEMPLATE = {
  roles: ["Architectural Designers","Civil Engineer","Aluminium Fabricator"],
  price: "₹1,200",
  phone: "+91-XXXXXXXXXX",
  workerLinks: [
    { id: "instagram", label: "Instagram", icon: <Instagram size={20} />, path: "https://instagram.com" },
    { id: "facebook", label: "Facebook", icon: <Facebook size={20} />, path: "https://facebook.com" },
    { id: "linkedin", label: "LinkedIn", icon: <Linkedin size={20} />, path: "https://linkedin.com" },
    { id: "website", label: "Website", icon: <Globe size={20} />, path: "https://yourwebsite.com" }
  ],
  businessDetails: {
    officeAddress: "123 Main Street, Kochi",
    permanentAddress: "456 Green Villa, Kochi",
    companyName: "Akhil Designs",
    workPermit: "WP-987654321",
    gstNumber: "GSTIN27AAEPM1234C1ZV"
  },
  services: [
    {
    id: 1,
    title: "Architectural Design Consultation",
    years: "5y",
    rating: 4.9,
    reviews: 280,
    price: 1200,
    type: "hour",
    notes: "Provides modern and functional home layouts, interior planning, and 3D renderings.",
    licenseImg: sl1,
    verified: true,
    img: s4
  },
  {
    id: 2,
    title: "Brickwork & Masonry Services",
    years: "8y",
    rating: 4.8,
    reviews: 340,
    price: 900,
    type: "day",
    notes: "Provides high-quality brickwork, stone masonry, and general construction support.",
    licenseImg: sl1,
    verified: true,
    img: s6
  },
  {
    id: 3,
    title: "Water Resource Management Consultation",
    years: "6y",
    rating: 4.7,
    reviews: 150,
    price: 1500,
    type: "hour",
    notes: "Provides solutions for water supply, irrigation, drainage systems, and sustainable water management.",
    licenseImg: sl1,
    verified: true,
    img: s2
  },
  {
    id: 4,
    title: "Residential & Commercial Demolition",
    years: "10y",
    rating: 4.8,
    reviews: 220,
    price: 2000,
    type: "project",
    notes: "Provides safe and efficient demolition services for residential, commercial, and industrial buildings.",
    licenseImg: sl1,
    verified: true,
    img: s1
  },
  {
    id: 5,
    title: "Custom Aluminium Fabrication",
    years: "7y",
    rating: 4.9,
    reviews: 180,
    price: 1200,
    type: "hour",
    notes: "Provides fabrication and installation of aluminium windows, doors, partitions, and decorative structures.",
    licenseImg: sl1,
    verified: true,
    img: s5
  },
  {
    id: 6,
    title: "Security & Surveillance System Installation",
    years: "8y",
    rating: 4.8,
    reviews: 200,
    price: 1800,
    type: "hour",
    notes: "Provides installation and maintenance of CCTV cameras, alarm systems, and access control solutions for residential and commercial properties.",
    licenseImg: sl1,
    verified: true,
    img: s8
  },
  {
    id: 7,
    title: "Architectural Project Assistance",
    years: "2y",
    rating: 4.6,
    reviews: 90,
    price: 500,
    type: "hour",
    notes: "Provides guidance on design projects, 3D modeling, rendering, and presentation for architecture students.",
    licenseImg: sl1,
    verified: true,
    img: s7
  },
  {
    id: 8,
    title: "Building Permit Consultation",
    years: "6y",
    rating: 4.7,
    reviews: 130,
    price: 1000,
    type: "hour",
    notes: "Assists with obtaining building permits, legal approvals, and compliance documentation for residential and commercial projects.",
    licenseImg: sl1,
    verified: true,
    img: s2
  }
  ],
  projects: [
  {
    id: 1,
    title: "Contemporary Residential Home Design",
    service: "Architectural Design Consultation",
    location: "Thrissur",
    phnno: "65469271052",
    description: "Designed a modern residential home with functional layouts and sustainable features.",
    images: [
      s3,s4
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 2,
    title: "Brickwork & Masonry Project",
    service: "Brickwork & Masonry Services",
    location: "Kochi",
    phnno: "9876543210",
    description: "Executed high-quality brickwork and masonry for a commercial building.",
    images: [
      s6
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 3,
    title: "Water Supply & Drainage Planning",
    service: "Water Resource Management Consultation",
    location: "Trivandrum",
    phnno: "1234567890",
    description: "Developed an efficient irrigation and drainage system for a residential complex.",
    images: [
      s1
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 4,
    title: "Residential & Commercial Demolition",
    service: "Residential & Commercial Demolition",
    location: "Palakkad",
    phnno: "7896541230",
    description: "Performed safe and efficient demolition for a multi-storey building.",
    images: [
      s1
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 5,
    title: "Custom Aluminium Window Installation",
    service: "Custom Aluminium Fabrication",
    location: "Kollam",
    phnno: "4561237890",
    description: "Installed aluminium windows and doors with custom designs for a luxury villa.",
    images: [
      s3
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 6,
    title: "Security System Installation",
    service: "Security & Surveillance System Installation",
    location: "Thrissur",
    phnno: "3216549870",
    description: "Installed CCTV cameras and access control systems for a commercial property.",
    images: [
      s8
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 7,
    title: "Architecture Project Guidance",
    service: "Architectural Project Assistance",
    location: "Kochi",
    phnno: "6549873210",
    description: "Provided 3D modeling and design assistance for architecture students’ projects.",
    images: [
      s5,s7
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 8,
    title: "Building Permit Approval Support",
    service: "Building Permit Consultation",
    location: "Trivandrum",
    phnno: "7891234560",
    description: "Assisted a commercial project with building permits, approvals, and compliance documentation.",
    images: [
      s2,s4
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
],

  workerReviews: [
    {
    id: 1,
    name: "Anna Smith",
    rate: 4.5,
    date: "March 12, 2025",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    review:
      "The consultation was professional and insightful. The team understood our needs perfectly and delivered excellent results."
  },
  {
    id: 2,
    name: "John Doe",
    rate: 5,
    date: "March 8, 2025",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    review: "Exceptional experience! The work was modern, practical, and visually appealing."
  },
  {
    id: 3,
    name: "Priya Nair",
    rate: 4.8,
    date: "April 2, 2025",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    review: "Very creative and attentive. They incorporated our ideas perfectly into a functional design."
  },
  {
    id: 4,
    name: "Arjun Menon",
    rate: 4.6,
    date: "April 10, 2025",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    review: "Professional and reliable team. The output exceeded our expectations in every way."
  }
  ]
};

const NAMES = ["Akhil Raj", "Rahul Menon", "Raghavan Nair","Kiran John","Gireesh Nambiar","Jomon T","Manu Mathew"];
const DESCRIPTIONS = [
  "Dedicated to delivering innovative solutions that combine creativity with practical results.",
  "Committed to providing high-quality work tailored to meet client expectations.",
  "Focused on creating unique outcomes with attention to detail and lasting impact.",
  "Passionate about transforming ideas into effective and visually appealing solutions.",
  "Striving to offer reliable, efficient, and professional services in every project."
];
const LOCATIONS=["Thrissur","Kochi","Trivandrum","Palakkad","Kollam"];
const RATINGS=["4.6","4.2","2.6","3.6",];
const REVIEWS=["12","23","34","45"];
const IMAGES = [
  b1,b2,b3,b4,b5,b6,b7,b8
];
const AVATARS = [
  a1,a2,a3,a4,a5,a6,a7,a8,a9
];




export const WORKERS_RAW = NAMES.map((name, index) => ({
  id: index + 1,
  name,
  image: IMAGES[index % IMAGES.length],
  bannerImage: IMAGES[index % IMAGES.length],
  avatar: AVATARS[index % AVATARS.length],
  rating: RATINGS[index % RATINGS.length],
  reviews: REVIEWS[index % REVIEWS.length],
  location: LOCATIONS[index % LOCATIONS.length],
  description: DESCRIPTIONS[index % DESCRIPTIONS.length],
  about: DESCRIPTIONS[index % DESCRIPTIONS.length],
  ...WORKER_TEMPLATE
}));


export const WORKERS = (slug) => {
  if (!slug) return WORKERS_RAW;

  const formattedSlug = slug
    .replace(/-/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return WORKERS_RAW.map((worker) => {
    const normalizedRoles = worker.roles.map((r) => r.trim().toLowerCase());
    if (normalizedRoles.includes(formattedSlug.toLowerCase())) {
      return worker;
    }
    return { ...worker, roles: [formattedSlug, ...worker.roles] };
  });
};
