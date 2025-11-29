import { Box, Typography, Divider } from "@mui/material";

const MobWorkerBusiness = ({ company }) => {

    const startTime = "";
    const endTime ="";

  return (
    <Box sx={{ p: 1 }}>



{/* Working Hours */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          fontSize: { xs: 12, sm: 13, md: 14 },
        }}
      >
        Working Hours
      </Typography>
      <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 15 }, mb: 2 }}>
        {startTime || "Not Available"} to {endTime || "Not Available"}
      </Typography>
      <Divider />

      {/* Company Name */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          fontSize: { xs: 12, sm: 13, md: 14 },
        }}
      >
        Company Name
      </Typography>
      <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 15 }, mb: 2 }}>
        {company.companyName}
      </Typography>
      <Divider />

      {/* Work Permit */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          mt: 2,
          fontSize: { xs: 12, sm: 13, md: 14 },
        }}
      >
        Work Permit Card
      </Typography>
      <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 15 }, mb: 2 }}>
        {company.workPermitNumber}
      </Typography>
      <Divider />

      {/* GST Number */}
      <Typography
        variant="subtitle2"
        sx={{
          color: "text.secondary",
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
