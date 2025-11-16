import { useState } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  MapPin as MapPinIcon,
  Share2 as ShareNetworkIcon,
  Heart as HeartIcon,
} from "lucide-react";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WorkerTopTab from "@/features/Worker/Mobile/components/WorkerTopTab";
import DefaultWorkerImg from "@/assets/Images/DefaultWorkerImg.png";
import ReviewDialog from "@/components/Desktop/ReviewDialog";
import FavouriteAndShareButton from "@/components/Desktop/FavouriteAndShareButton";
import { useWorkerReview } from "@/hooks/useWorkerReview";
import { useUser } from "@/context/UserContext";

const Workerpage = ({ worker }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { addReview } = useWorkerReview(worker.id);
  const [openReview, setOpenReview] = useState(false);

  const handleReviewSubmit = async ({ rating, comment }) => {
    await addReview({ rating, message: comment });
    setOpenReview(false);
  };

  return (
    <Grid container sx={{ bgcolor: "#f9f9f9", }}>
      {/* Banner Section */}
      <Box sx={{ width: "100%", bgcolor: "#fff" }}>
        <Box sx={{ position: "relative", width: "100%" }}>
          <img
            src={worker.image ? worker.image : DefaultWorkerImg}
            alt="Top Banner"
            style={{
              width: "100%",
              height: 160,
              objectFit: "cover",
            }}
          />

          {/* Back Button */}
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
              zIndex: 2,
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              padding: 0,
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: 20, ml: 0.7 }} />
          </IconButton>

          {/* Action Buttons */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 7,
                right: 1,
                display: "flex",
                gap: 1,
              }}
            >
              <FavouriteAndShareButton />
            </Box>
          </Stack>
        </Box>

        {/* Profile Section */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: -7 }}>
          <Avatar
            src={worker.avatar}
            sx={{
              width: 100,
              height: 100,
              border: "4px solid white",
              boxShadow: "0px 4px 14px rgba(0,0,0,0.2)",
            }}
          />
        </Box>

        {/* Name + Location */}
        <Box textAlign="center" mt={1.5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={0.6}
          >
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 600,
                color: "#111",
                lineHeight: 1.2,
              }}
            >
              {worker.name}
            </Typography>
            <VerifiedIcon sx={{ color: "#1C9C3C", fontSize: 21 }} />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={0.6}
            mt={0.5}
          >
            <MapPinIcon size={15} color="#555" />
            <Typography fontSize={13.5} color="#666">
              {worker.location}
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1.5}
          px={2}
          pb={1.5}
          mt={2}
        >
          {/* Add Review */}
          {!user?.id || worker.userId !== user.id && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenReview(true)}
              sx={{
                bgcolor: "#ffffff",
                color: "#0b134a",
                fontWeight: 600,
                py: 1.2,
                fontSize: 14,
                borderRadius: 2,
                textTransform: "none",
                border: "1px solid #0b134a",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                "&:hover": { bgcolor: "#f5f7ff" },
                "&:active": { transform: "scale(0.98)" },
              }}
            >
              Add Review
            </Button>
          )}

          {/* Call Now */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => window.open(`tel:${worker.phone}`, "_self")}
            sx={{
              bgcolor: "#0b134a",
              color: "#fff",
              fontWeight: 600,
              py: 1.2,
              fontSize: 14,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
              "&:hover": { bgcolor: "#16227d" },
              "&:active": { transform: "scale(0.98)" },
            }}
          >
            Call Now
          </Button>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box width="100%" >
        <WorkerTopTab worker={worker} key={`review-todo-fix-here-${Date.now()}`} />
      </Box>
      <ReviewDialog
        open={openReview}
        onClose={() => setOpenReview(false)}
        title={`Rate ${worker.name}`}
        onSubmit={handleReviewSubmit}
      />
    </Grid>
  );
};

export default Workerpage;
