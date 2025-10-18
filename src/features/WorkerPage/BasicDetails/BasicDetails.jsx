import React, { useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Components
import HeaderSection from "./Components/HeaderSectionDesktop";
import BasicDetails from "./Components/BasicDetailForm";

export default function WorkerProfileForm() {
  const fileInputRef = useRef(null);
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1505691938895-1758d7feb511");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  const [formData, setFormData] = useState({
    name: "Daison Babu",
    aadhaar: "6497468XXXXXXXXX",
    dob: null,
    gender: "Male",
    phone: "+91 6794877534",
    altPhone: "",
    email: "",
    address: "",
    officeAddress: "",
    companyName: "",
    workPermit: "",
    gstNumber: "",
    workingHours: "",
  });

  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ px: 6, bgcolor: "#f5f6fa", minWidth: 800, minHeight: "100vh", py: 3 }}>
        {/* Header */}
        <HeaderSection
          coverImage={coverImage}
          handleImageChange={handleImageChange}
          fileInputRef={fileInputRef}
          name={formData.name}
          editAction={() => setIsEditMode(true)}
          showEditButton
        />

        {/* Form */}
        <BasicDetails formData={formData} handleChange={handleChange} isEditMode={isEditMode}/>

        {/* Action Buttons */}
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <Button variant="outlined" sx={{ textTransform: "none", px: 4 }} onClick={() => setIsEditMode(true)} disabled={isEditMode}>
            Edit
          </Button>
          <Button variant="contained" color="primary" sx={{ textTransform: "none", px: 4 }} disabled={!isEditMode} onClick={() => setIsEditMode(false)}>
            Save
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
