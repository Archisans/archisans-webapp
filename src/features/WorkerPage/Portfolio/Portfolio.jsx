import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";

import PortfolioUpload from "./components/PortfolioUpload";
import WorkSampleCard from "./components/WorkSampleCard";
import WorkSampleForm from "./components/WorkSampleForm";

import arImage from "@/assets/Images/ar.jpg";
import sampleVideo from "@/assets/Images/sample.mp4";

const workTypes = ["Plumbing", "Electrical", "Construction", "Painting", "Other"];

const PortfolioDesktop = () => {
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [workSamples, setWorkSamples] = useState([
    {
      title: "Residential Plumbing Project",
      type: "Plumbing",
      location: "New York, NY",
      photos: [arImage, arImage, arImage],
      videos: [sampleVideo],
      videoLinks: ["https://youtu.be/example1"],
      clientNumber: "+1 555 123 4567",
      edit: false,
    },
    {
      title: "Office Electrical Installation",
      type: "Electrical",
      location: "San Francisco, CA",
      photos: [arImage],
      videos: [sampleVideo],
      videoLinks: ["https://youtu.be/example2"],
      clientNumber: "+1 555 987 6543",
      edit: false,
    },
    {
      title: "Luxury Apartment Painting",
      type: "Painting",
      location: "Los Angeles, CA",
      photos: [arImage],
      videos: [sampleVideo],
      videoLinks: [],
      clientNumber: "+1 555 654 3210",
      edit: false,
    },
  ]);

  const [openFormIndex, setOpenFormIndex] = useState(null);
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
    setWorkSamples([
      ...workSamples,
      {
        title: "",
        type: "",
        location: "",
        photos: [],
        videos: [],
        videoLinks: [""],
        clientNumber: "",
        edit: true,
      },
    ]);
    setOpenFormIndex(workSamples.length);
  };

  const handleRemoveWorkSample = (index) => {
    const updated = [...workSamples];
    updated.splice(index, 1);
    setWorkSamples(updated);
  };

  const handleOpenForm = (index) => setOpenFormIndex(index);
  const handleCloseForm = () => setOpenFormIndex(null);

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 4,
        mx: "auto",
        display: "flex",
        gap: 4,
        bgcolor: "#f9fafc",
        flexDirection:"row",
      }}
    >
      {/* Left Column */}
      <Box sx={{ flex: 1 }}>
        {/* Portfolio Upload + Add Work Sample inside it */}
        <PortfolioUpload
          portfolioFile={portfolioFile}
          setPortfolioFile={setPortfolioFile}
          portfolioLink={portfolioLink}
          setPortfolioLink={setPortfolioLink}
          handleAddWorkSample={handleAddWorkSample} // pass the handler
        />

        {/* Work Samples Heading */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "text.primary", letterSpacing: 0.5 }}
          >
            Work Samples
          </Typography>
          <Divider
            sx={{ my: 1.5, borderColor: "primary.main", borderWidth: 2, width: 200, borderRadius: 2 }}
          />
        </Box>

        {/* Work Samples Grid */}
        <Grid container spacing={5} ml={3}>
          {workSamples.map((sample, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <WorkSampleCard
                sample={sample}
                index={index}
                toggleEditMode={() => handleOpenForm(index)}
                handleRemoveFile={handleRemoveFile}
                handleRemoveWorkSample={handleRemoveWorkSample}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Modal: Work Sample Form */}
      {openFormIndex !== null && (
        <Dialog open={true} onClose={handleCloseForm} maxWidth="md" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>
            {workSamples[openFormIndex].title || "Add Work Sample"}
          </DialogTitle>
          <DialogContent>
            <WorkSampleForm
              sample={workSamples[openFormIndex]}
              index={openFormIndex}
              editRefs={editRefs}
              handleWorkChange={handleWorkChange}
              handleFileUpload={handleFileUpload}
              handleRemoveFile={handleRemoveFile}
              toggleEditMode={handleCloseForm}
              workTypes={workTypes}
            />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default PortfolioDesktop;
