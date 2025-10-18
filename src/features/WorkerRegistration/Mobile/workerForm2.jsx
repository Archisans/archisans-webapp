import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import BottomButton from "@/features/WorkerRegistration/Mobile/components/BottomButton";
import TopProgressBar from "@/features/WorkerRegistration/Mobile/components/TopProgressBar";
import { useContactInfoForm, sanitizeInput } from "../utils/workerFormLogic";

const WorkerForm2 = ({ formData, updateFormData, next, back }) => {
  const [phone, _setPhone] = useState(formData.contact?.phone || "");
  const [altPhone, setAltPhone] = useState(formData.contact?.altPhone || "");
  const [email, setEmail] = useState(formData.contact?.email || "");
  const [address, setAddress] = useState(formData.contact?.address || "");

  const { errors, touched, handleBlur, validateContactInfo } =
    useContactInfoForm(formData, updateFormData);

  const handleNext = () => {
    const isValid = validateContactInfo({ altPhone, email, address });
    if (isValid) {
      updateFormData("contact", { altPhone, email, address });
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
          activeStep={1}
          onBack={back}
          pgnum="2/4"
          title="Contact Info"
        />

        <TextField
          label="Phone Number"
          placeholder="Enter your phone number"
          fullWidth
          value={phone}
          disabled={true}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Alternate Phone Number"
          placeholder="Enter your alternate phone number"
          fullWidth
          value={altPhone}
          onChange={(e) => {
            const val = sanitizeInput.numericOnly(e.target.value, 10);
            setAltPhone(val);
            updateFormData("contact", { ...formData.contact, altPhone: val });
          }}
          onBlur={() => handleBlur("altPhone", altPhone)}
          error={touched.altPhone && !!errors.altPhone}
          helperText={touched.altPhone && errors.altPhone}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Email Address"
          placeholder="Enter your email address"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => {
            const val = sanitizeInput.email(e.target.value);
            setEmail(val);
            updateFormData("contact", { ...formData.contact, email: val });
          }}
          onBlur={() => handleBlur("email", email)}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Permanent Address"
          placeholder="Enter your permanent address"
          fullWidth
          multiline
          rows={3}
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            updateFormData("contact", {
              ...formData.contact,
              address: e.target.value,
            });
          }}
          onBlur={() => handleBlur("address", address)}
          error={touched.address && !!errors.address}
          helperText={touched.address && errors.address}
          sx={{ mb: 3 }}
        />

        <BottomButton handleNext={handleNext} />
      </Box>
    </Box>
  );
};

export default WorkerForm2;
