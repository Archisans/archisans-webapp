import React from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import { businessDetails } from "@/features/Worker/constants";

const MobWorkerBusiness = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: { xs: 15, sm: 16, md: 17 }, // responsive font size
          fontWeight: 600,
          mt: { xs: 2, sm: 3, md: 4 }, // spacing scales with screen
          mb: { xs: 1, sm: 2 },
          ml: { xs: 1, sm: 2 },
          color: "#050a56ff",
        }}
      >
        Business Details
      </Typography>

      <Card
        sx={{
          m: { xs: 0.5, sm: 1 },
          borderRadius: 2,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
          {/* Office Address */}
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              fontSize: { xs: 12, sm: 13, md: 14 },
            }}
          >
            Office Address
          </Typography>
          <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 15 }, mb: 2 }}>
            {businessDetails.officeAddress}
          </Typography>
          <Divider />

          {/* Permanent Address */}
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              mt: 2,
              fontSize: { xs: 12, sm: 13, md: 14 },
            }}
          >
            Permanent Address
          </Typography>
          <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 15 }, mb: 2 }}>
            {businessDetails.permanentAddress}
          </Typography>
          <Divider />

          {/* Company Name */}
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              mt: 2,
              fontSize: { xs: 12, sm: 13, md: 14 },
            }}
          >
            Company Name (if part of an agency)
          </Typography>
          <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 15 }, mb: 2 }}>
            {businessDetails.companyName}
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
            {businessDetails.workPermit}
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
            {businessDetails.gstNumber}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MobWorkerBusiness;
