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
import BottomButton from "@/features/WorkerForm/Mobile/components/BottomButton";
import TopProgressBar from "@/features/WorkerForm/Mobile/components/TopProgressBar";
import { usePersonalInfoForm, sanitizeInput } from "../utils/workerFormLogic";
import { GENDER_OPTIONS } from "../utils/constants";
import { Camera } from "lucide-react";
import { useRef } from "react";

const WorkerForm1 = ({ formData, updateFormData, next, back }) => {
  const fileInputRef = useRef(null);

  const { personal = {} } = formData;
  const { errors, touched, handleBlur, validatePersonalInfo } =
    usePersonalInfoForm(formData, updateFormData);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      updateFormData("personal", {
        ...personal,
        imageUrl: e.target.result,
        file: file,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    const isValid = validatePersonalInfo({
      fullName: personal.fullName,
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

        {/* Avatar + camera icon */}
        <Box display="flex" justifyContent="center" mb={5}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              src={personal.imageUrl}
              alt="Profile"
              sx={{
                width: 110,
                height: 110,
                border: "3px solid #fff",
              }}
            />

            <IconButton
              onClick={openFilePicker}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                width: 34,
                height: 34,
                borderRadius: "50%",
                padding: 0,
                boxShadow: 2,
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <Camera size={18} strokeWidth={2} />
            </IconButton>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleProfileImageChange}
            />
          </Box>
        </Box>

        {/* Full Name */}
        <TextField
          label="Full Name"
          placeholder="Enter your full name"
          fullWidth
          value={personal.fullName || ""}
          onChange={(e) =>
            handleChange("fullName", sanitizeInput.fullName(e.target.value))
          }
          onBlur={() => handleBlur("fullName", personal.fullName)}
          error={touched.fullName && !!errors.fullName}
          helperText={touched.fullName && errors.fullName}
          sx={{ mb: 3 }}
        />

        {/* Aadhaar */}
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

        {/* DOB */}
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

        {/* Gender */}
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
