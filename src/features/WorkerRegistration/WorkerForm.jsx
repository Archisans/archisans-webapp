import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
  Chip,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import {
  Person,
  ContactPhone,
  Work,
  Star,
  CheckCircle,
  Close,
  Email,
  Phone,
  Home,
  Badge,
  Cake,
  Wc,
} from "@mui/icons-material";
import {
  useFormValidation,
  usePersonalInfoForm,
  useContactInfoForm,
  useProfessionForm,
  useExperienceForm,
  sanitizeInput,
  getFieldValue as getFieldValueHelper,
  formatExperienceLabel,
} from "./utils/workerFormLogic";
import {
  GENDER_OPTIONS,
  EXPERIENCE_YEARS,
  RATE_BASIS_OPTIONS,
} from "./utils/constants";

import { RouteProvider } from "@/config/RouteProvider"; // Example import


const WorkerForm = ({
  formData,
  updateFormData,
  services = [],
  onSubmit,
  submissionStatus,
}) => {
  const [openSubModal, setOpenSubModal] = useState(false);
  const [currentProfession, setCurrentProfession] = useState(null);
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [activeSection, setActiveSection] = useState("personal");

  const personalRef = useRef(null);
  const contactRef = useRef(null);
  const professionRef = useRef(null);
  const experienceRef = useRef(null);

  const personalForm = usePersonalInfoForm(formData, updateFormData);
  const contactForm = useContactInfoForm(formData, updateFormData);
  const professionForm = useProfessionForm(formData, updateFormData);
  const experienceForm = useExperienceForm(formData);

  const navigate = useNavigate();

  // Main validation hook for field-level validation
  const { touched, validateField, handleBlur, markAllTouched } =
    useFormValidation();

  // Combine all errors from specialized forms
  const allErrors = useMemo(
    () => ({
      ...personalForm.errors,
      ...contactForm.errors,
      profession: professionForm.error,
      experience: experienceForm.error,
    }),
    [
      personalForm.errors,
      contactForm.errors,
      professionForm.error,
      experienceForm.error,
    ]
  );

  const sections = useMemo(
    () => [
      {
        key: "personal",
        label: "Personal Info",
        icon: <Person />,
        ref: personalRef,
      },
      {
        key: "contact",
        label: "Contact Info",
        icon: <ContactPhone />,
        ref: contactRef,
      },
      {
        key: "profession",
        label: "Profession",
        icon: <Work />,
        ref: professionRef,
      },
      {
        key: "experience",
        label: "Experience & Rate",
        icon: <Star />,
        ref: experienceRef,
      },
    ],
    []
  );

  const progress = useMemo(() => {
    let completed = 0;
    const total = 4;

    if (personalForm.isPersonalInfoValid(formData.personal)) completed++;
    if (contactForm.isContactInfoValid(formData.contact)) completed++;
    if (professionForm.isProfessionsValid(formData.professions)) {
      completed++;
    }

    const experienceData = experienceForm.buildExperienceData(
      formData.professions
    );
    if (experienceForm.isExperienceValid(experienceData)) completed++;

    return (completed / total) * 100;
  }, [formData, personalForm, contactForm, professionForm, experienceForm]);

  const scrollToSection = useCallback(
    (key) => {
      const section = sections.find((s) => s.key === key);
      section?.ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    },
    [sections]
  );

  const getFieldValue = useCallback(
    (field) => getFieldValueHelper(formData, field),
    [formData]
  );

  const handlePersonalChange = useCallback(
    (field, value) => {
      updateFormData("personal", { ...formData.personal, [field]: value });
      if (touched[field]) personalForm.validateField(field, value);
    },
    [formData.personal, touched, updateFormData, personalForm]
  );

  const handleContactChange = useCallback(
    (field, value) => {
      updateFormData("contact", { ...formData.contact, [field]: value });
      if (touched[field]) contactForm.validateField(field, value);
    },
    [formData.contact, touched, updateFormData, contactForm]
  );

  const handleSelectProfession = useCallback(
    (categoryId, categoryTitle) => {
      setCurrentProfession({ id: categoryId, title: categoryTitle });
      const existing = formData.professions?.find(
        (s) => s.categoryId === categoryId
      );
      setSelectedSubServices(existing?.services || []);
      setOpenSubModal(true);
    },
    [formData.professions]
  );

  const handleSaveSubServices = useCallback(() => {
    if (!currentProfession) return;

    const updated =
      formData.professions?.filter(
        (s) => s.categoryId !== currentProfession.id
      ) || [];

    let newSelected = updated;
    if (selectedSubServices.length > 0) {
      newSelected = [
        ...updated,
        {
          categoryId: currentProfession.id,
          categoryTitle: currentProfession.title,
          services: selectedSubServices,
        },
      ];
    }

    updateFormData("professions", newSelected);
    professionForm.validateProfessions(newSelected);
    setOpenSubModal(false);
  }, [
    currentProfession,
    formData.professions,
    selectedSubServices,
    updateFormData,
    professionForm,
  ]);

  const handleToggleSubService = useCallback((service) => {
    setSelectedSubServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      return exists
        ? prev.filter((s) => s.id !== service.id)
        : [
            ...prev,
            {
              id: service.id,
              categoryId: service.categoryId,
              title: service.title,
            },
          ];
    });
  }, []);

  const handleChangeExperienceRate = useCallback(
    (categoryId, serviceId, field, value) => {
      const updatedProfessions = formData.professions.map((prof) => {
        if (prof.categoryId !== categoryId) return prof;

        return {
          ...prof,
          services: prof.services.map((service) => {
            if (service.id !== serviceId) return service;
            return { ...service, [field]: value };
          }),
        };
      });

      updateFormData("professions", updatedProfessions);

      const fieldName = `${categoryId}@${serviceId}@${field}`;
      if (touched[fieldName]) {
        const isArtisan =
          formData.professions
            ?.find((p) => p.categoryId === categoryId)
            ?.categoryTitle?.toLowerCase() === "artisans";
        validateField(fieldName, value, {
          isRequired: isArtisan && field !== "experience",
        });
      }
    },
    [formData.professions, touched, updateFormData, validateField]
  );

  const isFormValid = useMemo(() => {
    if (
      !personalForm.isPersonalInfoValid(formData.personal) ||
      !contactForm.isContactInfoValid(formData.contact) ||
      !professionForm.isProfessionsValid(formData.professions)
    ) {
      return false;
    }

    const experienceData = experienceForm.buildExperienceData(
      formData.professions
    );

    if (!experienceForm.isExperienceValid(experienceData)) {
      return false;
    }

    const hasValidationErrors = Object.values(allErrors).some(
      (error) => error && error !== ""
    );

    return !hasValidationErrors;
  }, [
    formData,
    personalForm,
    contactForm,
    professionForm,
    experienceForm,
    allErrors,
  ]);

const getSectionCompletionStatus = useMemo(() => {
  return {
    personal: personalForm.isPersonalInfoValid(formData.personal),
    contact: contactForm.isContactInfoValid(formData.contact),
    profession: professionForm.isProfessionsValid(formData.professions),
    experience: (() => {
      if (!professionForm.isProfessionsValid(formData.professions)) {
        return false;
      }
      const experienceData = experienceForm.buildExperienceData(formData.professions);
      return experienceForm.isExperienceValid(experienceData);
    })()
  };
}, [formData, personalForm, contactForm, professionForm, experienceForm]);



  const handleSubmit = useCallback(() => {
    // Mark all fields as touched
    const allFields = {};

    ["aadhaar", "dob", "gender"].forEach((field) => {
      allFields[field] = true;
    });

    ["email", "address", "altPhone"].forEach((field) => {
      allFields[field] = true;
    });

    allFields["profession"] = true;

    formData.professions?.forEach((prof) => {
      prof.services.forEach((service) => {
        ["experience", "rate", "rateBasis"].forEach((field) => {
          const fieldName = `${prof.categoryId}@${service.id}@${field}`;
          allFields[fieldName] = true;
        });
      });
    });

    markAllTouched(Object.keys(allFields));

    // Validate using specialized hooks
    personalForm.validatePersonalInfo(formData.personal);
    contactForm.validateContactInfo(formData.contact);
    professionForm.validateProfessions(formData.professions);

    const experienceData = experienceForm.buildExperienceData(
      formData.professions
    );
    experienceForm.validateExperience(experienceData);

    if (!isFormValid) {
      return;
    }

    onSubmit();
    
    navigate(RouteProvider.WORKER_PROFILE);
  }, [
    formData,
    isFormValid,
    markAllTouched,
    personalForm,
    contactForm,
    professionForm,
    experienceForm,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 150;
      sections.forEach((sec) => {
        const ref = sec.ref.current;
        if (ref) {
          const offsetTop = ref.offsetTop;
          const offsetBottom = offsetTop + ref.offsetHeight;
          if (scrollY >= offsetTop && scrollY < offsetBottom) {
            setActiveSection(sec.key);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        position: "relative",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 300,
          bgcolor: "#ffffff",
          p: 4,
          display: { xs: "none", md: "block" },
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
          height: "100vh",
          overflowY: "auto",
          borderRight: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none", 
  }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}
          >
            Worker Registration
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Complete all sections to register
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            sx={{ color: "#64748b", mb: 2, display: "block", fontWeight: 500 }}
          >
            PROGRESS: {Math.round(progress)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: "#f1f5f9",
              "& .MuiLinearProgress-bar": {
                borderRadius: 3,
                bgcolor: "#334155",
              },
            }}
          />
        </Box>

        {sections.map((step, i) => {
  const isActive = activeSection === step.key;
  const isCompleted = getSectionCompletionStatus[step.key];

  return (
    <Box
      key={step.key}
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 1.5,
        cursor: "pointer",
        p: 2,
        borderRadius: 2,
        transition: "all 0.2s ease",
        bgcolor: isActive ? "#f1f5f9" : "transparent",
        border: isActive
          ? "1px solid #e2e8f0"
          : "1px solid transparent",
        "&:hover": {
          bgcolor: "#f8fafc",
        },
      }}
      onClick={() => scrollToSection(step.key)}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          bgcolor: isActive
            ? "#334155"
            : isCompleted
            ? "#10b981"
            : "#cbd5e1",
          color: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mr: 2,
          fontWeight: 600,
          fontSize: "0.75rem",
          transition: "all 0.2s ease",
        }}
      >
        {isCompleted ? <CheckCircle sx={{ fontSize: 16 }} /> : i + 1}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: isActive ? 600 : 500,
            color: isActive ? "#1e293b" : "#64748b",
            fontSize: "0.875rem",
          }}
        >
          {step.label}
        </Typography>
        {isCompleted && (
          <Typography
            variant="caption"
            sx={{ color: "#10b981", fontWeight: 500 }}
          >
            Completed
          </Typography>
        )}
      </Box>
    </Box>
  );
})}
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: { xs: 3, md: 4 } }}>
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "#1e293b",
              }}
            >
              Register With Us
            </Typography>
            <Typography variant="body1" sx={{ color: "#64748b" }}>
              Please provide your details to complete the registration process
            </Typography>
          </Box>

          {/* Personal Info Section */}
          <Paper
            ref={personalRef}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 2,
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
            elevation={0}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  border: "1px solid #e2e8f0",
                }}
              >
                <Person sx={{ color: "#64748b", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1e293b" }}
              >
                Personal Information
              </Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={4}
            >
              <Avatar
                src={formData?.uploadedImage}
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#f8fafc",
                  color: "#64748b",
                  border: "3px solid #ffffff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.personal?.fullName || ""}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Badge sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Aadhaar Number"
                  placeholder="Enter 12-digit Aadhaar"
                  value={formData.personal?.aadhaar || ""}
                  onChange={(e) =>
                    handlePersonalChange(
                      "aadhaar",
                      sanitizeInput.numericOnly(e.target.value, 12)
                    )
                  }
                  onBlur={() => handleBlur("aadhaar", getFieldValue("aadhaar"))}
                  inputProps={{ maxLength: 12, inputMode: "numeric" }}
                  error={touched.aadhaar && !!personalForm.errors.aadhaar}
                  helperText={touched.aadhaar && personalForm.errors.aadhaar}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  value={formData.personal?.dob || ""}
                  onChange={(e) => handlePersonalChange("dob", e.target.value)}
                  onBlur={() => handleBlur("dob", getFieldValue("dob"))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Cake sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  error={touched.dob && !!personalForm.errors.dob}
                  helperText={touched.dob && personalForm.errors.dob}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={touched.gender && !!personalForm.errors.gender}
                >
                  <Select
                    value={formData.personal?.gender || ""}
                    displayEmpty
                    onChange={(e) =>
                      handlePersonalChange("gender", e.target.value)
                    }
                    onBlur={() => handleBlur("gender", getFieldValue("gender"))}
                    startAdornment={
                      <InputAdornment position="start">
                        <Wc sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    }
                    sx={{
                      borderRadius: 1,
                    }}
                  >
                    <MenuItem disabled value="">
                      Select Gender
                    </MenuItem>
                    {GENDER_OPTIONS.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.gender && personalForm.errors.gender && (
                    <FormHelperText>
                      {personalForm.errors.gender}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Contact Info Section */}
          <Paper
            ref={contactRef}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 2,
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
            elevation={0}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  border: "1px solid #e2e8f0",
                }}
              >
                <ContactPhone sx={{ color: "#64748b", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1e293b" }}
              >
                Contact Information
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.contact?.phone || ""}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                      bgcolor: "#f8fafc",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Alternate Phone Number"
                  placeholder="Optional"
                  value={formData.contact?.altPhone || ""}
                  onChange={(e) =>
                    handleContactChange(
                      "altPhone",
                      sanitizeInput.numericOnly(e.target.value, 10)
                    )
                  }
                  onBlur={() =>
                    handleBlur("altPhone", getFieldValue("altPhone"))
                  }
                  inputProps={{ maxLength: 10, inputMode: "numeric" }}
                  error={touched.altPhone && !!contactForm.errors.altPhone}
                  helperText={touched.altPhone && contactForm.errors.altPhone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  placeholder="your.email@example.com"
                  value={formData.contact?.email || ""}
                  onChange={(e) =>
                    handleContactChange(
                      "email",
                      sanitizeInput.email(e.target.value)
                    )
                  }
                  onBlur={() => handleBlur("email", getFieldValue("email"))}
                  error={touched.email && !!contactForm.errors.email}
                  helperText={touched.email && contactForm.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Permanent Address"
                  placeholder="Enter your complete address"
                  value={formData.contact?.address || ""}
                  onChange={(e) =>
                    handleContactChange("address", e.target.value)
                  }
                  onBlur={() => handleBlur("address", getFieldValue("address"))}
                  error={touched.address && !!contactForm.errors.address}
                  helperText={touched.address && contactForm.errors.address}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ alignSelf: "flex-start", mt: 1 }}
                      >
                        <Home sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Profession Section */}
          <Paper
            ref={professionRef}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 2,
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
            elevation={0}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  border: "1px solid #e2e8f0",
                }}
              >
                <Work sx={{ color: "#64748b", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1e293b" }}
              >
                Select Your Profession
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
              {services.map((category) => {
                const isSelected = formData.professions?.some(
                  (s) => s.categoryId === category.id
                );
                const selectedCount =
                  formData.professions?.find(
                    (s) => s.categoryId === category.id
                  )?.services?.length || 0;

                return (
                  <Chip
                    key={category.id}
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <span>{category.title}</span>
                        {selectedCount > 0 && (
                          <Box
                            sx={{
                              bgcolor: "#334155",
                              color: "#ffffff",
                              borderRadius: "50%",
                              width: 20,
                              height: 20,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            {selectedCount}
                          </Box>
                        )}
                      </Box>
                    }
                    onClick={() =>
                      handleSelectProfession(category.id, category.title)
                    }
                    icon={isSelected ? <CheckCircle /> : undefined}
                    sx={{
                      px: 2,
                      py: 1.5,
                      height: "auto",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      borderRadius: 1,
                      bgcolor: isSelected ? "#334155" : "#ffffff",
                      color: isSelected ? "#ffffff" : "#334155",
                      border: isSelected
                        ? "1px solid #334155"
                        : "1px solid #cbd5e1",
                      "& .MuiChip-icon": {
                        color: isSelected ? "#ffffff" : "transparent",
                      },
                      "&:hover": {
                        bgcolor: isSelected ? "#475569" : "#f8fafc",
                      },
                    }}
                  />
                );
              })}
            </Box>
            {touched.profession && professionForm.error && (
              <Typography
                color="error"
                variant="caption"
                sx={{ mt: 1, display: "block", fontWeight: 500 }}
              >
                {professionForm.error}
              </Typography>
            )}

            {formData.professions?.length > 0 && (
              <Box sx={{ mt: 3, p: 3, bgcolor: "#f8fafc", borderRadius: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 2, color: "#475569", fontWeight: 600 }}
                >
                  SELECTED SERVICES:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {formData.professions.map((prof) =>
                    prof.services.map((service) => (
                      <Chip
                        key={`${prof.categoryId}-${service.id}`}
                        label={`${service.title} (${prof.categoryTitle})`}
                        size="small"
                        sx={{
                          bgcolor: "#ffffff",
                          color: "#334155",
                          fontWeight: 500,
                          border: "1px solid #e2e8f0",
                        }}
                      />
                    ))
                  )}
                </Box>
              </Box>
            )}
          </Paper>

          {/* Experience & Rate Section */}
          <Paper
            ref={experienceRef}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 2,
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
            elevation={0}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  border: "1px solid #e2e8f0",
                }}
              >
                <Star sx={{ color: "#64748b", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1e293b" }}
              >
                Experience & Rate Details
              </Typography>
            </Box>

            {formData.professions?.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  px: 3,
                  bgcolor: "#f8fafc",
                  borderRadius: 1,
                  border: "1px dashed #cbd5e1",
                }}
              >
                <Work sx={{ fontSize: 32, color: "#94a3b8", mb: 2 }} />
                <Typography color="#64748b" sx={{ fontSize: "0.875rem" }}>
                  Please select at least one profession to add experience and
                  rates.
                </Typography>
              </Box>
            )}

            {formData.professions?.map((prof) =>
              prof.services.map((service) => {
                const data = {
                  experience: service.experience || "",
                  rate: service.rate || "",
                  rateBasis: service.rateBasis || "",
                };

                const isArtisan =
                  prof.categoryTitle?.toLowerCase() === "artisans";
                const fieldNames = {
                  experience: `${prof.categoryId}@${service.id}@experience`,
                  rate: `${prof.categoryId}@${service.id}@rate`,
                  rateBasis: `${prof.categoryId}@${service.id}@rateBasis`,
                };

                return (
                  <Box
                    key={`${prof.categoryId}-${service.id}`}
                    sx={{
                      p: 3,
                      mb: 3,
                      borderRadius: 1,
                      bgcolor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Chip
                        label={prof.categoryTitle}
                        size="small"
                        sx={{
                          bgcolor: "#334155",
                          color: "#ffffff",
                          fontWeight: 500,
                          mr: 2,
                          fontSize: "0.75rem",
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: "#1e293b" }}
                      >
                        {service.title}
                      </Typography>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <FormControl
                          fullWidth
                          error={
                            touched[fieldNames.experience] &&
                            !!allErrors[fieldNames.experience]
                          }
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              mb: 1,
                              color: "#64748b",
                              fontWeight: 500,
                              display: "block",
                            }}
                          >
                            Years of Experience *
                          </Typography>
                          <Select
                            value={data.experience}
                            onChange={(e) =>
                              handleChangeExperienceRate(
                                prof.categoryId,
                                service.id,
                                "experience",
                                e.target.value
                              )
                            }
                            onBlur={() =>
                              handleBlur(fieldNames.experience, data.experience)
                            }
                            displayEmpty
                            sx={{ borderRadius: 1 }}
                          >
                            <MenuItem disabled value="">
                              Select Experience
                            </MenuItem>
                            {EXPERIENCE_YEARS.map((year) => (
                              <MenuItem key={year} value={year}>
                                {formatExperienceLabel(year)}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched[fieldNames.experience] &&
                            allErrors[fieldNames.experience] && (
                              <FormHelperText>
                                {allErrors[fieldNames.experience]}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Typography
                          variant="caption"
                          sx={{
                            mb: 1,
                            display: "block",
                            color: "#64748b",
                            fontWeight: 500,
                          }}
                        >
                          Rate{isArtisan ? " *" : ""}
                        </Typography>
                        <TextField
                          fullWidth
                          type="number"
                          placeholder="Enter rate"
                          value={data.rate}
                          onChange={(e) =>
                            handleChangeExperienceRate(
                              prof.categoryId,
                              service.id,
                              "rate",
                              e.target.value
                            )
                          }
                          onBlur={() => handleBlur(fieldNames.rate, data.rate)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                ₹
                              </InputAdornment>
                            ),
                          }}
                          error={
                            touched[fieldNames.rate] &&
                            !!allErrors[fieldNames.rate]
                          }
                          helperText={
                            touched[fieldNames.rate] &&
                            allErrors[fieldNames.rate]
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 1,
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <FormControl
                          fullWidth
                          error={
                            touched[fieldNames.rateBasis] &&
                            !!allErrors[fieldNames.rateBasis]
                          }
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              mb: 1,
                              color: "#64748b",
                              fontWeight: 500,
                              display: "block",
                            }}
                          >
                            Rate Type{isArtisan ? " *" : ""}
                          </Typography>
                          <Select
                            value={data.rateBasis}
                            onChange={(e) =>
                              handleChangeExperienceRate(
                                prof.categoryId,
                                service.id,
                                "rateBasis",
                                e.target.value
                              )
                            }
                            onBlur={() =>
                              handleBlur(fieldNames.rateBasis, data.rateBasis)
                            }
                            displayEmpty
                            sx={{ borderRadius: 1 }}
                          >
                            <MenuItem disabled value="">
                              Select Type
                            </MenuItem>
                            {RATE_BASIS_OPTIONS.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched[fieldNames.rateBasis] &&
                            allErrors[fieldNames.rateBasis] && (
                              <FormHelperText>
                                {allErrors[fieldNames.rateBasis]}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                );
              })
            )}
          </Paper>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={!isFormValid || submissionStatus.loading}
              sx={{
                minWidth: 200,
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 1,
                bgcolor: "#334155",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#475569",
                },
                "&:disabled": {
                  bgcolor: "#cbd5e1",
                  color: "#94a3b8",
                },
              }}
            >
              {submissionStatus.loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isFormValid ? (
                "Submit Registration"
              ) : (
                "Complete All Fields"
              )}
            </Button>
          </Box>
        </Box>

        {/* Sub-services Modal */}
        <Dialog
          open={openSubModal}
          onClose={() => setOpenSubModal(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Select Services for {currentProfession?.title}
            </Typography>
            <IconButton onClick={() => setOpenSubModal(false)} size="small">
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 3, pb: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {currentProfession &&
                services
                  .find((cat) => cat.id === currentProfession.id)
                  ?.services.map((service) => (
                    <Box
                      key={service.id}
                      sx={{
                        p: 2,
                        mt:2,
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: selectedSubServices.some(
                          (s) => s.id === service.id
                        )
                          ? "#334155"
                          : "#e2e8f0",
                        bgcolor: selectedSubServices.some(
                          (s) => s.id === service.id
                        )
                          ? "#f8fafc"
                          : "#ffffff",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        "&:hover": {
                          borderColor: "#334155",
                          bgcolor: "#f8fafc",
                        },
                      }}
                      onClick={() => handleToggleSubService(service)}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedSubServices.some(
                              (s) => s.id === service.id
                            )}
                            sx={{
                              color: "#94a3b8",
                              "&.Mui-checked": {
                                color: "#334155",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography
                            sx={{ fontWeight: 500, fontSize: "0.875rem" }}
                          >
                            {service.title}
                          </Typography>
                        }
                        sx={{ m: 0, width: "100%" }}
                      />
                    </Box>
                  ))}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 2, borderTop: "1px solid #e2e8f0" }}>
            <Button
              onClick={() => setOpenSubModal(false)}
              sx={{
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 500,
                color: "#64748b",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveSubServices}
              variant="contained"
              sx={{
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 500,
                bgcolor: "#334155",
                "&:hover": {
                  bgcolor: "#475569",
                },
              }}
            >
              Save Selection ({selectedSubServices.length})
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default WorkerForm;
