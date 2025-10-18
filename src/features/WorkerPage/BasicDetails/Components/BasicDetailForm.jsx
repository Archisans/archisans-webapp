import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDetails({ formData, handleChange, isEditMode }) {
  return (
    <Card sx={{mt:3, borderRadius: 3, boxShadow: "0px 4px 12px rgba(0,0,0,0.08)", p: { xs: 2, md: 4 }, bgcolor: "white" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
        
        {/* Basic Details */}
        <Box>
          <Typography variant="h6" fontWeight={700} mb={3}>Basic Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name (as per Aadhaar)"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Aadhaar Number"
                value={formData.aadhaar}
                onChange={(e) => handleChange("aadhaar", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Date of Birth"
                value={formData.dob}
                onChange={(newValue) => handleChange("dob", newValue)}
                slotProps={{ textField: { fullWidth: true, sx: { bgcolor: "#f9fafb" }, disabled: !isEditMode } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={!isEditMode}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  sx={{ bgcolor: "#f9fafb" }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Contact Details */}
        <Box>
          <Typography variant="h6" fontWeight={700} mb={3}>Contact Details</Typography>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Alternate Phone Number"
                value={formData.altPhone}
                onChange={(e) => handleChange("altPhone", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email Address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Permanent Address"
                multiline
                rows={3}
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Office Address"
                multiline
                rows={3}
                value={formData.officeAddress}
                onChange={(e) => handleChange("officeAddress", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Professional Details */}
        <Box>
          <Typography variant="h6" fontWeight={700} mb={3}>Professional Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Firm/Company Name"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Work Permit Card"
                value={formData.workPermit}
                onChange={(e) => handleChange("workPermit", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GST Number"
                value={formData.gstNumber}
                onChange={(e) => handleChange("gstNumber", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Working Hours"
                value={formData.workingHours}
                onChange={(e) => handleChange("workingHours", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Bank Details */}
        <Box>
          <Typography variant="h6" fontWeight={700} mb={3}>Bank Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Account Holder Name"
                value={formData.accountHolder}
                onChange={(e) => handleChange("accountHolder", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="IFSC Code"
                value={formData.ifscCode}
                onChange={(e) => handleChange("ifscCode", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Branch Name"
                value={formData.branchName}
                onChange={(e) => handleChange("branchName", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Account Number"
                value={formData.accountNumber}
                onChange={(e) => handleChange("accountNumber", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Account Type"
                placeholder="Savings / Current"
                value={formData.accountType}
                onChange={(e) => handleChange("accountType", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Social Media Links */}
        <Box>
          <Typography variant="h6" fontWeight={700} mb={3}>Social Media Links</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Facebook"
                value={formData.facebook}
                onChange={(e) => handleChange("facebook", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Instagram"
                value={formData.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="LinkedIn"
                value={formData.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                variant="outlined"
                sx={{ bgcolor: "#f9fafb" }}
                disabled={!isEditMode}
              />
            </Grid>
          </Grid>
        </Box>

      </CardContent>
    </Card>
  );
}
