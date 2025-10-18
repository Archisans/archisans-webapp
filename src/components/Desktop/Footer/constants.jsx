
import { Facebook, Instagram, Twitter, LinkedIn, Email, Phone, LocationOn, Star,WhatsApp } from "@mui/icons-material";
import { RouteProvider } from "@/config/RouteProvider";

export const TERMS_CONTENT = {
  lastUpdated: "2025-09-29",
  sections: [
    {
      title: "Welcome",
      content: "Welcome to Archisans! By using our platform, you agree to comply with and be bound by the following terms and conditions."
    },
    {
      title: "Use of Services",
      content: "You agree to use our services only for lawful purposes and in accordance with these terms."
    },
    {
      title: "Account Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account."
    },
    {
      title: "Limitation of Liability",
      content: "Archisans is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our platform."
    },
    {
      title: "Contact",
      content: "If you have any questions about these Terms & Conditions, please contact us at support@archisans.com"
    }
  ]
};


export const socialLinks = [
  { icon: <Facebook />, color: "#1877F2" },
  { icon: <Instagram />, color: "#E4405F" },
  { icon: <Twitter />, color: "#1DA1F2" },
  { icon: <LinkedIn />, color: "#0A66C2" },
];

export const quickLinks = [
  { label: "About Us", path: "/about" },
  { label: "Help Center", path: "/help"  },
  { label: "Privacy Policy", path: "/privacy"  },
  { label: "Terms & Condition", path: "/terms"  },
];

export const contactInfo = [
  { icon: <Email sx={{ fontSize: 16, color: "#4EBCFF" }} />, text: "archisans2025@gmail.com" },
  { icon: <Phone sx={{ fontSize: 16, color: "#4EBCFF" }} />, text: "+91 8129509544" },
  { icon: <LocationOn sx={{ fontSize: 16, color: "#4EBCFF" }} />, text: "Thrissur, Kerala, India" },
];

export const stats = [
  { value: "50K+", label: "Verified Professionals" },
  { value: "4.9", label: "Average Rating", icon: <Star sx={{ fontSize: 18, color: "#FFD700" }} /> },
];


export const aboutData = {
  title: "About Archisans",
  sections: [
    "Archisans is Kerala's premier platform connecting homeowners with verified construction professionals and home service providers.",
    "Our mission is to simplify the process of finding reliable, skilled professionals for your construction and home improvement needs. We carefully vet all our service providers to ensure quality and reliability.",
    "Founded with the vision of transforming Kerala's construction industry, we bridge the gap between homeowners and skilled artisans, ensuring transparency, quality, and trust in every project.",
    "We aim to empower customers with choice, competitive pricing, and accountability while giving skilled workers a platform to showcase their expertise.",
    "From large-scale construction projects to home maintenance tasks, Archisans ensures that every service request is matched with trusted professionals who deliver exceptional results."
  ],
};

export const privacyData = {
  title: "Privacy Policy",
  lastUpdated: new Date().toLocaleDateString(),
  intro:
    "At Archisans, we are committed to protecting your privacy and ensuring the security of your personal information.",
  sections: [
    {
      heading: "Information We Collect",
      content:
        "We collect information you provide directly, such as when you create an account, book services, or contact us for support.",
    },
    {
      heading: "How We Use Your Information",
      content:
        "We use your information to provide services, communicate with you, improve our platform, and ensure security.",
    },
    {
      heading: "Data Security",
      content:
        "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      heading: "Contact Us",
      content:
        "If you have questions about this Privacy Policy, please contact us at privacy@archisans.com",
    },
  ],
};

export const supportData = {
  title: "Help & Support",
  description:
    "Need assistance? We're here to help! Contact our support team through any of the following channels:",
  contacts: [
    {
      icon: <Phone sx={{ color: "#4EBCFF" }} />,
      label: "Phone Support",
      value: "+91 8129509544",
    },
    {
      icon: <Email sx={{ color: "#4EBCFF" }} />,
      label: "Email Support",
      value: "archisans2025@gmail.com",
    },
    {
      icon: <WhatsApp sx={{ color: "#4EBCFF" }} />,
      label: "WhatsApp",
      value: "+91 8129509544",
    },
  ],
  hours: {
    title: "Support Hours",
    timing: [
      "Monday - Saturday: 9:00 AM - 7:00 PM",
      "Sunday: 10:00 AM - 5:00 PM",
    ],
  },
};