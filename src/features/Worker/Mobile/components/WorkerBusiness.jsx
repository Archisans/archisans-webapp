import { Box, Typography, Divider } from "@mui/material";

const MobWorkerBusiness = ({ company }) => {
  return (
    <Box sx={{ p: 1 }}>
      {/* Working Hours */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "neutral.content.800",
          fontSize: { xs: 12, sm: 13, md: 14 },
        }}
      >
        Working Hours
      </Typography>
      <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 15 }, mb: 2 }}>
        {company.workingHours.startTime || "Not Available"} to {company.workingHours.endTime || "Not Available"}
      </Typography>
      <Divider />

      {/* Company Name */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "neutral.content.800",
          fontSize: { xs: 12, sm: 13, md: 14 },
        }}
      >
        Company Name
      </Typography>
      <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 15 }, mb: 2 }}>
        {company.companyName}
      </Typography>
      <Divider />

      {/* GST Number */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "neutral.content.800",
          mt: 2,
          fontSize: { xs: 12, sm: 13, md: 14 },
        }}
      >
        GST Number
      </Typography>
      <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 15 } }}>
        {company.gstNumber}
      </Typography>
    </Box>
  );
};

export default MobWorkerBusiness;
