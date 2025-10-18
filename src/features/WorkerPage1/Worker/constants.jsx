import { Instagram, Facebook, Linkedin, Globe, Link as LinkIcon } from "lucide-react";
import plumbingImg from "@/assets/Images/plumbingImg.png";

export const workerProfile = {
  name: "Abhisek Sins",
  img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  phone: "+9188****421",
  location: "Palakkad, Pathiripala",
  bannerImage:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  about:
    "Passionate UI designer focused on creating seamless and intuitive user experiences",
    overallRating:"4.9",
    reviewCount:"130",
};

export const workers = [
  { 
    name: "John Doe", 
    location: "Thrissur", 
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    rate: "₹500/hr",
    rating: 4.5,
    reviewCount: 34
  },
  { 
    name: "Jane Smith", 
    location: "Kochi", 
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    rate: "₹600/hr",
    rating: 4.8,
    reviewCount: 21
  },
  { 
    name: "Michael Johnson", 
    location: "Palakkad", 
    img: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f",
    rate: "₹550/hr",
    rating: 4.6,
    reviewCount: 18
  },
  { 
    name: "Emily Davis", 
    location: "Calicut", 
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    rate: "₹700/hr",
    rating: 4.9,
    reviewCount: 42
  },
  { 
    name: "Robert Wilson", 
    location: "Kochi", 
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    rate: "₹480/hr",
    rating: 4.3,
    reviewCount: 15
  },
  { 
    name: "John Doe", 
    location: "Thrissur", 
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    rate: "₹500/hr",
    rating: 4.5,
    reviewCount: 34
  },
  { 
    name: "Jane Smith", 
    location: "Kochi", 
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    rate: "₹600/hr",
    rating: 4.8,
    reviewCount: 21
  },
  { 
    name: "Michael Johnson", 
    location: "Palakkad", 
    img: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f",
    rate: "₹550/hr",
    rating: 4.6,
    reviewCount: 18
  },
  { 
    name: "Emily Davis", 
    location: "Calicut", 
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    rate: "₹700/hr",
    rating: 4.9,
    reviewCount: 42
  },
  { 
    name: "Robert Wilson", 
    location: "Kochi", 
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    rate: "₹480/hr",
    rating: 4.3,
    reviewCount: 15
  },{ 
    name: "John Doe", 
    location: "Thrissur", 
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    rate: "₹500/hr",
    rating: 4.5,
    reviewCount: 34
  },
  
  
];



export const services = [
  {
    title: "Plumbing Service",
    years: "3y",
    rating: 4.8,
    reviews: 320,
    price: 799,
    type: "hour", // ✅ new
    notes: "Specializes in bathroom fittings, leak repairs, and kitchen installations.", // ✅ new
    licenseImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", // ✅ new
    verified: true,
    img: plumbingImg,
  },
  {
    title: "Plumbing Service",
    years: "3y",
    rating: 4.8,
    reviews: 320,
    price: 899,
    type: "hour", // ✅ new
    notes: "Expert in underground pipeline maintenance and renovation works.", // ✅ new
    licenseImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", // ✅ new
    verified: false,
    img: plumbingImg,
  },
  {
    title: "Electrical Service",
    years: "5y",
    rating: 4.6,
    reviews: 210,
    price: 999,
    type: "hour", // ✅ new
    notes: "Certified electrician with experience in residential and commercial wiring.", // ✅ new
    licenseImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", // ✅ new
    verified: true,
    img: plumbingImg,
  },
];


export const workerReviews = [
  {
    id: 1,
    name: "Anna Smith",
    rate: 4.5,
    date: "March 12, 2025",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    review:
      "The service was quick and efficient. The electrician arrived on time, diagnosed the issue in minutes, and completed the repair professionally. I really appreciate the clear communication and fair pricing. Would definitely recommend!",
  },
  {
    id: 2,
    name: "John Doe",
    rate: 5,
    date: "March 8, 2025",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "",
  },
  {
    id: 3,
    name: "Emily Johnson",
    rate: 4,
    date: "February 28, 2025",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    review:
      "Good experience overall. The carpenter was skilled, but the work took slightly longer than expected.",
  },
];

export const workerLinks = [
  {
    id: "instagram",
    label: "Instagram Profile",
    icon: <Instagram size={20} color="#d62976" />,
    path: "https://www.instagram.com/yourprofile",
  },
  {
    id: "facebook",
    label: "Facebook Page",
    icon: <Facebook size={20} color="#1877f2" />,
    path: "https://www.facebook.com/yourpage",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <Linkedin size={20} color="#0a66c2" />,
    path: "https://www.linkedin.com/in/yourprofile",
  },
  {
    id: "website",
    label: "Website",
    icon: <Globe size={20} color="#0b134a" />,
    path: "https://yourwebsite.com",
  },
  {
    id: "custom",
    label: "Custom Link",
    icon: <LinkIcon size={20} color="#050a56" />,
    path: "https://custom-link.com",
  },
];

export const businessDetails = {
    officeAddress: "123 Main Street, Thrissur",
    permanentAddress: "456 Green Villa, Palakkad",
    companyName: "",
    workPermit: "WP-987654321",
    gstNumber: "GSTIN27AAEPM1234C1ZV",
  };

export const projects = [
    {
      title: "Residential Plumbing Installation",
      service: "Plumbing Service",
      location: "Thrissur",
      phnno: "65469271052",
      description:
        "Installed a modern plumbing system for a residential building, ensuring durability and efficiency.",
      images: [plumbingImg, plumbingImg,plumbingImg, plumbingImg],
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      title: "Commercial Electrical Rewiring",
      service: "Electrical Service",
      location: "Kochi",
      phnno: "65469271052",
      description:
        "Complete electrical rewiring for a commercial complex to improve safety and reduce energy usage.",
      images: [plumbingImg, plumbingImg],
    },
    {
      title: "Luxury Carpentry Interiors",
      service: "Carpentry Service",
      location: "Calicut",
      phnno: "65469271052",
      description:
        "Custom carpentry project for a luxury apartment, including furniture and wooden interiors.",
      images: [plumbingImg, plumbingImg],
    },
  ];