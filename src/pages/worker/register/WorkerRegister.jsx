import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useBootstrapConfiguration } from "@/hooks/useBootstrapConfiguration";
import { useUser } from "@/context/UserContext";
import { useWorker } from "@/context/WorkerContext";
import { useNavigate } from "react-router-dom";
import SubmissionStatusSnackbar from "@/components/common/SubmissionStatusSnackbar";
import WorkerForm1 from "@/features/WorkerForm/Mobile/workerForm1";
import WorkerForm2 from "@/features/WorkerForm/Mobile/workerForm2";
import WorkerForm3 from "@/features/WorkerForm/Mobile/workerForm3";
import WorkerForm4 from "@/features/WorkerForm/Mobile/workerForm4";
import WorkerForm5 from "@/features/WorkerForm/Mobile/workerForm5";
import WorkerForm6 from "@/features/WorkerForm/Mobile/workerForm6";
import WorkerForm7 from "@/features/WorkerForm/Mobile/workerForm7";
import WorkerForm from "@/features/WorkerForm/WorkerForm";
import { RouteProvider } from "@/config/RouteProvider";

export default function WorkerRegister() {
  const { profile } = useUser();
  const { bootstrapConfiguration } = useBootstrapConfiguration();
  const { saveCompleteProfile } = useWorker();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  useEffect(() => {
    if (!profile.phoneNumber) return;

    if (profile.isWorker) {
      navigate(RouteProvider.WORKER_HOME);
    }
  }, [profile]);

  const [formData, setFormData] = useState({
    personal: {
      fullName: profile.fullName,
      imageUrl: profile.imageUrl,
      dob: "",
      gender: "",
      aadhaar: "",
    },
    contact: {
      phone: profile.phoneNumber,
      altPhone: null,
      email: "",
      address: "",
    },
    socialMedia: {},
    company: {},
    professions: [],
    coverPhoto: null,
    about: "",
  });

  const handleSubmit = async () => {
    setSubmissionStatus({ loading: true, success: false, error: "" });

    try {
      await saveCompleteProfile(formData);
      setSubmissionStatus({ loading: false, success: true, error: "" });
      navigate(RouteProvider.WORKER_HOME);
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
            />
          )}
          {currentStep === 3 && (
            <WorkerForm4
              formData={formData}
              updateFormData={updateFormData}
              next={() => setCurrentStep(4)}
              back={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 4 && (
            <WorkerForm5
              formData={formData}
              updateFormData={updateFormData}
              next={() => setCurrentStep(5)}
              back={() => setCurrentStep(3)}
            />
          )}
          {currentStep === 5 && (
            <WorkerForm6
              formData={formData}
              updateFormData={updateFormData}
              next={() => setCurrentStep(6)}
              back={() => setCurrentStep(4)}
              services={services}
            />
          )}
          {currentStep === 6 && (
            <WorkerForm7
              formData={formData}
              updateFormData={updateFormData}
              onSubmit={handleSubmit}
              back={() => setCurrentStep(5)}
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
