import {
  Box,
  TextField,
  Avatar,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import BottomButton from "@/features/WorkerForm/Mobile/Components/BottomButton";
import TopProgressBar from "@/features/WorkerForm/Mobile/Components/TopProgressBar";
import { usePersonalInfoForm, sanitizeInput } from "../utils/workerFormLogic";
import { GENDER_OPTIONS } from "../utils/constants";

const WorkerForm1 = ({ formData, updateFormData, next, back }) => {
  const { personal = {} } = formData;
  const { errors, touched, handleBlur, validatePersonalInfo } =
    usePersonalInfoForm(formData, updateFormData);

  const handleNext = () => {
    const isValid = validatePersonalInfo({
      aadhaar: personal.aadhaar,
      dob: personal.dob,
      gender: personal.gender,
    });
    if (isValid) next();
  };

  const handleChange = (field, value) => {
    updateFormData("personal", { ...personal, [field]: value });
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
          activeStep={0}
          onBack={back}
          pgnum="1/7"
          title="Tell us more"
        />

        <Box display="flex" justifyContent="center" mb={3}>
          <IconButton color="primary" component="label">
            <Avatar
              src={personal.imageUrl || ""}
              sx={{
                width: { xs: 100, sm: 120 },
                height: { xs: 100, sm: 120 },
                bgcolor: "#e0e0e0",
                color: "gray",
                fontSize: { xs: "2rem", sm: "2.5rem" },
              }}
            />
          </IconButton>
        </Box>

        <TextField
          label="Full Name"
          placeholder="Enter your full name"
          fullWidth
          value={personal.fullName || ""}
          disabled
          sx={{ mb: 3 }}
        />

        <TextField
          label="Aadhaar Number"
          placeholder="Enter your Aadhaar number"
          fullWidth
          value={personal.aadhaar || ""}
          onChange={(e) =>
            handleChange(
              "aadhaar",
              sanitizeInput.numericOnly(e.target.value, 12)
            )
          }
          onBlur={() => handleBlur("aadhaar", personal.aadhaar)}
          error={touched.aadhaar && !!errors.aadhaar}
          helperText={touched.aadhaar && errors.aadhaar}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Date of Birth"
          type="date"
          fullWidth
          value={personal.dob || ""}
          onChange={(e) => handleChange("dob", e.target.value)}
          onBlur={() => handleBlur("dob", personal.dob)}
          InputLabelProps={{ shrink: true }}
          error={touched.dob && !!errors.dob}
          helperText={touched.dob && errors.dob}
          sx={{ mb: 3 }}
        />

        <FormControl
          fullWidth
          error={touched.gender && !!errors.gender}
          sx={{ mb: 3 }}
        >
          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            label="Gender"
            value={personal.gender || ""}
            onChange={(e) => handleChange("gender", e.target.value)}
            onBlur={() => handleBlur("gender", personal.gender)}
          >
            {GENDER_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {touched.gender && errors.gender && (
            <FormHelperText>{errors.gender}</FormHelperText>
          )}
        </FormControl>
      </Box>

      <BottomButton handleNext={handleNext} />
    </Box>
  );
};

export default WorkerForm1;
