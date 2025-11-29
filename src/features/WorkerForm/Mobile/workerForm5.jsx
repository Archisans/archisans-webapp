import { Box, TextField, InputAdornment, Typography } from "@mui/material";
import BottomButton from "@/features/WorkerForm/Mobile/components/BottomButton";
import TopProgressBar from "@/features/WorkerForm/Mobile/components/TopProgressBar";
import { sanitizeInput, useCompanyForm } from "../utils/workerFormLogic";
import { Business, Assignment, Receipt, Schedule } from "@mui/icons-material";
import TimeDropdownsMobile from "./TimeDropDown";
import { useState } from "react";

const WorkerForm5 = ({ formData, updateFormData, next, back }) => {
  const company = formData.company || {};

  const [startTime, setStartTime] = useState({ hour: "", minute: "", period: "" });
  const [endTime, setEndTime] = useState({ hour: "", minute: "", period: "" });
  const [timeError, setTimeError] = useState("");

  const { errors, handleBlur, validateCompanyInfo } = useCompanyForm(
    formData,
    updateFormData
  );

  const handleChange = (field, value) => {
    updateFormData("company", { ...company, [field]: value });
  };

  const handleNext = () => {
    const isValid = validateCompanyInfo({
      companyName: company.companyName,
      workPermitNumber: company.workPermitNumber,
      gstNumber: company.gstNumber,
      workingHours: company.workingHours,
    });
    if (isValid) next();
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
          activeStep={4}
          onBack={back}
          pgnum="5/7"
          title="Company Information (Optional)"
        />

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", mb: 3, textAlign: "center" }}
          >
            Fill this section only if you represent a company or registered
            business.
          </Typography>

          <TextField
            label="Company Name"
            placeholder="Enter company name"
            fullWidth
            value={company.companyName || ""}
            onChange={(e) => handleChange("companyName", e.target.value)}
            onBlur={() => handleBlur("companyName", company.companyName)}
            error={!!errors.companyName}
            helperText={errors.companyName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business sx={{ color: "#94a3b8" }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Work Permit Number"
            placeholder="Enter work permit number"
            fullWidth
            value={company.workPermitNumber || ""}
            onChange={(e) =>
              handleChange(
                "workPermitNumber",
                sanitizeInput.alphanumeric(e.target.value)
              )
            }
            onBlur={() =>
              handleBlur("workPermitNumber", company.workPermitNumber)
            }
            error={!!errors.workPermitNumber}
            helperText={errors.workPermitNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Assignment sx={{ color: "#94a3b8" }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField
            label="GST Number"
            placeholder="15-character GST number"
            fullWidth
            value={company.gstNumber || ""}
            onChange={(e) =>
              handleChange(
                "gstNumber",
                sanitizeInput.alphanumeric(e.target.value, 15).toUpperCase()
              )
            }
            onBlur={() => handleBlur("gstNumber", company.gstNumber)}
            inputProps={{ maxLength: 15 }}
            error={!!errors.gstNumber}
            helperText={errors.gstNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Receipt sx={{ color: "#94a3b8" }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

            <TimeDropdownsMobile
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            timeError={timeError}
            setTimeError={setTimeError}
          />
          
        </Box>
      </Box>

      <BottomButton handleNext={handleNext} />
    </Box>
  );
};

export default WorkerForm5;
