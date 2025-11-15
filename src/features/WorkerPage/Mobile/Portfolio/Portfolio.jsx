import React, { useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";

import MobHeading from "@/components/Mobile/mobileHeading";
import PortfolioUpload from "./components/PortfolioUpload";
import WorkSampleCard from "./components/WorkSampleCard";
import WorkSampleForm from "./components/WorkSampleForm";
import EditWorkSample from "./components/EditWorkSample";

import arImage from "@/assets/Images/ar.jpg";
import sampleVideo from "@/assets/Images/sample.mp4";

const Portfolio = () => {
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [portfolioLink, setPortfolioLink] = useState("");

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [workSamples, setWorkSamples] = useState([
    {
      title: "Residential Plumbing Project",
      type: "Plumbing",
      location: "New York, NY",
      photos: [arImage, arImage, arImage],
      videos: [sampleVideo],
      videoLinks: ["https://youtu.be/example1"],
      clientNumber: "+1 555 123 4567",
      driveLink: "",
    },
    {
      title: "Office Electrical Installation",
      type: "Electrical",
      location: "San Francisco, CA",
      photos: [arImage],
      videos: [sampleVideo],
      videoLinks: ["https://youtu.be/example2"],
      clientNumber: "+1 555 987 6543",
      driveLink: "",
    },
  ]);

  // ➤ Open Add Modal
  const handleAddWorkSample = () => setOpenAddModal(true);

  // ➤ Open Edit Modal
  const handleEditWorkSample = (index) => {
    setEditIndex(index);
    setOpenEditModal(true);
  };

  // ➤ Save new sample
  const handleSaveNew = (sample) => {
    setWorkSamples([...workSamples, sample]);
    setOpenAddModal(false);
  };

  // ➤ Save edited sample
  const handleUpdateSample = (updatedSample) => {
    const temp = [...workSamples];
    temp[editIndex] = updatedSample;
    setWorkSamples(temp);
    setOpenEditModal(false);
  };

  // ➤ Remove a work sample
  const handleRemoveWorkSample = (index) => {
    setWorkSamples(workSamples.filter((_, i) => i !== index));
  };

  const modalStyle = {
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "white",
    borderRadius: 2,
    p: 2,
    boxShadow: 4,
    margin: "auto",
    mt: 4,
  };

  return (
    <Box sx={{ p: 2, maxWidth: 1300, mx: "auto" }}>
      <MobHeading Heading="My Portfolio" />

      <PortfolioUpload
        portfolioFile={portfolioFile}
        setPortfolioFile={setPortfolioFile}
        portfolioLink={portfolioLink}
        setPortfolioLink={setPortfolioLink}
      />

      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 500 }}>My Projects</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={handleAddWorkSample}
          sx={{ fontSize: 13, px: 1.5, py: 0.8 }}
        >
          Add Project
        </Button>
      </Box>

      {/* WORK SAMPLE CARDS */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, py: 2 }}>
        {workSamples.map((sample, index) => (
          <motion.div key={index} style={{ width: "100%" }}>
            <WorkSampleCard
              sample={sample}
              index={index}
              handleRemoveWorkSample={handleRemoveWorkSample}
              toggleEditMode={() => handleEditWorkSample(index)}
            />
          </motion.div>
        ))}
      </Box>

      {/* ADD MODAL */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Box sx={modalStyle}>
          <WorkSampleForm onSave={handleSaveNew} onCancel={() => setOpenAddModal(false)} />
        </Box>
      </Modal>

      {/* EDIT MODAL */}
      <EditWorkSample
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        data={editIndex !== null ? workSamples[editIndex] : null}
        onSave={handleUpdateSample}
      />
    </Box>
  );
};

export default Portfolio;
