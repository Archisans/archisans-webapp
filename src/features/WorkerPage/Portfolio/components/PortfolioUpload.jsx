import React from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { UploadFile, Add } from "@mui/icons-material";

const PortfolioUpload = ({ 
  portfolioFile, 
  setPortfolioFile, 
  portfolioLink, 
  setPortfolioLink, 
  handleAddWorkSample 
}) => {
  const handlePortfolioUpload = (e) => setPortfolioFile(e.target.files[0]);

  return (
    <Box
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        display: "flex",
        gap: 3,
        flexWrap: { xs: "wrap", md: "nowrap" },
        bgcolor: "#ffffff",
        alignItems: "flex-start",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // full shadow
        border: "1px solid #e0e0e0" // subtle border for full card effect
      }}
    >
      {/* Left Section: Portfolio Upload */}
      <Box sx={{ flex: 1, minWidth: 250 }}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Upload Portfolio
        </Typography>

        <Button 
          variant="outlined" 
          component="label" 
          startIcon={<UploadFile />} 
          sx={{ mb: 2, textTransform: "none" }}
        >
          {portfolioFile ? "Change PDF" : "Upload PDF"}
          <input type="file" hidden accept="application/pdf" onChange={handlePortfolioUpload} />
        </Button>

        {portfolioFile && (
          <Typography variant="body2" color="text.secondary" >
            {portfolioFile.name}
          </Typography>
        )}

        <TextField
          fullWidth
          size="small"
          label="Portfolio Link (optional)"
          placeholder="https://example.com"
          value={portfolioLink}
          onChange={(e) => setPortfolioLink(e.target.value)}
        />
      </Box>

      {/* Vertical Divider */}
      <Divider orientation="vertical" flexItem sx={{ borderColor: "grey.300" }} />

      {/* Right Section: Add Work Sample */}
      <Box sx={{ flex: 1, minWidth: 250, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Work Samples
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddWorkSample}
          sx={{
            width: "80%",
            textTransform: "none",
            fontWeight: 600,
            py: 1.5,
            borderRadius: 1.5
          }}
        >
          Add Work Sample
        </Button>
      </Box>
    </Box>
  );
};

export default PortfolioUpload;
