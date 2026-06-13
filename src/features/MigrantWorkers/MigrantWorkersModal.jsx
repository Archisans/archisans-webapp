import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Paper,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Close, CheckCircle } from "@mui/icons-material";
import {
  initialFormState,
  validateForm,
  validateField,
  toggleArrayValue,
  getHelperText,
  hasError,
} from "./utils/migrantWorkerFormLogic";
import { deepBlue, grey, red, amber, green } from "@/config/Theme/config/color";
import { useFormSubmission } from "@/hooks/useFormSubmission";

const CLR = {
  bg: grey[100],
  surface: "#FFFFFF",
  border: grey[300],
  sectionHeader: deepBlue[900],
  sectionBg: deepBlue[50],
  accent: deepBlue[500],
  accentLight: deepBlue[50],
  text: deepBlue[900],
  muted: grey[600],
  error: red[700],
  success: green?.[500] ?? "#2E7D32",
  submitGradient: `linear-gradient(135deg, ${deepBlue[500]} 0%, ${deepBlue[700]} 100%)`,
};

function SectionHeader({ number, title }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mt: 5,
        mb: 3,
        pb: 2,
        borderBottom: `2px solid ${CLR.border}`,
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "8px",
          background: CLR.accent,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        {number}
      </Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: CLR.sectionHeader,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

function FieldLabel({ children, required }) {
  return (
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: 13,
        color: CLR.muted,
        mb: 1.5,
        letterSpacing: "0.03em",
      }}
    >
      {children}
      {required && (
        <Box component="span" sx={{ color: CLR.error, ml: 0.5 }}>
          *
        </Box>
      )}
    </Typography>
  );
}

function YesNoGroup({ value, onChange }) {
  return (
    <FormGroup row sx={{ gap: 1 }}>
      {[true, false].map((opt) => (
        <FormControlLabel
          key={String(opt)}
          control={
            <Checkbox
              checked={value === opt}
              onChange={() => onChange(opt)}
              size="small"
              sx={{ color: CLR.accent, "&.Mui-checked": { color: CLR.accent } }}
            />
          }
          label={
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {opt ? "Yes" : "No"}
            </Typography>
          }
        />
      ))}
    </FormGroup>
  );
}

function CheckboxGroup({ options, value = [], onChange, columns = 4 }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 0.5,
      }}
    >
      {options.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={value.includes(item)}
              onChange={() => onChange(item)}
              size="small"
              sx={{ color: CLR.accent, "&.Mui-checked": { color: CLR.accent } }}
            />
          }
          label={<Typography sx={{ fontSize: 13.5 }}>{item}</Typography>}
        />
      ))}
    </Box>
  );
}

function inputSx(error) {
  return {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      fontSize: 14,
      backgroundColor: CLR.surface,
      "& fieldset": {
        borderColor: error ? CLR.error : CLR.border,
      },
      "&:hover fieldset": {
        borderColor: error ? CLR.error : CLR.accent,
      },
      "&.Mui-focused fieldset": {
        borderColor: error ? CLR.error : CLR.accent,
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: 13.5,
      color: CLR.muted,
    },
  };
}

function SuccessScreen({ onClose }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        px: 4,
        py: { xs: 6, md: 10 },
        minHeight: "60vh",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          background: `${CLR.success}14`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `2px solid ${CLR.success}`,
            opacity: 0,
            animation: "successRing 0.9s ease-out 0.15s",
          },
          "@keyframes successRing": {
            "0%": { transform: "scale(0.8)", opacity: 0.6 },
            "100%": { transform: "scale(1.35)", opacity: 0 },
          },
        }}
      >
        <CheckCircle
          sx={{
            fontSize: 56,
            color: CLR.success,
            animation:
              "successPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both",
            "@keyframes successPop": {
              "0%": { transform: "scale(0)", opacity: 0 },
              "60%": { transform: "scale(1.15)", opacity: 1 },
              "100%": { transform: "scale(1)", opacity: 1 },
            },
          }}
        />
      </Box>

      <Typography
        sx={{ fontWeight: 800, fontSize: 22, color: CLR.text, mb: 1 }}
      >
        Registration submitted
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          color: CLR.muted,
          maxWidth: 380,
          lineHeight: 1.7,
          mb: 4,
        }}
      >
        Thank you for registering with Archisans. Our team will review your
        details and reach out shortly.
      </Typography>

      <Button
        onClick={onClose}
        sx={{
          textTransform: "none",
          fontWeight: 700,
          fontSize: 14,
          borderRadius: "8px",
          px: 4,
          py: 1.25,
          color: "#fff",
          background: CLR.submitGradient,
          "&:hover": {
            background: "linear-gradient(135deg, #2444CC 0%, #152898 100%)",
          },
        }}
      >
        Done
      </Button>
    </Box>
  );
}

export default function MigrantWorkersFormModal({ open, onClose }) {
  const [touched, setTouched] = useState({});

  const {
    formData: form,
    setFormData: setForm,
    errors,
    setErrors,
    errorMessage,
    isSubmitting,
    isSubmitted,
    handleSubmit,
    resetForm,
  } = useFormSubmission({
    formType: "migrant_worker",
    initialFormData: initialFormState,
    validateForm,
    onSuccess: () => {},
  });

  const set = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, val) }));
    }
  };

  const blur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, form[field]),
    }));
  };

  const toggleArr = (field) => (item) => {
    const next = toggleArrayValue(form[field], item);
    setForm((prev) => ({ ...prev, [field]: next }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, next) }));
    }
  };

  const setYesNo = (field) => (val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, val) }));
  };

  const setWorkerQty = (role) => (e) => {
    const next = { ...form.workerQuantities, [role]: e.target.value };
    setForm((prev) => ({ ...prev, workerQuantities: next }));
  };

  const errTxt = (field) => getHelperText(errors, touched, field);
  const isErr = (field) => hasError(errors, touched, field);

  const handleSuccessClose = () => {
    resetForm();
    setTouched({});
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "96%",
          maxWidth: 1100,
          maxHeight: "94vh",
          overflowY: "auto",
          background: CLR.bg,
          borderRadius: "12px",
          mx: "auto",
          mt: "2vh",
          outline: "none",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          position: "relative",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: CLR.surface,
            borderBottom: `1px solid ${CLR.border}`,
            borderRadius: "12px 12px 0 0",
            px: 4,
            py: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  color: CLR.accent,
                }}
              >
                ARCHISANS
              </Typography>
              <Chip
                label="Builder Registration"
                size="small"
                sx={{
                  background: CLR.accentLight,
                  color: CLR.accent,
                  fontWeight: 600,
                  fontSize: 11,
                  height: 22,
                }}
              />
            </Box>
            <Typography
              sx={{ fontSize: 13.5, color: CLR.muted, maxWidth: 560 }}
            >
              Registration form for builders and contractors willing to recruit
              or absorb migrant workers through the Archisans platform.
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              border: `1px solid ${CLR.border}`,
              borderRadius: "8px",
              ml: 2,
              mt: 0.5,
            }}
          >
            <Close sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Body: success screen OR form */}
        {isSubmitted ? (
          <SuccessScreen onClose={handleSuccessClose} />
        ) : (
          <Box sx={{ px: 4, pb: 4 }}>
            {/* Section 1 */}
            <SectionHeader number="1" title="Company / Builder Details" />

            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company / Firm Name"
                  required
                  value={form.companyName}
                  onChange={set("companyName")}
                  onBlur={blur("companyName")}
                  error={isErr("companyName")}
                  helperText={errTxt("companyName")}
                  sx={inputSx(isErr("companyName"))}
                />
              </Grid>

              <Grid item xs={12}>
                <FieldLabel required>Type of Business</FieldLabel>
                <CheckboxGroup
                  options={[
                    "Builder",
                    "Contractor",
                    "Interior Firm",
                    "Construction Company",
                    "Infrastructure Company",
                    "Real Estate Developer",
                    "Other",
                  ]}
                  value={form.businessTypes}
                  onChange={toggleArr("businessTypes")}
                  columns={4}
                />
                {isErr("businessTypes") && (
                  <FormHelperText error sx={{ mt: 0.5 }}>
                    {errTxt("businessTypes")}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Proprietor / Managing Director Name"
                  required
                  value={form.directorName}
                  onChange={set("directorName")}
                  onBlur={blur("directorName")}
                  error={isErr("directorName")}
                  helperText={errTxt("directorName")}
                  sx={inputSx(isErr("directorName"))}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Office Address"
                  required
                  value={form.officeAddress}
                  onChange={set("officeAddress")}
                  onBlur={blur("officeAddress")}
                  error={isErr("officeAddress")}
                  helperText={errTxt("officeAddress")}
                  sx={inputSx(isErr("officeAddress"))}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="District"
                  required
                  value={form.district}
                  onChange={set("district")}
                  onBlur={blur("district")}
                  error={isErr("district")}
                  helperText={errTxt("district")}
                  sx={inputSx(isErr("district"))}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="State"
                  required
                  value={form.state}
                  onChange={set("state")}
                  onBlur={blur("state")}
                  error={isErr("state")}
                  helperText={errTxt("state")}
                  sx={inputSx(isErr("state"))}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="PIN Code"
                  required
                  value={form.pinCode}
                  onChange={set("pinCode")}
                  onBlur={blur("pinCode")}
                  error={isErr("pinCode")}
                  helperText={errTxt("pinCode")}
                  inputProps={{ maxLength: 6 }}
                  sx={inputSx(isErr("pinCode"))}
                />
              </Grid>
            </Grid>

            {/* Section 2 */}
            <SectionHeader number="2" title="Contact Details" />

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Person Name"
                  required
                  value={form.contactPersonName}
                  onChange={set("contactPersonName")}
                  onBlur={blur("contactPersonName")}
                  error={isErr("contactPersonName")}
                  helperText={errTxt("contactPersonName")}
                  sx={inputSx(isErr("contactPersonName"))}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  required
                  value={form.designation}
                  onChange={set("designation")}
                  onBlur={blur("designation")}
                  error={isErr("designation")}
                  helperText={errTxt("designation")}
                  sx={inputSx(isErr("designation"))}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  required
                  value={form.mobileNumber}
                  onChange={set("mobileNumber")}
                  onBlur={blur("mobileNumber")}
                  error={isErr("mobileNumber")}
                  helperText={errTxt("mobileNumber")}
                  inputProps={{ maxLength: 10 }}
                  sx={inputSx(isErr("mobileNumber"))}
                />
              </Grid>
            </Grid>

            {/* Section 3 */}
            <SectionHeader number="3" title="Project Details" />

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Current Project Name"
                  required
                  value={form.currentProjectName}
                  onChange={set("currentProjectName")}
                  onBlur={blur("currentProjectName")}
                  error={isErr("currentProjectName")}
                  helperText={errTxt("currentProjectName")}
                  sx={inputSx(isErr("currentProjectName"))}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Project Location"
                  required
                  value={form.projectLocation}
                  onChange={set("projectLocation")}
                  onBlur={blur("projectLocation")}
                  error={isErr("projectLocation")}
                  helperText={errTxt("projectLocation")}
                  sx={inputSx(isErr("projectLocation"))}
                />
              </Grid>

              <Grid item xs={12}>
                <FieldLabel required>Type of Project</FieldLabel>
                <CheckboxGroup
                  options={[
                    "Residential",
                    "Commercial",
                    "Villa",
                    "Apartment",
                    "Industrial",
                    "Government",
                    "Interior Fit-Out",
                    "Other",
                  ]}
                  value={form.projectTypes}
                  onChange={toggleArr("projectTypes")}
                  columns={4}
                />
                {isErr("projectTypes") && (
                  <FormHelperText error sx={{ mt: 0.5 }}>
                    {errTxt("projectTypes")}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Estimated Project Duration"
                      required
                      value={form.estimatedDuration}
                      onChange={set("estimatedDuration")}
                      onBlur={blur("estimatedDuration")}
                      error={isErr("estimatedDuration")}
                      helperText={errTxt("estimatedDuration")}
                      sx={inputSx(isErr("estimatedDuration"))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Approximate Number of Workers Required"
                      required
                      value={form.workersRequired}
                      onChange={set("workersRequired")}
                      onBlur={blur("workersRequired")}
                      error={isErr("workersRequired")}
                      helperText={errTxt("workersRequired")}
                      inputProps={{ inputMode: "numeric" }}
                      sx={inputSx(isErr("workersRequired"))}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Section 4 */}
            <SectionHeader number="4" title="Worker Requirements" />

            <Typography sx={{ fontSize: 13, color: CLR.muted, mb: 2 }}>
              Enter the quantity required for each worker type. Leave blank if
              not needed.
            </Typography>

            <Grid container spacing={2}>
              {Object.keys(form.workerQuantities).map((role) => (
                <Grid item xs={12} sm={6} md={4} key={role}>
                  <TextField
                    fullWidth
                    label={role}
                    value={form.workerQuantities[role]}
                    onChange={setWorkerQty(role)}
                    inputProps={{ inputMode: "numeric", min: 0 }}
                    size="small"
                    sx={inputSx(false)}
                  />
                </Grid>
              ))}
            </Grid>
            {isErr("workerQuantities") &&
              typeof errors.workerQuantities === "string" && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.workerQuantities}
                </FormHelperText>
              )}

            {/* Section 5 */}
            <SectionHeader number="5" title="Facilities Provided to Workers" />

            <Grid container spacing={3}>
              {[
                { label: "Accommodation", field: "accommodation" },
                { label: "Food / Mess Facility", field: "foodFacility" },
                { label: "Transportation", field: "transportation" },
              ].map(({ label, field }) => (
                <Grid item xs={12} md={4} key={field}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      border: `1px solid ${isErr(field) ? CLR.error : CLR.border}`,
                      borderRadius: "8px",
                      background: CLR.surface,
                    }}
                  >
                    <FieldLabel required>{label}</FieldLabel>
                    <YesNoGroup
                      value={form[field]}
                      onChange={setYesNo(field)}
                    />
                    {isErr(field) && (
                      <FormHelperText error>{errTxt(field)}</FormHelperText>
                    )}
                  </Paper>
                </Grid>
              ))}

              <Grid item xs={12}>
                <FieldLabel>Safety Equipment Provided</FieldLabel>
                <CheckboxGroup
                  options={[
                    "Helmet",
                    "Shoes",
                    "Gloves",
                    "Safety Belt",
                    "Uniform",
                    "Other",
                  ]}
                  value={form.safetyEquipment}
                  onChange={toggleArr("safetyEquipment")}
                  columns={6}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Weekly Off"
                      required
                      value={form.weeklyOff}
                      onChange={set("weeklyOff")}
                      onBlur={blur("weeklyOff")}
                      error={isErr("weeklyOff")}
                      helperText={errTxt("weeklyOff")}
                      sx={inputSx(isErr("weeklyOff"))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Working Hours"
                      required
                      value={form.workingHours}
                      onChange={set("workingHours")}
                      onBlur={blur("workingHours")}
                      error={isErr("workingHours")}
                      helperText={errTxt("workingHours")}
                      sx={inputSx(isErr("workingHours"))}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Section 6 */}
            <SectionHeader number="6" title="Salary & Payment Details" />

            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <FieldLabel required>Salary Structure</FieldLabel>
                <CheckboxGroup
                  options={[
                    "Daily Wage",
                    "Weekly Payment",
                    "Monthly Salary",
                    "Contract Basis",
                  ]}
                  value={form.salaryStructures}
                  onChange={toggleArr("salaryStructures")}
                  columns={4}
                />
                {isErr("salaryStructures") && (
                  <FormHelperText error sx={{ mt: 0.5 }}>
                    {errTxt("salaryStructures")}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Expected Wage Range"
                      required
                      value={form.wageRange}
                      onChange={set("wageRange")}
                      onBlur={blur("wageRange")}
                      error={isErr("wageRange")}
                      helperText={errTxt("wageRange")}
                      sx={inputSx(isErr("wageRange"))}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Overtime Policy"
                      value={form.overtimePolicy}
                      onChange={set("overtimePolicy")}
                      sx={inputSx(false)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <FieldLabel required>Payment Method</FieldLabel>
                <CheckboxGroup
                  options={["Bank Transfer", "Cash", "UPI", "Other"]}
                  value={form.paymentMethods}
                  onChange={toggleArr("paymentMethods")}
                  columns={4}
                />
                {isErr("paymentMethods") && (
                  <FormHelperText error sx={{ mt: 0.5 }}>
                    {errTxt("paymentMethods")}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>

            {/* Section 7 */}
            <SectionHeader number="7" title="Legal & Compliance" />

            <Grid container spacing={3}>
              {[
                {
                  label:
                    "Does your company comply with labour and safety regulations?",
                  field: "labourCompliance",
                },
                {
                  label: "Are workers covered under insurance?",
                  field: "workerInsurance",
                },
              ].map(({ label, field }) => (
                <Grid item xs={12} md={6} key={field}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      border: `1px solid ${isErr(field) ? CLR.error : CLR.border}`,
                      borderRadius: "8px",
                      background: CLR.surface,
                    }}
                  >
                    <FieldLabel required>{label}</FieldLabel>
                    <YesNoGroup
                      value={form[field]}
                      onChange={setYesNo(field)}
                    />
                    {isErr(field) && (
                      <FormHelperText error>{errTxt(field)}</FormHelperText>
                    )}
                  </Paper>
                </Grid>
              ))}

              <Grid item xs={12}>
                <FieldLabel required>PF / ESI Availability</FieldLabel>
                <CheckboxGroup
                  options={["PF", "ESI", "Both", "Not Applicable"]}
                  value={form.pfEsiOptions}
                  onChange={toggleArr("pfEsiOptions")}
                  columns={4}
                />
                {isErr("pfEsiOptions") && (
                  <FormHelperText error sx={{ mt: 0.5 }}>
                    {errTxt("pfEsiOptions")}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>

            {/* Section 8: Declaration */}
            <SectionHeader number="8" title="Declaration" />

            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: `1px solid ${isErr("declarationAgreed") ? CLR.error : CLR.border}`,
                borderRadius: "8px",
                background: CLR.surface,
              }}
            >
              <Typography
                sx={{ fontSize: 13.5, color: CLR.text, lineHeight: 1.7, mb: 2 }}
              >
                I / We hereby confirm that the information provided in this form
                is true and correct to the best of our knowledge. We agree to
                recruit migrant workers through the Archisans platform under
                lawful and ethical employment practices, in compliance with all
                applicable labour laws and regulations.
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.declarationAgreed}
                    onChange={(e) => {
                      const val = e.target.checked;
                      setForm((prev) => ({ ...prev, declarationAgreed: val }));
                      setTouched((prev) => ({
                        ...prev,
                        declarationAgreed: true,
                      }));
                      setErrors((prev) => ({
                        ...prev,
                        declarationAgreed: validateField(
                          "declarationAgreed",
                          val,
                        ),
                      }));
                    }}
                    sx={{
                      color: CLR.accent,
                      "&.Mui-checked": { color: CLR.accent },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 13.5, fontWeight: 600 }}>
                    I have read and agree to the above declaration.
                  </Typography>
                }
              />
              {isErr("declarationAgreed") && (
                <FormHelperText error sx={{ ml: 4 }}>
                  {errTxt("declarationAgreed")}
                </FormHelperText>
              )}
            </Paper>

            {/* Submission error */}
            {errorMessage && (
              <Alert
                severity="error"
                sx={{
                  mt: 3,
                  borderRadius: "8px",
                  fontSize: 13.5,
                }}
              >
                {errorMessage}
              </Alert>
            )}

            {/* Submit */}
            <Button
              fullWidth
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{
                mt: 4,
                height: 52,
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: 15,
                textTransform: "none",
                background: CLR.submitGradient,
                color: "#fff",
                letterSpacing: "0.02em",
                boxShadow: "0 4px 16px rgba(43,78,230,0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #2444CC 0%, #152898 100%)",
                  boxShadow: "0 6px 20px rgba(43,78,230,0.36)",
                },
                "&.Mui-disabled": {
                  background: CLR.submitGradient,
                  color: "#fff",
                  opacity: 0.75,
                },
              }}
            >
              {isSubmitting && (
                <CircularProgress
                  size={18}
                  thickness={5}
                  sx={{ color: "#fff" }}
                />
              )}
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
