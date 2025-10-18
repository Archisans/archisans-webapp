import React from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

const PortfolioUpload = ({ portfolioFile, setPortfolioFile, portfolioLink, setPortfolioLink }) => {
  const handlePortfolioUpload = (e) => setPortfolioFile(e.target.files[0]);

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Portfolio File (PDF)
      </Typography>
      <Button variant="contained" component="label" startIcon={<UploadFile />}>
        Upload PDF
        <input type="file" hidden accept="application/pdf" onChange={handlePortfolioUpload} />
      </Button>
      {portfolioFile && (
        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          Selected: {portfolioFile.name}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Portfolio Link (optional)"
        sx={{ mt: 2 }}
        value={portfolioLink}
        onChange={(e) => setPortfolioLink(e.target.value)}
      />
    </Paper>
  );
};

export default PortfolioUpload;