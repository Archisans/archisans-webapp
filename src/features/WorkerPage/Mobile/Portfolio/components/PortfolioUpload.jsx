import React from "react";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

const PortfolioUpload = ({
  portfolioFile,
  setPortfolioFile,
  portfolioLink,
  setPortfolioLink,
}) => {
  const handlePortfolioUpload = (e) => setPortfolioFile(e.target.files[0]);

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
      <Typography sx={{ fontSize: 16, mb: 2 }}>Portfolio File (PDF)</Typography>

      {/* Upload + Link in Same Row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFile />}
          sx={{ whiteSpace: "nowrap", minWidth: 120 }}
        >
          <Typography sx={{ color: "white", fontSize: 12 }}>Upload</Typography>
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

      {portfolioFile && (
        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          Selected: {portfolioFile.name}
        </Typography>
      )}
    </Paper>
  );
};

export default PortfolioUpload;
