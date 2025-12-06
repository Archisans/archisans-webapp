import { Typography, Box, Grid } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MobHeading = ({ Heading, backArrow = true }) => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <Box sx={{ paddingBottom: "60px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "60px",
          bgcolor: "neutral.bg.50",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        {/* Back Arrow */}
        {backArrow && (
          <ArrowBackIosIcon
            onClick={() => navigate(-1)}
            sx={{ fontSize: "20px", marginLeft: "15px" }}
          />
        )}

        {/* Centered Heading */}
        <Typography
          noWrap
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginLeft: "15px",
            color: 'primary.bg.default'
          }}
        >
          {Heading}
        </Typography>
      </Box>
    </Box>
  );
};

export default MobHeading;
