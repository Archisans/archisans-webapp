import { Box, Paper, Typography } from "@mui/material";

const WorkerBusiness = ({ company }) => {
  return (
    <Box>
      {/* Business Details */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          position: "sticky",
          top: 20,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          Business Details
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography variant="body2" color="#666" mb={0.5}>
              Company Name
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {company.companyName || "Not Available"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="#666" mb={0.5}>
              Work Permit
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {company.workPermitNumber || "Not Available"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="#666" mb={0.5}>
              GST Number
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {company.gstNumber || "Not Available"}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default WorkerBusiness;
