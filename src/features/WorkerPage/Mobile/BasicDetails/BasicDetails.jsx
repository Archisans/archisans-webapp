import React, { useState, useRef } from "react";
import { Box, Card, CardContent, Typography, IconButton, useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { steps } from "./constant";
import HeaderSection from "./Components/HeaderSection";
import ProfileInfo from "./Components/ProfileInfo";
import StepperNav from "./Components/StepperNav";
import StepContent from "./Components/StepCount";
import FormNavigation from "./Components/FormNavigation";

export default function BasicDetails() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "Athul Mural T",
    aadhaar: "6497468XXXXXXXXX",
    dob: dayjs("1980-08-16"),
    gender: "Male",
    phone: "+91 6794877534",
  });

  const theme = useTheme();
  const navigate = useNavigate();

  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1505691938895-1758d7feb511");
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  const handleChange = (field, value) => setFormData({ ...formData, [field]: value });

  const handleNext = () => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  const handleBack = () => setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 400, mx: "auto", bgcolor: "#f9f9f9", minHeight: "100vh", position: "relative" }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ position: "absolute", top: 8, left: 8, bgcolor: "rgba(0,0,0,0.5)", color: "white" }}
        >
          <ArrowBackIcon />
        </IconButton>

        <HeaderSection coverImage={coverImage} handleImageChange={handleImageChange} fileInputRef={fileInputRef} />
        <ProfileInfo theme={theme} name={formData.name} />
        <StepperNav activeStep={activeStep} steps={steps} />

        <Card sx={{ mx: 2, mt: 3, borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2} align="center">
              {steps[activeStep]}
            </Typography>
            <StepContent activeStep={activeStep} formData={formData} handleChange={handleChange} />
          </CardContent>
        </Card>

        <FormNavigation activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext} theme={theme} />
      </Box>
    </LocalizationProvider>
  );
}