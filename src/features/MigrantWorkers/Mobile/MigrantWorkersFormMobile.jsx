import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import MobHeading from "@/components/Mobile/mobileHeading";
import {
  initialFormState,
  validateForm,
  validateField,
  toggleArrayValue,
  getHelperText,
  hasError,
} from "../utils/migrantWorkerFormLogic";
import { deepBlue, grey, red, amber, green } from "@/config/Theme/config/color";
import { useFormSubmission } from "@/hooks/useFormSubmission";

const CLR = {
  bg: grey[100],
  surface: "#FFFFFF",
  border: grey[300],
  sectionHeader: deepBlue[900],
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
        gap: 1.5,
        mt: 4,
        mb: 2,
        pb: 1.5,
        borderBottom: `1.5px solid ${CLR.border}`,
      }}
    >
      <Box
        sx={{
          width: 26,
          height: 26,
          borderRadius: "6px",
          background: CLR.accent,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 12,
          flexShrink: 0,
        }}
      >
        {number}
      </Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.08em",
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
        fontSize: 12,
        color: CLR.muted,
        mb: 1,
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

function inputSx(error) {
  return {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      fontSize: 14,
      backgroundColor: CLR.surface,
      "& fieldset": { borderColor: error ? CLR.error : CLR.border },
      "&:hover fieldset": { borderColor: error ? CLR.error : CLR.accent },
      "&.Mui-focused fieldset": {
        borderColor: error ? CLR.error : CLR.accent,
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputLabel-root": { fontSize: 13, color: CLR.muted },
  };
}

function YesNoToggle({ value, onChange, error }) {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {[true, false].map((opt) => (
        <Box
          key={String(opt)}
          onClick={() => onChange(opt)}
          sx={{
            px: 2.5,
            py: 0.75,
            borderRadius: "20px",
            border: `1.5px solid ${value === opt ? CLR.accent : CLR.border}`,
            background: value === opt ? CLR.accentLight : CLR.surface,
            color: value === opt ? CLR.accent : CLR.muted,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            userSelect: "none",
            transition: "all 0.15s ease",
          }}
        >
          {opt ? "Yes" : "No"}
        </Box>
      ))}
    </Box>
  );
}

function PillCheckboxGroup({ options, value = [], onChange }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
      {options.map((item) => {
        const checked = value.includes(item);
        return (
          <Box
            key={item}
            onClick={() => onChange(item)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 1,
              borderRadius: "8px",
              border: `1.5px solid ${checked ? CLR.accent : CLR.border}`,
              background: checked ? CLR.accentLight : CLR.surface,
              cursor: "pointer",
              userSelect: "none",
              transition: "all 0.15s ease",
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "4px",
                flexShrink: 0,
                border: `1.5px solid ${checked ? CLR.accent : CLR.border}`,
                background: checked ? CLR.accent : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {checked && (
                <Box
                  component="span"
                  sx={{
                    color: "#fff",
                    fontSize: 10,
                    lineHeight: 1,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </Box>
              )}
            </Box>
            <Typography
              sx={{
                fontSize: 12.5,
                fontWeight: checked ? 600 : 400,
                color: checked ? CLR.accent : CLR.text,
                lineHeight: 1.3,
              }}
            >
              {item}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
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
        py: 10,
        minHeight: "80vh",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `${CLR.success}18`,
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
            animation: "ring 0.9s ease-out 0.15s",
          },
          "@keyframes ring": {
            "0%": { transform: "scale(0.8)", opacity: 0.6 },
            "100%": { transform: "scale(1.35)", opacity: 0 },
          },
        }}
      >
        <CheckCircle
          sx={{
            fontSize: 48,
            color: CLR.success,
            animation: "pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
            "@keyframes pop": {
              "0%": { transform: "scale(0)", opacity: 0 },
              "60%": { transform: "scale(1.15)", opacity: 1 },
              "100%": { transform: "scale(1)", opacity: 1 },
            },
          }}
        />
      </Box>
      <Typography
        sx={{ fontWeight: 800, fontSize: 20, color: CLR.text, mb: 1 }}
      >
        Registration submitted
      </Typography>
      <Typography
        sx={{
          fontSize: 13.5,
          color: CLR.muted,
          maxWidth: 280,
          lineHeight: 1.7,
          mb: 5,
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
          px: 5,
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

export default function MigrantWorkersMobile({ onClose }) {
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
    setForm((p) => ({ ...p, [field]: val }));
    if (touched[field])
      setErrors((p) => ({ ...p, [field]: validateField(field, val) }));
  };
  const blur = (field) => () => {
    setTouched((p) => ({ ...p, [field]: true }));
    setErrors((p) => ({ ...p, [field]: validateField(field, form[field]) }));
  };
  const toggleArr = (field) => (item) => {
    const next = toggleArrayValue(form[field], item);
    setForm((p) => ({ ...p, [field]: next }));
    if (touched[field])
      setErrors((p) => ({ ...p, [field]: validateField(field, next) }));
  };
  const setYesNo = (field) => (val) => {
    setForm((p) => ({ ...p, [field]: val }));
    setTouched((p) => ({ ...p, [field]: true }));
    setErrors((p) => ({ ...p, [field]: validateField(field, val) }));
  };
  const setWorkerQty = (role) => (e) => {
    const next = { ...form.workerQuantities, [role]: e.target.value };
    setForm((p) => ({ ...p, workerQuantities: next }));
  };

  const errTxt = (field) => getHelperText(errors, touched, field);
  const isErr = (field) => hasError(errors, touched, field);

  const handleSuccessClose = () => {
    resetForm();
    setTouched({});
    onClose();
  };

  return (
    <Box sx={{ background: CLR.bg, minHeight: "100vh" }}>
      <MobHeading Heading={"Builder Registration"} />

      {/* Page intro */}
      {!isSubmitted && (
        <Box
          sx={{
            background: CLR.surface,
            borderBottom: `1px solid ${CLR.border}`,
            px: 2.5,
            py: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: 17,
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
                fontSize: 10,
                height: 20,
              }}
            />
          </Box>
          <Typography
            sx={{ fontSize: 12, color: CLR.muted, mt: 0.5, lineHeight: 1.6 }}
          >
            Registration for builders and contractors to recruit migrant workers
            through Archisans.
          </Typography>
        </Box>
      )}

      {isSubmitted ? (
        <SuccessScreen onClose={handleSuccessClose} />
      ) : (
        <Box sx={{ px: 2.5, pt: 0.5, pb: 8 }}>
          {/* Section 1 */}
          <SectionHeader number="1" title="Company / Builder Details" />
          <Grid container spacing={2}>
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
              <PillCheckboxGroup
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
              />
              {isErr("businessTypes") && (
                <FormHelperText error sx={{ mt: 0.5 }}>
                  {errTxt("businessTypes")}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
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
                multiline
                rows={2}
                value={form.officeAddress}
                onChange={set("officeAddress")}
                onBlur={blur("officeAddress")}
                error={isErr("officeAddress")}
                helperText={errTxt("officeAddress")}
                sx={inputSx(isErr("officeAddress"))}
              />
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={12}>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
              <PillCheckboxGroup
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
              />
              {isErr("projectTypes") && (
                <FormHelperText error sx={{ mt: 0.5 }}>
                  {errTxt("projectTypes")}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Estimated Duration"
                required
                value={form.estimatedDuration}
                onChange={set("estimatedDuration")}
                onBlur={blur("estimatedDuration")}
                error={isErr("estimatedDuration")}
                helperText={errTxt("estimatedDuration")}
                sx={inputSx(isErr("estimatedDuration"))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Workers Required"
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

          {/* Section 4 */}
          <SectionHeader number="4" title="Worker Requirements" />
          <Typography sx={{ fontSize: 12, color: CLR.muted, mb: 1.5 }}>
            Enter quantity needed. Leave blank if not required.
          </Typography>
          <Grid container spacing={1.5}>
            {Object.keys(form.workerQuantities).map((role) => (
              <Grid item xs={6} key={role}>
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
          <Grid container spacing={2}>
            {[
              { label: "Accommodation", field: "accommodation" },
              { label: "Food / Mess Facility", field: "foodFacility" },
              { label: "Transportation", field: "transportation" },
            ].map(({ label, field }) => (
              <Grid item xs={12} key={field}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.25,
                    px: 0.5,
                    borderBottom: `1px solid ${CLR.border}`,
                  }}
                >
                  <Typography
                    sx={{ fontSize: 13.5, fontWeight: 500, color: CLR.text }}
                  >
                    {label}
                    {
                      <Box
                        component="span"
                        sx={{ color: CLR.error, ml: 0.5, fontSize: 12 }}
                      >
                        *
                      </Box>
                    }
                  </Typography>
                  <YesNoToggle
                    value={form[field]}
                    onChange={setYesNo(field)}
                    error={isErr(field)}
                  />
                </Box>
                {isErr(field) && (
                  <FormHelperText error sx={{ mt: 0.25, ml: 0.5 }}>
                    {errTxt(field)}
                  </FormHelperText>
                )}
              </Grid>
            ))}

            <Grid item xs={12}>
              <FieldLabel>Safety Equipment Provided</FieldLabel>
              <PillCheckboxGroup
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
              />
            </Grid>

            <Grid item xs={6}>
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
            <Grid item xs={6}>
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

          {/* Section 6 */}
          <SectionHeader number="6" title="Salary & Payment Details" />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FieldLabel required>Salary Structure</FieldLabel>
              <PillCheckboxGroup
                options={[
                  "Daily Wage",
                  "Weekly Payment",
                  "Monthly Salary",
                  "Contract Basis",
                ]}
                value={form.salaryStructures}
                onChange={toggleArr("salaryStructures")}
              />
              {isErr("salaryStructures") && (
                <FormHelperText error sx={{ mt: 0.5 }}>
                  {errTxt("salaryStructures")}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Overtime Policy"
                value={form.overtimePolicy}
                onChange={set("overtimePolicy")}
                sx={inputSx(false)}
              />
            </Grid>
            <Grid item xs={12}>
              <FieldLabel required>Payment Method</FieldLabel>
              <PillCheckboxGroup
                options={["Bank Transfer", "Cash", "UPI", "Other"]}
                value={form.paymentMethods}
                onChange={toggleArr("paymentMethods")}
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
          <Grid container spacing={2}>
            {[
              {
                label: "Company complies with labour & safety regulations?",
                field: "labourCompliance",
              },
              {
                label: "Workers covered under insurance?",
                field: "workerInsurance",
              },
            ].map(({ label, field }) => (
              <Grid item xs={12} key={field}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.25,
                    px: 0.5,
                    borderBottom: `1px solid ${CLR.border}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: CLR.text,
                      flex: 1,
                      pr: 2,
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                    <Box
                      component="span"
                      sx={{ color: CLR.error, ml: 0.5, fontSize: 12 }}
                    >
                      *
                    </Box>
                  </Typography>
                  <YesNoToggle
                    value={form[field]}
                    onChange={setYesNo(field)}
                    error={isErr(field)}
                  />
                </Box>
                {isErr(field) && (
                  <FormHelperText error sx={{ mt: 0.25, ml: 0.5 }}>
                    {errTxt(field)}
                  </FormHelperText>
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <FieldLabel required>PF / ESI Availability</FieldLabel>
              <PillCheckboxGroup
                options={["PF", "ESI", "Both", "Not Applicable"]}
                value={form.pfEsiOptions}
                onChange={toggleArr("pfEsiOptions")}
              />
              {isErr("pfEsiOptions") && (
                <FormHelperText error sx={{ mt: 0.5 }}>
                  {errTxt("pfEsiOptions")}
                </FormHelperText>
              )}
            </Grid>
          </Grid>

          {/* Section 8 */}
          <SectionHeader number="8" title="Declaration" />
          <Box
            sx={{
              background: CLR.surface,
              borderRadius: "10px",
              border: `1px solid ${isErr("declarationAgreed") ? CLR.error : CLR.border}`,
              p: 2,
            }}
          >
            <Typography
              sx={{ fontSize: 12.5, color: CLR.muted, lineHeight: 1.75, mb: 2 }}
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
                    setForm((p) => ({ ...p, declarationAgreed: val }));
                    setTouched((p) => ({ ...p, declarationAgreed: true }));
                    setErrors((p) => ({
                      ...p,
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
                <Typography
                  sx={{ fontSize: 13, fontWeight: 600, color: CLR.text }}
                >
                  I have read and agree to the above declaration.
                </Typography>
              }
            />
            {isErr("declarationAgreed") && (
              <FormHelperText error sx={{ ml: 4 }}>
                {errTxt("declarationAgreed")}
              </FormHelperText>
            )}
          </Box>

          {errorMessage && (
            <Alert
              severity="error"
              sx={{ mt: 3, borderRadius: "8px", fontSize: 13 }}
            >
              {errorMessage}
            </Alert>
          )}

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
                background: "linear-gradient(135deg, #2444CC 0%, #152898 100%)",
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
  );
}
