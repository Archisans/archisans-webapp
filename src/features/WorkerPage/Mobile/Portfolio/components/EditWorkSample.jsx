import React from "react";
import { Modal, Box } from "@mui/material";
import WorkSampleForm from "./WorkSampleForm";

const EditWorkSample = ({ open, onClose, data, onSave }) => (
  <Modal
    open={open}
    onClose={onClose}
    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <Box sx={{ width: "95%", maxHeight: "90vh", overflowY: "auto", background: "white", borderRadius: 2, p:1.5 }}>
      <WorkSampleForm existingData={data} onSave={onSave} onCancel={onClose} />
    </Box>
  </Modal>
);

export default EditWorkSample;
