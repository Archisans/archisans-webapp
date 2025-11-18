import { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
  Instagram,
  Facebook,
  YouTube,
  LinkedIn,
  Business,
  Assignment,
  Receipt,
  Schedule,
  AddPhotoAlternate,
  Edit,
  Delete,
  Description,
  Badge as AadhaarIcon
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
  useCompanyForm,
} from "./utils/workerFormLogic";
import { GENDER_OPTIONS, EXPERIENCE_YEARS } from "./utils/constants";
import { Camera } from "lucide-react";

const WorkerForm = ({
  formData,
  updateFormData,
  services = [],
  onSubmit,
  submissionStatus,
  registerMode = true,
}) => {
  const [openSubModal, setOpenSubModal] = useState(false);
  const [currentProfession, setCurrentProfession] = useState(null);
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [activeSection, setActiveSection] = useState("personal");

  const personalRef = useRef(null);
  const contactRef = useRef(null);
  const professionRef = useRef(null);
  const experienceRef = useRef(null);

  const personalForm = usePersonalInfoForm();
  const contactForm = useContactInfoForm();
  const companyForm = useCompanyForm();
  const professionForm = useProfessionForm();
  const experienceForm = useExperienceForm();

  const profileImageInputRef = useRef(null);

  // Main validation hook for field-level validation
  const { touched, validateField, handleBlur, markAllTouched } =
    useFormValidation();

  // Combine all errors from specialized forms
  const allErrors = useMemo(
    () => ({
      ...personalForm.errors,
      ...contactForm.errors,
      ...companyForm.errors,
      profession: professionForm.error,
      experience: experienceForm.error,
    }),
    [
      personalForm.errors,
      contactForm.errors,
      companyForm.errors,
      professionForm.error,
      experienceForm.error,
    ]
  );

  console.log(contactForm);

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
        label: "Experience",
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
      personalForm.validateField(field, value);
    },
    [formData.personal, touched, updateFormData, personalForm]
  );

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      updateFormData("personal", {
        ...formData.personal,
        imageUrl: e.target.result,
        file: file,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleContactChange = useCallback(
    (field, value) => {
      updateFormData("contact", { ...formData.contact, [field]: value });
      contactForm.validateField(field, value);
    },
    [formData.contact, touched, updateFormData, contactForm]
  );

  const handleAboutChange = useCallback(
    (value) => {
      updateFormData("about", value);
    },
    [updateFormData]
  );

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      updateFormData("coverPhoto", { file, preview: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCoverPhoto = useCallback(() => {
    updateFormData("coverPhoto", null);
  }, [updateFormData]);

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

  const handleSocialMediaChange = useCallback(
    (field, value) => {
      updateFormData("socialMedia", {
        ...formData.socialMedia,
        [field]: sanitizeInput.url(value),
      });
    },
    [formData.socialMedia, updateFormData]
  );

  const handleCompanyChange = useCallback(
    (field, value) => {
      let sanitizedValue = value;

      if (field === "gstNumber") {
        sanitizedValue = sanitizeInput.alphanumeric(value, 15).toUpperCase();
      } else if (field === "workPermitNumber") {
        sanitizedValue = sanitizeInput.alphanumeric(value);
      } else if (field === "workingHours") {
        sanitizedValue = sanitizeInput.numericOnly(value, 2);
      }

      updateFormData("company", {
        ...formData.company,
        [field]: sanitizedValue,
      });
    },
    [formData.company, updateFormData]
  );

  const handleCompanyBlur = useCallback(
    (field, value) => {
      const isCompanyStarted = companyForm.isCompanyInformationStarted(
        formData.company
      );

      setTimeout(() => {
        companyForm.validateField(field, value, isCompanyStarted);
      }, 0);
    },
    [formData.company, companyForm]
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

  const handleChangeExperience = useCallback(
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
        validateField(fieldName, value);
      }
    },
    [formData.professions, touched, updateFormData, validateField]
  );

  const isFormValid = useMemo(() => {
    if (
      !personalForm.isPersonalInfoValid(formData.personal) ||
      !contactForm.isContactInfoValid(formData.contact) ||
      !companyForm.isCompanyInfoValid(formData.company) ||
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
    companyForm,
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
        const experienceData = experienceForm.buildExperienceData(
          formData.professions
        );
        return experienceForm.isExperienceValid(experienceData);
      })(),
    };
  }, [formData, personalForm, contactForm, professionForm, experienceForm]);

  const handleSubmit = useCallback(() => {
    // Mark all fields as touched
    const allFields = {};

    ["fullName", "imageUrl", "aadhaar", "dob", "gender"].forEach((field) => {
      allFields[field] = true;
    });

    ["email", "address", "altPhone"].forEach((field) => {
      allFields[field] = true;
    });

    ["Instagram", "Facebook", "YouTube", "LinkedIn"].forEach((field) => {
      allFields[field] = true;
    });

    ["companyName", "workPermitNumber", "gstNumber", "workingHours"].forEach(
      (field) => {
        allFields[field] = true;
      }
    );

    allFields["coverPhoto"] = true;
    allFields["about"] = true;
    allFields["profession"] = true;

    formData.professions?.forEach((prof) => {
      prof.services.forEach((service) => {
        const fieldName = `${prof.categoryId}@${service.id}@experience`;
        allFields[fieldName] = true;
      });
    });

    markAllTouched(Object.keys(allFields));

    // Validate using specialized hooks
    personalForm.validatePersonalInfo(formData.personal);
    contactForm.validateContactInfo(formData.contact);
    companyForm.validateCompanyInfo(formData.company);
    professionForm.validateProfessions(formData.professions);

    const experienceData = experienceForm.buildExperienceData(
      formData.professions
    );
    experienceForm.validateExperience(experienceData);

    if (!isFormValid) {
      return;
    }

    const submissionData = {
      ...formData,
      company: companyForm.isCompanyInformationStarted(formData.company)
        ? formData.company
        : null,
    };

    onSubmit(submissionData);
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
      {registerMode && (
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
              sx={{
                color: "#64748b",
                mb: 2,
                display: "block",
                fontWeight: 500,
              }}
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
      )}

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
              {registerMode
                ? "Register as a Professional"
                : "Update Your Work Profile"}
            </Typography>
            <Typography variant="body1" sx={{ color: "#64748b" }}>
              {registerMode
                ? "Fill in your details below to create your professional profile and start offering your services."
                : "Update your profile information below to keep your professional details and services up to date."}
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
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  src={formData?.personal.imageUrl}
                  alt="Profile"
                  sx={{
                    width: 110,
                    height: 110,
                    border:
                      touched.imageUrl && errors.imageUrl
                        ? "3px solid #f44336"
                        : "3px solid #fff",
                  }}
                  onBlur={() =>
                    handleBlur("imageUrl", formData?.personal.imageUrl)
                  }
                />

                <IconButton
                  onClick={() => profileImageInputRef.current?.click()}
                  sx={{
                    position: "absolute",
                    bottom: 4,
                    right: 4,
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

                <input
                  ref={profileImageInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleProfileImageChange}
                />
              </Box>

              {touched.imageUrl && !!personalForm.errors.imageUrl && (
                <FormHelperText error sx={{ mt: 1, textAlign: "center" }}>
                  {errors.imageUrl}
                </FormHelperText>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.personal?.fullName || ""}
                  onChange={(e) =>
                    handlePersonalChange(
                      "fullName",
                      sanitizeInput.fullName(e.target.value)
                    )
                  }
                  onBlur={() =>
                    handleBlur("fullName", getFieldValue("fullName"))
                  }
                  error={touched.fullName && !!personalForm.errors.fullName}
                  helperText={touched.fullName && personalForm.errors.fullName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#94a3b8" }} />
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
                  label="Aadhaar Number (12-digit)"
                  placeholder="Optional"
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AadhaarIcon sx={{ color: "#94a3b8" }} />
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
                  value={formData.contact?.phone?.slice(3) || ""}
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
                  label="Alternate Phone Number (10-digit)"
                  placeholder="Optional"
                  value={
                    formData.contact?.altPhone
                      ? formData.contact.altPhone.startsWith("+91")
                        ? formData.contact.altPhone.slice(3)
                        : formData.contact.altPhone
                      : ""
                  }
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

          {/* About & Cover Photo Section */}
          <Paper
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
                <Description sx={{ color: "#64748b", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1e293b" }}
              >
                About & Cover Photo (Optional)
              </Typography>
            </Box>

            {/* About Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body1"
                sx={{ color: "#334155", mb: 2, fontWeight: 500 }}
              >
                About Yourself
              </Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                placeholder="Write a short description about yourself, your skills, experience, or what makes your services special. This will help clients understand your expertise better..."
                value={formData.about || ""}
                onChange={(e) => handleAboutChange(e.target.value)}
                helperText={`${formData.about?.length || 0}/500 characters`}
                inputProps={{ maxLength: 500 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    "& fieldset": { borderColor: "#cbd5e1" },
                    "&:hover fieldset": { borderColor: "#334155" },
                    "&.Mui-focused fieldset": { borderColor: "#0f172a" },
                  },
                }}
              />
            </Box>

            {/* Cover Photo Section */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body1"
                sx={{ color: "#334155", mb: 2, fontWeight: 500 }}
              >
                Cover Photo
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
                Add a cover photo to make your profile stand out. Recommended
                size: 1200x300 pixels. Max file size: 5MB.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {formData.coverPhoto ? (
                  <Box
                    sx={{ position: "relative", width: "100%", maxWidth: 800 }}
                  >
                    <Box
                      component="img"
                      src={formData.coverPhoto?.preview || formData.coverPhoto}
                      alt="Cover"
                      sx={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        borderRadius: 2,
                        border: "2px solid #e2e8f0",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="cover-photo-edit"
                        type="file"
                        onChange={handleCoverPhotoChange}
                      />
                      <label htmlFor="cover-photo-edit">
                        <IconButton
                          component="span"
                          sx={{
                            bgcolor: "white",
                            "&:hover": { bgcolor: "grey.100" },
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </label>
                      <IconButton
                        onClick={handleRemoveCoverPhoto}
                        sx={{
                          bgcolor: "white",
                          "&:hover": { bgcolor: "grey.100" },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: 200,
                      border: "2px dashed #cbd5e1",
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "#334155",
                        bgcolor: "#f8fafc",
                      },
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="cover-photo-upload"
                      type="file"
                      onChange={handleCoverPhotoChange}
                    />
                    <label htmlFor="cover-photo-upload">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <AddPhotoAlternate
                          sx={{ fontSize: 48, color: "#94a3b8", mb: 1 }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ color: "#64748b", mb: 0.5 }}
                        >
                          Click to upload cover photo
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                          PNG, JPG, JPEG up to 5MB
                        </Typography>
                      </Box>
                    </label>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>

          {/* Social Media Section */}
          <Paper
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
                <Instagram sx={{ color: "#64748b", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1e293b" }}
              >
                Social Media Profiles (Optional)
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
              Add your social media profiles to help clients learn more about
              your work
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Instagram"
                  placeholder="https://instagram.com/yourprofile"
                  value={formData.socialMedia?.Instagram || ""}
                  onChange={(e) =>
                    handleSocialMediaChange("Instagram", e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Instagram sx={{ color: "#E1306C" }} />
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
                  label="Facebook"
                  placeholder="https://facebook.com/yourprofile"
                  value={formData.socialMedia?.Facebook || ""}
                  onChange={(e) =>
                    handleSocialMediaChange("Facebook", e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Facebook sx={{ color: "#1877F2" }} />
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
                  label="YouTube"
                  placeholder="https://youtube.com/yourchannel"
                  value={formData.socialMedia?.YouTube || ""}
                  onChange={(e) =>
                    handleSocialMediaChange("YouTube", e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <YouTube sx={{ color: "#FF0000" }} />
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
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.socialMedia?.LinkedIn || ""}
                  onChange={(e) =>
                    handleSocialMediaChange("LinkedIn", e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedIn sx={{ color: "#0A66C2" }} />
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

          {/* Company Information Section */}
          <Paper
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
                <Business sx={{ color: "#64748b", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1e293b" }}
              >
                Company Information (Optional)
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
              Fill this section only if you represent a company or registered
              business. If you start filling any field, all fields become
              required.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  placeholder="Enter company name"
                  value={formData.company?.companyName || ""}
                  onChange={(e) =>
                    handleCompanyChange("companyName", e.target.value)
                  }
                  onBlur={() =>
                    handleCompanyBlur(
                      "companyName",
                      formData.company?.companyName || ""
                    )
                  }
                  error={!!companyForm.errors.companyName}
                  helperText={companyForm.errors.companyName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business sx={{ color: "#94a3b8" }} />
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
                  label="Work Permit Number"
                  placeholder="Enter work permit number"
                  value={formData.company?.workPermitNumber || ""}
                  onChange={(e) =>
                    handleCompanyChange("workPermitNumber", e.target.value)
                  }
                  onBlur={() =>
                    handleCompanyBlur(
                      "workPermitNumber",
                      formData.company?.workPermitNumber || ""
                    )
                  }
                  error={!!companyForm.errors.workPermitNumber}
                  helperText={companyForm.errors.workPermitNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Assignment sx={{ color: "#94a3b8" }} />
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
                  label="GST Number"
                  placeholder="15-character GST number"
                  value={formData.company?.gstNumber || ""}
                  onChange={(e) =>
                    handleCompanyChange("gstNumber", e.target.value)
                  }
                  onBlur={() =>
                    handleCompanyBlur(
                      "gstNumber",
                      formData.company?.gstNumber || ""
                    )
                  }
                  error={!!companyForm.errors.gstNumber}
                  helperText={companyForm.errors.gstNumber}
                  inputProps={{ maxLength: 15 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Receipt sx={{ color: "#94a3b8" }} />
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
                  label="Working Hours (per day)"
                  placeholder="e.g., 8"
                  value={formData.company?.workingHours || ""}
                  onChange={(e) =>
                    handleCompanyChange("workingHours", e.target.value)
                  }
                  onBlur={() =>
                    handleCompanyBlur(
                      "workingHours",
                      formData.company?.workingHours || ""
                    )
                  }
                  error={!!companyForm.errors.workingHours}
                  helperText={companyForm.errors.workingHours}
                  inputProps={{ maxLength: 2, inputMode: "numeric" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Schedule sx={{ color: "#94a3b8" }} />
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

          {/* Experience Section */}
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
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
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
                Experience Details
              </Typography>
            </Box>

            {formData.professions?.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 5,
                  px: 3,
                  bgcolor: "#f8fafc",
                  borderRadius: 1,
                  border: "1px dashed #cbd5e1",
                }}
              >
                <Work sx={{ fontSize: 32, color: "#94a3b8", mb: 2 }} />
                <Typography color="#64748b" sx={{ fontSize: "0.875rem" }}>
                  Please select at least one profession to add experience
                  details.
                </Typography>
              </Box>
            )}

            <Box sx={{ mt: 1 }}>
              {formData.professions?.map((prof) =>
                prof.services.map((service) => {
                  const data = {
                    experience: service.experience || "",
                  };
                  const fieldName = `${prof.categoryId}@${service.id}@experience`;

                  return (
                    <Box
                      key={`${prof.categoryId}-${service.id}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderBottom: "1px solid #e2e8f0",
                        "&:last-of-type": { borderBottom: "none" },
                        "&:hover": { bgcolor: "#f9fafb" },
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, color: "#1e293b" }}
                        >
                          {service.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#64748b" }}>
                          {prof.categoryTitle}
                        </Typography>
                      </Box>

                      <FormControl
                        sx={{ minWidth: 180 }}
                        error={touched[fieldName] && !!allErrors[fieldName]}
                      >
                        <Select
                          size="small"
                          value={data.experience}
                          onChange={(e) =>
                            handleChangeExperience(
                              prof.categoryId,
                              service.id,
                              "experience",
                              e.target.value
                            )
                          }
                          onBlur={() => handleBlur(fieldName, data.experience)}
                          displayEmpty
                          sx={{ borderRadius: 1 }}
                        >
                          <MenuItem disabled value="">
                            Select Years
                          </MenuItem>
                          {EXPERIENCE_YEARS.map((year) => (
                            <MenuItem key={year} value={year}>
                              {formatExperienceLabel(year)}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched[fieldName] && allErrors[fieldName] && (
                          <FormHelperText>
                            {allErrors[fieldName]}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  );
                })
              )}
            </Box>
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
                registerMode ? (
                  "Submit registration"
                ) : (
                  "Save changes"
                )
              ) : (
                "Complete All Mandatory Fields"
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
                        mt: 2,
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
