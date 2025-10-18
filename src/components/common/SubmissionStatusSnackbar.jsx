import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SubmissionStatusSnackbar = ({ submissionStatus, onClose }) => {
  if (!submissionStatus.success && !submissionStatus.error) return null;

  return (
    <Snackbar
      open={submissionStatus.success || !!submissionStatus.error}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ mt: 1 }}
    >
      {submissionStatus.success ? (
        <Alert severity="success" sx={{ width: "100%" }}>
          Submitted successfully!
        </Alert>
      ) : submissionStatus.error ? (
        <Alert severity="error" sx={{ width: "100%" }}>
          {submissionStatus.error}
        </Alert>
      ) : null}
    </Snackbar>
  );
};

export default SubmissionStatusSnackbar;
