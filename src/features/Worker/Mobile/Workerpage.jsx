import {
  Grid,
  Typography,
  Avatar,
  Box,
  Button,
  IconButton,
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

const Workerpage = ({ worker }) => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Banner Section */}
      <Box sx={{ width: "100%", bgcolor: "#fff" }}>
        <Box sx={{ position: "relative", width: "100%" }}>
          <img
            src={worker.image}
            alt="Top Banner"
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
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
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: 20 }} />
          </IconButton>

          {/* Share + Heart */}
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              gap: 1,
              zIndex: 2,
            }}
          >
            <IconButton
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": { bgcolor: "#e8e8e8" },
              }}
            >
              <ShareNetworkIcon size={18} color="#0030CC" />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                "&:hover": { bgcolor: "#e8e8e8" },
              }}
            >
              <HeartIcon size={18} color="#FF3B3B" />
            </IconButton>
          </Box>
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

        {/* About */}
        <Box px={3} mt={1.5} mb={2} textAlign="center">
          <Typography
            fontSize={14}
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.5,
            }}
          >
            {worker.about}
          </Typography>
        </Box>

        {/* Call Now */}
        <Box display="flex" justifyContent="center" pb={1}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => window.open(`tel:${worker.phone}`, "_self")}
            sx={{
              mx: 3,
              bgcolor: "#0b134a",
              color: "#fff",
              fontWeight: 600,
              py: 1.2,
              fontSize: 15,
              borderRadius: 1.5,
              textTransform: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              "&:hover": { bgcolor: "#16227d" },
            }}
          >
            Call Now
          </Button>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box width="100%">
        <WorkerTopTab worker={worker} />
      </Box>
    </Grid>
  );
};

export default Workerpage;
