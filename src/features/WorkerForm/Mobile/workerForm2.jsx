import { Box, TextField } from "@mui/material";
import BottomButton from "@/features/WorkerForm/Mobile/components/BottomButton";
import TopProgressBar from "@/features/WorkerForm/Mobile/components/TopProgressBar";
import { useContactInfoForm, sanitizeInput } from "../utils/workerFormLogic";

const WorkerForm2 = ({ formData, updateFormData, next, back }) => {
  const contact = formData.contact || {};

  const { errors, touched, handleBlur, validateContactInfo } =
    useContactInfoForm(formData, updateFormData);

  const handleChange = (field, value) => {
    updateFormData("contact", {
      ...contact,
      [field]: value,
    });
  };

  const handleNext = () => {
    const isValid = validateContactInfo({
      altPhone: contact.altPhone,
      email: contact.email,
      address: contact.address,
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
          activeStep={1}
          onBack={back}
          pgnum="2/7"
          title="Contact Info"
        />

        <TextField
          label="Phone Number"
          placeholder="Enter your phone number"
          fullWidth
          value={contact.phone?.slice(3) || ""}
          disabled
          sx={{ mb: 3 }}
        />

        <TextField
          label="Alternate Phone Number"
          placeholder="Enter your alternate phone number (10-digit)"
          fullWidth
          value={
            contact.altPhone
              ? contact.altPhone.startsWith("+91")
                ? contact.altPhone.slice(3)
                : contact.altPhone
              : ""
          }
          onChange={(e) =>
            handleChange(
              "altPhone",
              sanitizeInput.numericOnly(e.target.value, 10)
            )
          }
          onBlur={() => handleBlur("altPhone", contact.altPhone)}
          error={touched.altPhone && !!errors.altPhone}
          helperText={touched.altPhone && errors.altPhone}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Email Address"
          placeholder="Enter your email address"
          fullWidth
          type="email"
          value={contact.email || ""}
          onChange={(e) =>
            handleChange("email", sanitizeInput.email(e.target.value))
          }
          onBlur={() => handleBlur("email", contact.email)}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ mb: 3 }}
        />

        <TextField
          label="Permanent Address"
          placeholder="Enter your permanent address"
          fullWidth
          multiline
          rows={3}
          value={contact.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          onBlur={() => handleBlur("address", contact.address)}
          error={touched.address && !!errors.address}
          helperText={touched.address && errors.address}
          sx={{ mb: 3 }}
        />
      </Box>

      <BottomButton handleNext={handleNext} />
    </Box>
  );
};

export default WorkerForm2;
