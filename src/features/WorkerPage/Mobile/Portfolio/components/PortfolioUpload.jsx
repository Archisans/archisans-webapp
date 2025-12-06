import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

const PortfolioUpload = ({
  portfolioFile,
  setPortfolioFile,
  portfolioLink,
  setPortfolioLink,
}) => {
  const [error, setError] = useState("");

  const handlePortfolioUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024; // 1 MB

    if (file.size > maxSize) {
      setError("File size must be less than 1 MB");
      e.target.value = ""; 
      setPortfolioFile(null);
      return;
    }

    setError(""); // Clear error
    setPortfolioFile(file);
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
      <Typography sx={{ fontSize: 16, mb: 2 }}>Portfolio File (PDF)</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFile />}
          sx={{ whiteSpace: "nowrap", minWidth: 120 }}
        >
          <Typography sx={{ color: "neutral.bg.50", fontSize: 12 }}>Upload</Typography>
          <input
            type="file"
            hidden
            accept="application/pdf"
            onChange={handlePortfolioUpload}
          />
        </Button>

        <TextField
          label="Link (optional)"
          size="small"
          sx={{ width: 220 }}
          value={portfolioLink}
          onChange={(e) => setPortfolioLink(e.target.value)}
        />
      </Box>

      {/* Error message */}
      {error && (
        <Typography sx={{ color: "error.bg", mt: 1, fontSize: 13 }}>
          {error}
        </Typography>
      )}

      {/* Selected file name */}
      {portfolioFile && !error && (
        <Typography variant="body2" sx={{ mt: 1, color: "neutral.content.700" }}>
          Selected: {portfolioFile.name}
        </Typography>
      )}
    </Paper>
  );
};

export default PortfolioUpload;
