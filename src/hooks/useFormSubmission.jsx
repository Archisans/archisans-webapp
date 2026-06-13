import { useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabaseClient"

const CLIENT_COOLDOWN_MS = 60 * 1000; // 1 min
const STORAGE_KEY_PREFIX = "form_submit_last_";

export const useFormSubmission = ({
  formType,
  initialFormData = {},
  validateForm,
  onSuccess = null,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);

  const setField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const getLastSubmitTime = () => {
    try {
      return Number(localStorage.getItem(STORAGE_KEY_PREFIX + formType)) || 0;
    } catch {
      return 0;
    }
  };

  const setLastSubmitTime = () => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + formType, String(Date.now()));
    } catch {
      /* ignore errors*/
    }
  };

  const checkClientCooldown = () => {
    const last = getLastSubmitTime();
    if (!last) return { allowed: true };
    const elapsed = Date.now() - last;
    if (elapsed < CLIENT_COOLDOWN_MS) {
      const remaining = Math.ceil((CLIENT_COOLDOWN_MS - elapsed) / 1000);
      return {
        allowed: false,
        message: `Please wait ${remaining}s before submitting again.`,
      };
    }
    return { allowed: true };
  };

  const handleSubmit = useCallback(
    async (e) => {
      if (e?.preventDefault) e.preventDefault();
      setErrorMessage("");

      if (submittingRef.current) return;

      if (validateForm) {
        const { isValid, errors: validationErrors } = validateForm(formData);
        setErrors(validationErrors || {});
        if (!isValid) {
          setErrorMessage("Please fix the highlighted errors before submitting.");
          return;
        }
      }

      // Client-side cooldown
      const cooldown = checkClientCooldown();
      if (!cooldown.allowed) {
        setErrorMessage(cooldown.message);
        return;
      }

      setIsSubmitting(true);
      submittingRef.current = true;

      try {
        const { data, error } = await supabase.functions.invoke("submit-form", {
          body: {
            formType,
            payload: formData,
          },
        });

        if (error) {
            console.log(error);
          const message =
            error.context?.error ||
            error.message ||
            "Submission failed. Please try again.";
          throw new Error(message);
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        setIsSubmitted(true);
        setLastSubmitTime();
        setFormData(initialFormData);
        setErrors({});
        onSuccess?.(data);
      } catch (err) {
        setErrorMessage(
          err.message ||
            "Unable to submit the form right now. Please try again shortly."
        );
      } finally {
        setIsSubmitting(false);
        submittingRef.current = false;
      }
    },
    [formData, formType, validateForm, initialFormData, onSuccess]
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setErrorMessage("");
    setIsSubmitted(false);
  }, [initialFormData]);

  return {
    formData,
    setFormData,
    setField,
    errors,
    setErrors,
    errorMessage,
    isSubmitting,
    isSubmitted,
    handleSubmit,
    resetForm,
  };
};
