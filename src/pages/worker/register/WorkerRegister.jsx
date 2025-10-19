import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useBootstrapConfiguration } from "@/hooks/useBootstrapConfiguration";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import WorkerForm1 from "@/features/WorkerRegistration/Mobile/workerForm1";
import WorkerForm2 from "@/features/WorkerRegistration/Mobile/workerForm2";
import WorkerForm3 from "@/features/WorkerRegistration/Mobile/workerForm3";
import WorkerForm4 from "@/features/WorkerRegistration/Mobile/workerForm4";
import WorkerForm from "@/features/WorkerRegistration/WorkerForm";
import SubmissionStatusSnackbar from "@/components/common/SubmissionStatusSnackbar";

export default function WorkerRegister() {
  const { profile } = useUser();
  const { bootstrapConfiguration } = useBootstrapConfiguration();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  useEffect(() => {
    if (!profile) return;

    const isProfileComplete = profile.fullName && profile.imageUrl;

    if (!isProfileComplete) {
      navigate("/profile", {
        state: { message: "Please complete your profile to continue" },
      });
    }
  }, [profile, navigate]);

  if (!profile.fullName || !profile.imageUrl) {
    return null;
  }

  const [formData, setFormData] = useState({
    personal: {
      fullName: profile.fullName || "",
      dob: "2002-02-02",
      gender: "MALE",
      aadhaar: "123456789012",
    },
    contact: {
      phone: profile.phoneNumber || "",
      email: "xyz@gmail.com",
      address: "xyz 123",
    },
    professions: [],
    uploadedImage: profile.imageUrl || null,
  });

  const handleSubmit = async () => {
    setSubmissionStatus({ loading: true, success: false, error: "" });

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() > 0.2;
          if (isSuccess) resolve();
          else reject(new Error("Network error: please try again."));
        }, 2000);
      });
      setSubmissionStatus({ loading: false, success: true, error: "" });
    } catch (err) {
      setSubmissionStatus({
        loading: false,
        success: false,
        error: err?.message || "Something went wrong. Please try again.",
      });
    }
  };

  // Step state for mobile
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (section, data) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const services = bootstrapConfiguration?.serviceCategories || [];

  return (
    <>
      {isMobile ? (
        <>
          {currentStep === 0 && (
            <WorkerForm1
              formData={formData}
              updateFormData={updateFormData}
              next={() => setCurrentStep(1)}
              back={() => navigate("/")}
            />
          )}
          {currentStep === 1 && (
            <WorkerForm2
              formData={formData}
              updateFormData={updateFormData}
              next={() => setCurrentStep(2)}
              back={() => setCurrentStep(0)}
            />
          )}
          {currentStep === 2 && (
            <WorkerForm3
              formData={formData}
              updateFormData={updateFormData}
              next={() => setCurrentStep(3)}
              back={() => setCurrentStep(1)}
              services={services}
            />
          )}
          {currentStep === 3 && (
            <WorkerForm4
              formData={formData}
              updateFormData={updateFormData}
              onSubmit={handleSubmit}
              back={() => setCurrentStep(2)}
              services={services}
              submissionStatus={submissionStatus}
            />
          )}
        </>
      ) : (
        <WorkerForm
          formData={formData}
          updateFormData={updateFormData}
          services={services}
          onSubmit={handleSubmit}
          submissionStatus={submissionStatus}
        />
      )}

      <SubmissionStatusSnackbar
        submissionStatus={submissionStatus}
        onClose={() =>
          setSubmissionStatus({ loading: false, success: false, error: "" })
        }
      />
    </>
  );
}
