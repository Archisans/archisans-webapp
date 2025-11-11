import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputAdornment,
  FormHelperText,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import BottomButton from "@/features/WorkerForm/Mobile/components/BottomButton";
import TopProgressBar from "@/features/WorkerForm/Mobile/components/TopProgressBar";
import {
  formatExperienceLabel,
  useExperienceForm,
} from "../utils/workerFormLogic";
import { EXPERIENCE_YEARS } from "../utils/constants";

const WorkerForm7 = ({
  formData,
  updateFormData,
  onSubmit,
  back,
  submissionStatus,
}) => {
  const { error, setError, buildExperienceData, validateExperience } =
    useExperienceForm(formData);
  const [professions, setProfessions] = useState(formData.professions || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceChange = (catIndex, srvIndex, field, value) => {
    const updated = [...professions];
    updated[catIndex].services[srvIndex] = {
      ...updated[catIndex].services[srvIndex],
      [field]: value,
    };
    setProfessions(updated);
    setError("");
  };

  const handleNext = async () => {
    const experienceData = buildExperienceData(professions);
    if (validateExperience(experienceData)) {
      updateFormData("professions", professions);
      setIsSubmitting(true);
      try {
        await onSubmit();
      } finally {
        setIsSubmitting(false);
      }
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
        position: "relative",
      }}
    >
      {/* Blur Overlay */}
      <Backdrop
        open={isSubmitting}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          flexDirection: "column",
        }}
      >
        <CircularProgress color="primary" />
        <Typography
          sx={{
            mt: 2,
            fontWeight: 600,
            color: "#0a0a0a",
            fontSize: "1rem",
          }}
        >
          Please wait...
        </Typography>
      </Backdrop>

      <Box>
        <TopProgressBar
          activeStep={6}
          onBack={back}
          pgnum="7/7"
          title="Your Experience"
        />

        <Box sx={{ borderRadius: 1, mb: 3 }}>
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
          disabled={submissionStatus.loading || isSubmitting}
          label="Submit"
        />
      </Box>
    </Box>
  );
};

export default WorkerForm7;
