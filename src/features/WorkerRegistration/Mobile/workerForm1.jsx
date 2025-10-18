import React, { useState } from "react";
import {
  Box,
  TextField,
  Avatar,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import BottomButton from "@/features/WorkerRegistration/Mobile/components/BottomButton";
import TopProgressBar from "@/features/WorkerRegistration/Mobile/components/TopProgressBar";
import { usePersonalInfoForm, sanitizeInput } from "../utils/workerFormLogic";
import { GENDER_OPTIONS } from "../utils/constants";

const WorkerForm1 = ({ formData, updateFormData, next, back }) => {
  const [aadhaar, setAadhaar] = useState(formData?.personal?.aadhaar || "");
  const [dob, setDob] = useState(formData?.personal?.dob || "");
  const [gender, setGender] = useState(formData?.personal?.gender || "");

  const { errors, touched, handleBlur, validatePersonalInfo } =
    usePersonalInfoForm(formData, updateFormData);

  const handleNext = () => {
    const isValid = validatePersonalInfo({ aadhaar, dob, gender });
    if (isValid) {
      updateFormData("personal", { gender, aadhaar, dob });
      next();
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: 500,
        mx: "auto",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pb: { xs: 12, sm: 10 },
      }}
    >
      <Box>
        <TopProgressBar
          activeStep={0}
          onBack={back}
          pgnum="1/4"
          title="Tell us more"
        />

        <Box display="flex" justifyContent="center" mb={3}>
          <IconButton color="primary" component="label">
            <Avatar
              src={formData?.uploadedImage}
              sx={{
                width: { xs: 100, sm: 120 },
                height: { xs: 100, sm: 120 },
                bgcolor: "#e0e0e0",
                color: "gray",
                fontSize: { xs: "2rem", sm: "2.5rem" },
              }}
            ></Avatar>
          </IconButton>
        </Box>

        <TextField
          label="Full Name"
          placeholder="Enter your full name"
          fullWidth
          value={formData.personal.fullName}
          disabled={true}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Aadhaar Number"
          placeholder="Enter your Aadhaar number"
          fullWidth
          value={aadhaar}
          onChange={(e) => {
            const val = sanitizeInput.numericOnly(e.target.value, 12);
            setAadhaar(val);
            updateFormData("personal", {
              ...formData.personal,
              aadhaar: val,
            });
          }}
          onBlur={() => handleBlur("aadhaar", aadhaar)}
          error={touched.aadhaar && !!errors.aadhaar}
          helperText={touched.aadhaar && errors.aadhaar}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Date of Birth"
          type="date"
          fullWidth
          value={dob}
          onChange={(e) => {
            setDob(e.target.value);
            updateFormData("personal", {
              ...formData.personal,
              dob: e.target.value,
            });
          }}
          onBlur={() => handleBlur("dob", dob)}
          InputLabelProps={{ shrink: true }}
          error={touched.dob && !!errors.dob}
          helperText={touched.dob && errors.dob}
          sx={{ mb: 3 }}
        />

        <FormControl
          fullWidth
          error={touched.gender && !!errors.gender}
          sx={{ mb: 3 }}
        >
          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            label="Gender"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              updateFormData("personal", {
                ...formData.personal,
                gender: e.target.value,
              });
            }}
            onBlur={() => handleBlur("gender", gender)}
          >
            {GENDER_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {touched.gender && errors.gender && (
            <FormHelperText>{errors.gender}</FormHelperText>
          )}
        </FormControl>
      </Box>

      <BottomButton handleNext={handleNext} />
    </Box>
  );
};

export default WorkerForm1;
