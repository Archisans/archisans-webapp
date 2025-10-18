// ============================================
// Validation Logic
// ============================================

export const validators = {
  aadhaar: (value) => {
    if (!value) return "Aadhaar is required";
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
    if (value && !/^\d{10}$/.test(value))
      return "Alternate Phone must be 10 digits";
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

  rate: (value, isRequired = false) => {
    if (isRequired && !value) return "Rate is required";
    return "";
  },

  rateBasis: (value, isRequired = false) => {
    if (isRequired && !value) return "Rate basis is required";
    return "";
  },
};

// ============================================
// Form Validation
// ============================================

import { useState, useCallback, useMemo } from "react";

export const useFormValidation = (initialFields = {}) => {
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

export const usePersonalInfoForm = (formData, updateFormData) => {
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
        { field: "aadhaar", value: data.aadhaar },
        { field: "dob", value: data.dob },
        { field: "gender", value: data.gender },
      ];

      markAllTouched(["aadhaar", "dob", "gender"]);
      return validateAll(fields);
    },
    [markAllTouched, validateAll]
  );

  const isPersonalInfoValid = useCallback((data) => {
    return !!(
      data.aadhaar?.match(/^\d{12}$/) &&
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

export const useContactInfoForm = (formData, updateFormData) => {
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
// Profession Selection Logic
// ============================================

export const useProfessionForm = (formData, updateFormData) => {
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

export const useExperienceForm = (formData) => {
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

      // For artisan professions, rate and rateBasis are required
      const isArtisan = item.categoryTitle?.toLowerCase() === "artisans";

      if (isArtisan) {
        if (!item.rate) {
          setError(`Please enter rate for ${item.title}`);
          return false;
        }
        if (!item.rateBasis) {
          setError(`Please select rate type for ${item.title}`);
          return false;
        }
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
      const isArtisan = item.categoryTitle?.toLowerCase() === "artisans";

      if (!hasExperience) return false;

      if (isArtisan) {
        return !!(item.rate && item.rateBasis);
      }

      return true;
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
  numericOnly: (value, maxLength) => {
    return value.replace(/\D/g, "").slice(0, maxLength);
  },

  lettersAndSpaces: (value) => {
    return value.replace(/[^a-zA-Z\s]/g, "");
  },

  email: (value) => {
    return value.trim();
  },
};

export const formatExperienceLabel = (years) => {
  if (years === 0) return "Less than 1 year";
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
