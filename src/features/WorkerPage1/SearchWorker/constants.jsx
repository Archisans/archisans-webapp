// constants.jsx
import { Instagram, Facebook, Linkedin, Globe } from "lucide-react";
import pic1 from "@/assets/Images/Ad4.png";

const WORKER_TEMPLATE = {
  roles: ["Architectural Designers"],
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
    licenseImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    verified: true,
    img: pic1
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
    licenseImg: "https://images.unsplash.com/photo-1599058917217-1f2d2dbb2c97",
    verified: true,
    img: "https://images.unsplash.com/photo-1581091215368-6f6b1b8c3b2e"
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
    licenseImg: "https://images.unsplash.com/photo-1581091870620-5d4f4c77d1a1",
    verified: true,
    img: "https://images.unsplash.com/photo-1590073242580-3b3b6c1f4e4c"
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
    licenseImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    verified: true,
    img: "https://images.unsplash.com/photo-1598300058455-1d6f66a2f3f4"
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
    licenseImg: "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
    verified: true,
    img: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68"
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
    licenseImg: "https://images.unsplash.com/photo-1591696331115-7a4a68d25f50",
    verified: true,
    img: "https://images.unsplash.com/photo-1581091012184-1e6b6a2c8c4b"
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
    licenseImg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    verified: true,
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
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
    licenseImg: "https://images.unsplash.com/photo-1590073242580-3b3b6c1f4e4c",
    verified: true,
    img: "https://images.unsplash.com/photo-1581091870620-5d4f4c77d1a1"
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
      "https://images.unsplash.com/photo-1599423300746-b62533397364",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
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
      "https://images.unsplash.com/photo-1581091215368-6f6b1b8c3b2e",
      "https://images.unsplash.com/photo-1590073242580-3b3b6c1f4e4c"
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
      "https://images.unsplash.com/photo-1581091870620-5d4f4c77d1a1",
      "https://images.unsplash.com/photo-1590073242580-3b3b6c1f4e4c"
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
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1598300058455-1d6f66a2f3f4"
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
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
      "https://images.unsplash.com/photo-1593642532973-d31b6557fa68"
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
      "https://images.unsplash.com/photo-1591696331115-7a4a68d25f50",
      "https://images.unsplash.com/photo-1581091012184-1e6b6a2c8c4b"
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
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
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
      "https://images.unsplash.com/photo-1590073242580-3b3b6c1f4e4c",
      "https://images.unsplash.com/photo-1581091870620-5d4f4c77d1a1"
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

const NAMES = ["Akhil Raj", "Rahul Menon", "Anjali Nair","Karun Nair","Revathy Nambiar","Jomon T","Manu Mathew"];
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
  pic1, 
  "https://images.unsplash.com/photo-1599423300746-b62533397364", 
  "https://images.unsplash.com/photo-1572120360610-d971b9b639b2"  
];
const AVATARS = [
  "https://randomuser.me/api/portraits/men/81.jpg",
  "https://randomuser.me/api/portraits/men/82.jpg",
  "https://randomuser.me/api/portraits/women/79.jpg"
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
