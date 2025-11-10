import { Box, Typography, Paper, Avatar, Button, Chip } from "@mui/material";
import { MapPin as MapPinIcon } from "lucide-react";
import FavouriteAndShareButton from "@/components/Desktop/FavouriteAndShareButton";
import { Facebook, LinkedIn, Instagram, Phone,Launch } from "@mui/icons-material";
import DefaultWorkerImg from '@/assets/Images/DefaultWorkerImg.png'
import ReviewDialog from "@/components/Desktop/ReviewDialog";
import { useState } from "react";

const platformIcons = {
  Facebook: <Facebook sx={{ fontSize: 16, color: "#1877F2" }} />,
  LinkedIn: <LinkedIn sx={{ fontSize: 16, color: "#0077B5" }} />,
  Instagram: <Instagram sx={{ fontSize: 16, color: "#E1306C" }} />,
};


const WorkerOverview = ({ worker }) => {
  
const [openReview, setOpenReview] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
      {/* Profile Section */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          overflow: "hidden",
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        {/* Cover Photo */}
<Box sx={{ position: "relative", height: 160, overflow: "hidden" }}>
  <Box
    component="img"
    src={worker.image ? worker.image : DefaultWorkerImg}
    alt="Cover"
    sx={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: worker.image ? "center" : "left top", // ✅ align from top-left for default
      transition: "transform 0.4s ease",
      transform: "scale(1.02)", // slight zoom to avoid edge gaps
    }}
  />

  {/* Gradient Overlay */}
  <Box
    sx={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "50%",
      background: "linear-gradient(transparent, rgba(0,0,0,0.4))",
    }}
  />

  {/* Favourite + Share */}
  <Box
    sx={{
      position: "absolute",
      top: 15,
      right: 15,
      display: "flex",
      gap: 1,
      zIndex: 2,
    }}
  >
    <FavouriteAndShareButton />
  </Box>
</Box>



        <Box sx={{ px: 2.5, pb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
            <Avatar
              src={worker.avatar}
              sx={{
                width: 100,
                height: 100,
                border: "4px solid white",
                mt: -6,
                mr: 3,
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              }}
            />
            <Box sx={{ flex: 1, pt: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <Typography variant="h5" fontWeight={700} color="#1a1a1a">
                  {worker.name}
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                mb={1.5}
              >
                {/* Location
                <Box display="flex" alignItems="center" gap={0.5}>
                  <MapPinIcon size={16} color="#666" />
                  <Typography variant="body2" color="#666" fontWeight={500}>
                    {worker.location}
                  </Typography>
                </Box> */}

                {/* Phone */}
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Phone sx={{ fontSize: 16, color: "#666" }} />
                  <Typography variant="body2" color="#666" fontWeight={500}>
                    {worker.phone}
                  </Typography>
                </Box>

                
                {/* <Box display="flex" alignItems="center" gap={0.5}>
                  <Launch sx={{ fontSize: 16, color: "#666" }} />
                  <Typography variant="body2" color="#666" fontWeight={500}>
                    Portfolio
                  </Typography>
                </Box> */}
              </Box> 
            </Box>

           <Box
  sx={{
    display: "flex",
    flexDirection: "row", // 👈 side by side
    alignItems: "center",
    gap: 1.5,             // spacing between buttons
    pt: 2,
  }}
>
  {/* Call Now Button */}

   {/* Add Review Button */}
  <Button
    onClick={() => setOpenReview(true)} // ✅ Opens dialog
    variant="outlined"
    sx={{
      color: "#1976d2",
      borderColor: "#1976d2",
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 2,
      px: 4,
      py: 1,
      fontSize: "0.9rem",
      "&:hover": {
        bgcolor: "rgba(25,118,210,0.08)",
        borderColor: "#1565c0",
        transform: "translateY(-2px)",
        boxShadow: "0 3px 8px rgba(25,118,210,0.2)",
      },
      transition: "all 0.2s",
    }}
  >
    Add Review
  </Button>

  <Button
    variant="contained"
    onClick={() =>
      navigator.clipboard.writeText(worker.phone).then(() => {
        alert(`Phone number (${worker.phone}) copied to clipboard.`);
      })
    }
    sx={{
      bgcolor: "#1976d2",
      textTransform: "none",
      fontWeight: 700,
      borderRadius: 2,
      px: 4,
      py: 1,
      fontSize: "0.95rem",
      boxShadow: "0 3px 8px rgba(25,118,210,0.25)",
      "&:hover": {
        bgcolor: "#1565c0",
        transform: "translateY(-2px)",
        boxShadow: "0 5px 12px rgba(25,118,210,0.35)",
      },
      transition: "all 0.2s",
    }}
  >
    Call Now
  </Button>

 
</Box>


          </Box>

          {/* Dynamic Skills (from worker.roles) */}
{worker.roles && worker.roles.length > 0 && (
  <Box>
    <Typography
      variant="subtitle1"
      fontWeight={600}
      mb={1.5}
      color="#1976d2"
    >
      Skills
    </Typography>

    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {[...new Set(worker.roles)].map((role, idx) => (
        <Chip
          key={idx}
          label={role}
          size="small"
          sx={{
            bgcolor: "#e3f2fd",
            color: "#1976d2",
            fontWeight: 600,
            cursor: "default",
          }}
        />
      ))}
    </Box>
  </Box>
)}

        </Box>
      </Paper>

      {/* About Section */}
      <Paper
        elevation={0}
        sx={{ mt: 2, p: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={1.5}>
          About
        </Typography>

        <Typography
  variant="body2"
  color="#555"
  lineHeight={1.6}
  mb={1.5}
  sx={{
    whiteSpace: "pre-line",           // keeps line breaks if present
    wordBreak: "break-word",          // prevents overflow for long words
    overflowWrap: "break-word",
    maxHeight: "12em",                // prevents very long texts from stretching layout
    overflowY: "auto",                // adds scroll if text exceeds max height
    pr: 1,                            // spacing for scrollbar
  }}
>
  {worker.about || "No description available."}
</Typography>


        {/* Social Media Section */}
        {worker.social && worker.social.length > 0 && (
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={2} sx={{ mt: 0.5 }}>
            <Typography
              variant="body2"
              color="#444"
              fontWeight={600}
              sx={{ mr: 1 }}
            >
              Connect with me:
            </Typography>

            {worker.social.map((social) => (
              <Box
                key={social.id}
                display="flex"
                alignItems="center"
                gap={0.5}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: "none" }}
              >
                {platformIcons[social.platform] || null}
                <Typography
                  variant="body2"
                  color="#666"
                  fontWeight={500}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: "#1976d2" },
                    transition: "0.3s",
                  }}
                >
                  {social.platform}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

{/* ✅ Review Dialog */}
      <ReviewDialog
        open={openReview}
        onClose={() => setOpenReview(false)}
        title={`Rate ${worker.name}`}
        onSubmit={(rating, comment) => {
          console.log("Review submitted:", { worker: worker.name, rating, comment });
          setOpenReview(false);
        }}
      />

    </Box>
  );
};

export default WorkerOverview;
