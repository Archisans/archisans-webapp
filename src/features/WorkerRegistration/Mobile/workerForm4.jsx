import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import BottomButton from "@/features/WorkerRegistration/Mobile/components/BottomButton";
import TopProgressBar from "@/features/WorkerRegistration/Mobile/components/TopProgressBar";
import {
  formatExperienceLabel,
  useExperienceForm,
} from "../utils/workerFormLogic";
import { EXPERIENCE_YEARS, RATE_BASIS_OPTIONS } from "../utils/constants";

const WorkerForm4 = ({
  formData,
  updateFormData,
  onSubmit,
  back,
  submissionStatus,
}) => {
  const { error, setError, buildExperienceData, validateExperience } =
    useExperienceForm(formData);
  const [professions, setProfessions] = useState(formData.professions || []);

  const handleServiceChange = (catIndex, srvIndex, field, value) => {
    const updated = [...professions];
    updated[catIndex].services[srvIndex] = {
      ...updated[catIndex].services[srvIndex],
      [field]: value,
    };
    setProfessions(updated);
    setError("");
  };

  const handleNext = () => {
    const experienceData = buildExperienceData(professions);
    if (validateExperience(experienceData)) {
      updateFormData("professions", professions);
      onSubmit();
    }
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
        pb: 10,
      }}
    >
      <Box>
        <TopProgressBar
          activeStep={3}
          onBack={back}
          pgnum="4/4"
          title="Your Experience & Rates"
        />

        <Box
          sx={{
            borderRadius: 1,
            mb: 3,
          }}
        >
          {professions.map((prof, catIndex) => (
            <Box key={prof.categoryId} sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}
              >
                {prof.categoryTitle}
              </Typography>

              {prof.services.map((srv, srvIndex) => (
                <Box key={srv.id} sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {srv.title}
                  </Typography>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select
                      value={srv.experience ?? ""}
                      displayEmpty
                      onChange={(e) =>
                        handleServiceChange(
                          catIndex,
                          srvIndex,
                          "experience",
                          e.target.value
                        )
                      }
                      sx={{ borderRadius: 1, backgroundColor: "#fff" }}
                    >
                      <MenuItem value="" disabled>
                        Select experience
                      </MenuItem>
                      {EXPERIENCE_YEARS.map((year) => (
                        <MenuItem key={year} value={year}>
                          {formatExperienceLabel(year)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                      placeholder="Base rate"
                      type="number"
                      value={srv.rate ?? ""}
                      onChange={(e) =>
                        handleServiceChange(
                          catIndex,
                          srvIndex,
                          "rate",
                          e.target.value
                        )
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                      sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1,
                          backgroundColor: "#fff",
                        },
                      }}
                    />
                    <FormControl sx={{ minWidth: 140, flexShrink: 0 }}>
                      <Select
                        value={srv.rateBasis ?? ""}
                        displayEmpty
                        onChange={(e) =>
                          handleServiceChange(
                            catIndex,
                            srvIndex,
                            "rateBasis",
                            e.target.value
                          )
                        }
                        sx={{ borderRadius: 1, backgroundColor: "#fff" }}
                      >
                        <MenuItem value="" disabled>
                          Select rate type
                        </MenuItem>
                        {RATE_BASIS_OPTIONS.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              ))}

              {catIndex !== professions.length - 1 && (
                <Box sx={{ borderBottom: "1px solid #bdb7b7ff", my: 3 }} />
              )}
            </Box>
          ))}

          {error && (
            <FormHelperText sx={{ color: "error.main", mt: 1 }}>
              {error}
            </FormHelperText>
          )}
        </Box>

        <BottomButton
          handleNext={handleNext}
          disabled={submissionStatus.loading}
          label={submissionStatus.loading ? "Submitting..." : "Submit"}
        />
      </Box>
    </Box>
  );
};

export default WorkerForm4;
