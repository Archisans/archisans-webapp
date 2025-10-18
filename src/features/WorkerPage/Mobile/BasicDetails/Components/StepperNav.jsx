import { Box, Stepper, Step, StepLabel } from "@mui/material";
import React from "react";

export default function StepperNav({ activeStep, steps }) {
  return (
    <Box sx={{ px: 2, mt: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": { fontSize: "0.5rem" },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
