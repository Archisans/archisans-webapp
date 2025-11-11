import React, { useState, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";

import MobHeading from "@/components/Mobile/mobileHeading";
import PortfolioUpload from "./components/PortfolioUpload";
import WorkSampleCard from "./components/WorkSampleCard";
import WorkSampleForm from "./components/WorkSampleForm";

import arImage from "@/assets/Images/ar.jpg";
import sampleVideo from "@/assets/Images/sample.mp4";

const workTypes = ["Plumbing", "Electrical", "Construction", "Painting", "Other"];

const Portfolio = () => {
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [workSamples, setWorkSamples] = useState([
    { title: "Residential Plumbing Project", type: "Plumbing", location: "New York, NY", photos: [arImage, arImage, arImage], videos: [sampleVideo], videoLinks: ["https://youtu.be/example1"], clientNumber: "+1 555 123 4567", edit: false },
    { title: "Office Electrical Installation", type: "Electrical", location: "San Francisco, CA", photos: [arImage], videos: [sampleVideo], videoLinks: ["https://youtu.be/example2"], clientNumber: "+1 555 987 6543", edit: false },
    { title: "Luxury Apartment Painting", type: "Painting", location: "Los Angeles, CA", photos: [arImage], videos: [sampleVideo], videoLinks: [], clientNumber: "+1 555 654 3210", edit: false },
  ]);

  const editRefs = useRef([]);

  const handleWorkChange = (index, field, value) => {
    const updated = [...workSamples];
    updated[index][field] = value;
    setWorkSamples(updated);
  };

  const handleFileUpload = (e, index, field) => {
    const files = Array.from(e.target.files);
    const updated = [...workSamples];
    updated[index][field] = [...updated[index][field], ...files];
    setWorkSamples(updated);
  };

  const handleRemoveFile = (index, field, fileIndex) => {
    const updated = [...workSamples];
    updated[index][field] = updated[index][field].filter((_, i) => i !== fileIndex);
    setWorkSamples(updated);
  };

  const handleAddWorkSample = () => {
    setWorkSamples([...workSamples, { title: "", type: "", location: "", photos: [], videos: [], videoLinks: [""], clientNumber: "", edit: true }]);
    setTimeout(() => {
      const lastIndex = workSamples.length;
      editRefs.current[lastIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleRemoveWorkSample = (index) => {
    const updated = [...workSamples];
    updated.splice(index, 1);
    setWorkSamples(updated);
  };

  const toggleEditMode = (index, mode) => {
    const updated = [...workSamples];
    updated[index].edit = mode;
    setWorkSamples(updated);
    if (mode) setTimeout(() => editRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 1300, mx: "auto" }}>
      <MobHeading Heading="My Portfolio" />

      <PortfolioUpload portfolioFile={portfolioFile} setPortfolioFile={setPortfolioFile} portfolioLink={portfolioLink} setPortfolioLink={setPortfolioLink} />

      <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2, // optional margin-bottom for spacing
  }}
>
  <Typography  sx={{fontSize:20, fontWeight: 500 }}>
    My Projects
  </Typography>

  <Button
  variant="contained"
  size="small"
  startIcon={<Add />}
  onClick={handleAddWorkSample}
  sx={{
    fontSize: 13,
    textTransform: "none",
    px: 1.5,
    py: 0.8,
  }}
>
  Add Project
</Button>
</Box>
      {/* Edit/Add Forms */}
      <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        {workSamples.map((sample, index) => sample.edit && (
          <WorkSampleForm key={index} sample={sample} index={index} editRefs={editRefs} handleWorkChange={handleWorkChange} handleFileUpload={handleFileUpload} handleRemoveFile={handleRemoveFile} toggleEditMode={toggleEditMode} workTypes={workTypes} />
        ))}
      </Box>

{/* Vertical List */}
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 3,
    py: 2,
  }}
>
  {workSamples.map(
    (sample, index) =>
      !sample.edit && (
        <motion.div
          key={index}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <WorkSampleCard
            sample={sample}
            index={index}
            toggleEditMode={toggleEditMode}
            handleRemoveFile={handleRemoveFile}
            handleRemoveWorkSample={handleRemoveWorkSample}
          />
        </motion.div>
      )
  )}
</Box>

    </Box>
  );
};

export default Portfolio;
