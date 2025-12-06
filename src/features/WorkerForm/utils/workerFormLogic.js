import { useState, useCallback, useMemo } from "react";
import { validateTimeRange } from "./timeUtils";

// ============================================
// Validation Logic
// ============================================

export const validators = {
  fullName: (value) => {
    if (!value?.trim()) return "Full name is required";
    if (value.trim().length < 3)
      return "Full name must be at least 3 characters";
    if (!/^[A-Za-z\s]+$/.test(value))
      return "Full name can only contain letters and spaces";
    return "";
  },

  imageUrl: (value) => {
    if (!value) return "Profile image is required";
    try {
      new URL(value);
      return "";
    } catch {
      return "Invalid image URL";
    }
  },

  aadhaar: (value) => {
    if (!value) return "";
    if (!/^\d{12}$/.test(value)) return "Aadhaar must be 12 digits";
    return "";
  },

  dob: (value) => {
    if (!value) return "Date of birth is required";

    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (
      age < 18 ||
      (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      return "You must be at least 18 years old";
    }
    return "";
  },

  gender: (value) => {
    if (!value) return "Gender is required";
    return "";
  },

  altPhone: (value) => {
    if (!value) return "";

    // +91 optional, number must start with 6-9 and have 10 digits
    const regex = /^(?:\+91)?[6-9]\d{9}$/;

    if (!regex.test(value)) {
      return "Alternate Phone must be 10 digits and start with 6-9";
    }
    return "";
  },

  email: (value) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email is invalid";
    return "";
  },

  address: (value) => {
    if (!value?.trim()) return "Address is required";
    return "";
  },

  profession: (value) => {
    if (!value?.length) return "At least one profession is required";
    return "";
  },

  experience: (value) => {
    if (value === "" || value === null || value === undefined)
      return "Experience is required";
    return "";
  },
};

// ============================================
// Form Validation
// ============================================

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((field, value, options = {}) => {
    const validator = validators[field];
    if (!validator) return "";

    const error =
      typeof validator === "function"
        ? validator(value, options.isRequired)
        : "";

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  }, []);

  const handleBlur = useCallback(
    (field, value) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      return validateField(field, value);
    },
    [validateField]
  );

  const markAllTouched = useCallback((fields) => {
    const newTouched = {};
    fields.forEach((field) => (newTouched[field] = true));
    setTouched(newTouched);
  }, []);

  const validateAll = useCallback(
    (fieldsToValidate) => {
      const results = fieldsToValidate.map(({ field, value, options }) =>
        validateField(field, value, options)
      );
      return results.every((error) => error === "");
    },
    [validateField]
  );

  const hasErrors = useMemo(
    () => Object.values(errors).some((e) => e !== ""),
    [errors]
  );

  const clearError = useCallback((field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    touched,
    validateField,
    handleBlur,
    markAllTouched,
    validateAll,
    hasErrors,
    clearError,
    clearAllErrors,
  };
};

// ============================================
// Personal Info Logic
// ============================================

export const usePersonalInfoForm = () => {
  const {
    errors,
    touched,
    validateField,
    handleBlur,
    markAllTouched,
    validateAll,
  } = useFormValidation();

  const validatePersonalInfo = useCallback(
    (data) => {
      const fields = [
        { field: "fullName", value: data.fullName },
        { field: "imageUrl", value: data.imageUrl },
        { field: "aadhaar", value: data.aadhaar },
        { field: "dob", value: data.dob },
        { field: "gender", value: data.gender },
      ];

      markAllTouched(["fullName", "imageUrl", "aadhaar", "dob", "gender"]);
      return validateAll(fields);
    },
    [markAllTouched, validateAll]
  );

  const isPersonalInfoValid = useCallback((data) => {
    return !!(
      data.fullName?.trim() &&
      data.fullName.trim().length >= 3 &&
      data.imageUrl &&
      (!data.aadhaar || data.aadhaar?.match(/^\d{12}$/)) &&
      data.dob &&
      data.gender &&
      validators.dob(data.dob) === ""
    );
  }, []);

  return {
    errors,
    touched,
    validateField,
    handleBlur,
    validatePersonalInfo,
    isPersonalInfoValid,
  };
};

// ============================================
// Contact Info Logic
// ============================================

export const useContactInfoForm = () => {
  const {
    errors,
    touched,
    validateField,
    handleBlur,
    markAllTouched,
    validateAll,
  } = useFormValidation();

  const validateContactInfo = useCallback(
    (data) => {
      const fields = [
        { field: "altPhone", value: data.altPhone },
        { field: "email", value: data.email },
        { field: "address", value: data.address },
      ];

      markAllTouched(["altPhone", "email", "address"]);
      return validateAll(fields);
    },
    [markAllTouched, validateAll]
  );

  const isContactInfoValid = useCallback((data) => {
    return !!(
      data.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
      data.address?.trim() &&
      (!data.altPhone || data.altPhone.match(/^(\+91)?\d{10}$/))
    );
  }, []);

  return {
    errors,
    touched,
    validateField,
    handleBlur,
    validateContactInfo,
    isContactInfoValid,
  };
};

// ============================================
// Company Info Logic
// ============================================

export const useCompanyForm = () => {
  const [errors, setErrors] = useState({});

  const validateField = useCallback(
    (field, value, isCompanyStarted = false) => {
      if (!isCompanyStarted) {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[field];
          return newErrors;
        });
        return true;
      }

      let error = "";

      switch (field) {
        case "companyName":
          if (!value || value.trim() === "") {
            error = "Company name is required";
          } else if (value.trim().length < 3) {
            error = "Company name must be at least 3 characters";
          }
          break;

        case "gstNumber":
          if (!value || value.trim() === "") {
            error = "GST number is required";
          } else if (value.trim().length !== 15) {
            error = "GST number must be 15 characters";
          } else if (
            !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
              value.trim().toUpperCase()
            )
          ) {
            error = "Invalid GST number format";
          }
          break;

        case "workingHours":
          if (value?.start && value?.end) {
            error = validateTimeRange(value.start, value.end);
          }
          break;

        default:
          break;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: error,
      }));

      return !error;
    },
    []
  );

  const validateCompanyInfo = useCallback((companyData) => {
    const newErrors = {};
    const isCompanyStarted = isCompanyInformationStarted(companyData);

    if (!isCompanyStarted) {
      setErrors({});
      return true;
    }

    // Validate all fields if company info is started
    if (!companyData.companyName || companyData.companyName.trim() === "") {
      newErrors.companyName = "Company name is required";
    }

    if (!companyData.gstNumber || companyData.gstNumber.trim() === "") {
      newErrors.gstNumber = "GST number is required";
    } else if (companyData.gstNumber.trim().length !== 15) {
      newErrors.gstNumber = "GST number must be 15 characters";
    }

    if (!companyData.workingHours) {
      newErrors.workingHours = "Working hours are required";
    } else {
      const value = companyData.workingHours;
      if (value?.start && value?.end) {
        newErrors.workingHours = validateTimeRange(value.start, value.end);
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const isCompanyInformationStarted = useCallback((companyData) => {
    return (
      (companyData?.companyName && companyData.companyName.trim() !== "") ||
      (companyData?.gstNumber && companyData.gstNumber.trim() !== "")
    );
  }, []);

  const isCompanyInfoValid = useCallback(
    (companyData) => {
      if (!isCompanyInformationStarted(companyData)) {
        return true; // Not started, so considered valid
      }

      const newErrors = {};

      if (!companyData.companyName || companyData.companyName.trim() === "") {
        newErrors.companyName = "Company name is required";
      }

      if (!companyData.gstNumber || companyData.gstNumber.trim() === "") {
        newErrors.gstNumber = "GST number is required";
      } else if (companyData.gstNumber.trim().length !== 15) {
        newErrors.gstNumber = "GST number must be 15 characters";
      }

      if (!companyData.workingHours) {
        newErrors.workingHours = "Working hours are required";
      } else {
        const value = companyData.workingHours;
        if (value?.start && value?.end) {
          newErrors.workingHours = validateTimeRange(value.start, value.end);
        }
      }

      return Object.keys(newErrors).length === 0;
    },
    [isCompanyInformationStarted]
  );

  return {
    errors,
    validateField,
    validateCompanyInfo,
    isCompanyInfoValid,
    isCompanyInformationStarted,
  };
};

// ============================================
// Profession Selection Logic
// ============================================

export const useProfessionForm = () => {
  const [error, setError] = useState("");

  const validateProfessions = useCallback((professions) => {
    if (!professions || professions.length === 0) {
      setError("Please select at least one profession");
      return false;
    }

    for (const prof of professions) {
      if (!prof.services || prof.services.length === 0) {
        setError(
          `Please select at least one service for ${prof.categoryTitle}`
        );
        return false;
      }
    }

    setError("");
    return true;
  }, []);

  const isProfessionsValid = useCallback((professions) => {
    return (
      professions &&
      professions.length > 0 &&
      professions.every((prof) => prof.services && prof.services.length > 0)
    );
  }, []);

  return {
    error,
    setError,
    validateProfessions,
    isProfessionsValid,
  };
};

// ============================================
// Experience & Rate Logic
// ============================================

export const useExperienceForm = () => {
  const [error, setError] = useState("");

  const buildExperienceData = useCallback((professions) => {
    const serviceList = professions.flatMap((prof) =>
      prof.services.map((s) => ({
        categoryTitle: prof.categoryTitle,
        ...s,
      }))
    );

    return serviceList;
  }, []);

  const validateExperience = useCallback((experienceData) => {
    for (const item of experienceData) {
      if (
        item.experience === "" ||
        item.experience === null ||
        item.experience === undefined
      ) {
        setError(`Please select experience for ${item.title}`);
        return false;
      }
    }

    setError("");
    return true;
  }, []);

  const isExperienceValid = useCallback((experienceData) => {
    return experienceData.every((item) => {
      const hasExperience =
        item.experience !== "" &&
        item.experience !== null &&
        item.experience !== undefined;

      return hasExperience;
    });
  }, []);

  return {
    error,
    setError,
    buildExperienceData,
    validateExperience,
    isExperienceValid,
  };
};

// ============================================
// Form Data Helpers
// ============================================

export const sanitizeInput = {
  fullName: (value) => {
    return value.replace(/[^a-zA-Z\s]/g, "").replace(/\s+/g, " ");
  },

  numericOnly: (value, maxLength) => {
    return value.replace(/\D/g, "").slice(0, maxLength);
  },

  lettersAndSpaces: (value) => {
    return value.replace(/[^a-zA-Z\s]/g, "");
  },

  email: (value) => {
    return value.trim();
  },

  url: (value) => {
    let sanitized = value.trim().replace(/\s/g, "");
    return sanitized;
  },

  alphanumeric: (value, maxLength = null) => {
    let sanitized = value.replace(/[^a-zA-Z0-9]/g, "");
    if (maxLength) {
      sanitized = sanitized.slice(0, maxLength);
    }
    return sanitized;
  },

  alphanumericWithSpaces: (value, maxLength = null) => {
    let sanitized = value.replace(/[^a-zA-Z0-9\s]/g, "");
    if (maxLength) {
      sanitized = sanitized.slice(0, maxLength);
    }
    return sanitized;
  },

  gstNumber: (value) => {
    // GST format: 15 characters alphanumeric
    let sanitized = value
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 15);
    return sanitized;
  },
};

export const formatExperienceLabel = (years) => {
  return `${years} year${years > 1 ? "s" : ""}`;
};

export const getFieldValue = (formData, field) => {
  if (field in formData.personal) return formData.personal[field];
  if (field in formData.contact) return formData.contact[field];
  if (field === "professions") return formData.professions || [];

  if (field.includes("@")) {
    const [categoryId, serviceId, subField] = field.split("@");
    const item = formData.experience?.find(
      (e) => e.categoryId === categoryId && e.serviceId === serviceId
    );
    return item?.[subField] || "";
  }

  return "";
};
