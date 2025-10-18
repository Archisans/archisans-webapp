import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RouteProvider } from "@/config/RouteProvider";
import { ArrowForward } from "@mui/icons-material";
import workerJoinPDF from "@/assets/pdf/workerjoin.pdf"


const WorkerBanner = () => {
  const navigate = useNavigate();
   const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = workerJoinPDF;
    link.download = "Professionals_Guide.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ py: 4, backgroundColor: "#cadae7ff", textAlign: "center" }}>
      <Box sx={{ maxWidth: 800, mx: "auto", px: 3 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          
          <Typography variant="h4" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 700, color: "#434966", mb: 2 }}>
            Join as a Professional
          </Typography>
          
          <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, color: "#82889C", mb: 3, maxWidth: 500, mx: "auto" }}>
            Connect with clients, grow your business, and earn more. Join thousands of professionals on our platform.
          </Typography>
          
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexDirection: { xs: "column", sm: "row" }, alignItems: "center" }}>
            <Button 
              variant="contained" 
              endIcon={<ArrowForward />} 
              onClick={() => navigate(RouteProvider.WORKER_REGISTER)} 
              sx={{ 
                background: "linear-gradient(135deg, #0c136fff, #677489)", 
                color: "white", 
                fontWeight: 600, 
                px: 4, 
                py: 1.5, 
                borderRadius: 3, 
                textTransform: "none", 
                fontSize: "0.95rem" 
              }}
            >
              Join Now
            </Button>
            {/* <Button 
              variant="outlined" 
              onClick={downloadPDF}
              sx={{ 
                color: "#0c136fff", 
                borderColor: "#0c136fff", 
                fontWeight: 500, 
                px: 4, 
                py: 1.5, 
                borderRadius: 3, 
                textTransform: "none", 
                fontSize: "0.95rem",
                "&:hover": { 
                  borderColor: "#0c136fff", 
                  backgroundColor: "rgba(12,19,111,0.05)" 
                } 
              }}
            >
              Learn More
            </Button> */}
          </Box>
          
        </motion.div>
      </Box>
    </Box>
  );
};


export default WorkerBanner;
