import { Box, Button } from "@mui/material";
import React from "react";

export default function FormNavigation({ activeStep, steps, handleBack, handleNext, theme }) {
  return (
    <Box sx={{ px: 1, py: 3, display: "flex", gap: 2 }}>
      {activeStep > 0 && (
        <Button
          variant="outlined"
          onClick={handleBack}
          sx={{
            flex: 1,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          Back
        </Button>
      )}
      <Button
        variant="contained"
        fullWidth
        onClick={handleNext}
        sx={{
          flex: 1,
          bgcolor: theme.palette.primary.main,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          ":hover": { bgcolor: theme.palette.primary.dark },
        }}
      >
        {activeStep === steps.length - 1 ? "Submit" : "Save & Next"}
      </Button>
    </Box>
  );
}
