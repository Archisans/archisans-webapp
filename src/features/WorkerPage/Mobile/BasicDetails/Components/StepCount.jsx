import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function StepContent({ activeStep, formData, handleChange }) {
  switch (activeStep) {
    case 0: // Basic Details
      return (
        <>
          <TextField
            fullWidth
            label="Full Name (as per Aadhaar)"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            variant="standard"
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Aadhaar Number"
            value={formData.aadhaar}
            onChange={(e) => handleChange("aadhaar", e.target.value)}
            variant="standard"
            sx={{ mb: 4 }}
          />

          <DatePicker
            label="Date of Birth"
            value={formData.dob}
            onChange={(newValue) => handleChange("dob", newValue)}
            sx={{ mb: 4, width: "100%" }}
          />

          <FormControl variant="standard" fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </>
      );

    case 1: // Contact Details
      return (
        <>
          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            variant="standard"
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Alternate Phone Number"
            value={formData.altPhone || ""}
            onChange={(e) => handleChange("altPhone", e.target.value)}
            variant="standard"
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Email Address"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            variant="standard"
            sx={{ mb: 5 }}
          />

          <TextField
            fullWidth
            label="Permanent Address"
            multiline
            rows={3}
            value={formData.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Office Address"
            multiline
            rows={3}
            value={formData.officeAddress || ""}
            onChange={(e) => handleChange("officeAddress", e.target.value)}
            variant="outlined"
          />
        </>
      );

    case 2: // Professional Details
      return (
        <>
          <TextField
            fullWidth
            label="Firm/Company Name"
            value={formData.companyName || ""}
            onChange={(e) => handleChange("companyName", e.target.value)}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Work Permit Card"
            value={formData.workPermit || ""}
            onChange={(e) => handleChange("workPermit", e.target.value)}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="GST Number"
            value={formData.gstNumber || ""}
            onChange={(e) => handleChange("gstNumber", e.target.value)}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Company Working Hours"
            value={formData.workingHours || ""}
            onChange={(e) => handleChange("workingHours", e.target.value)}
            variant="standard"
          />
        </>
      );

    case 3: // Bank Details
      return (
        <>
          <TextField
            fullWidth
            label="Account Holder Name"
            value={formData.accountHolder || ""}
            onChange={(e) => handleChange("accountHolder", e.target.value)}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="IFSC Code"
            value={formData.ifscCode || ""}
            onChange={(e) => handleChange("ifscCode", e.target.value)}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Branch Name"
            value={formData.branchName || ""}
            onChange={(e) => handleChange("branchName", e.target.value)}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Account Number"
            value={formData.accountNumber || ""}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Account Type"
            placeholder="e.g. Savings, Current"
            value={formData.accountType || ""}
            onChange={(e) => handleChange("accountType", e.target.value)}
            variant="standard"
          />
        </>
      );

    case 4: // Social Media Links
      return (
        <>
          <TextField
            fullWidth
            label="Facebook"
            value={formData.facebook || ""}
            onChange={(e) => handleChange("facebook", e.target.value)}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Instagram"
            value={formData.instagram || ""}
            onChange={(e) => handleChange("instagram", e.target.value)}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="LinkedIn"
            value={formData.linkedin || ""}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            variant="standard"
          />
        </>
      );

    default:
      return null;
  }
}
