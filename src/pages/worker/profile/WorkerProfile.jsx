import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { BREAKPOINTS } from "@/config/breakPoints";
import { useBootstrapConfiguration } from "@/hooks/useBootstrapConfiguration";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "@/components/PageLoader";
import SubmissionStatusSnackbar from "@/components/Common/SubmissionStatusSnackbar";
import WorkerForm1 from "@/features/WorkerForm/Mobile/WorkerForm1";
import WorkerForm2 from "@/features/WorkerForm/Mobile/WorkerForm2";
import WorkerForm3 from "@/features/WorkerForm/Mobile/WorkerForm3";
import WorkerForm4 from "@/features/WorkerForm/Mobile/WorkerForm4";
import WorkerForm5 from "@/features/WorkerForm/Mobile/WorkerForm5";
import WorkerForm6 from "@/features/WorkerForm/Mobile/WorkerForm6";
import WorkerForm7 from "@/features/WorkerForm/Mobile/WorkerForm7";
import WorkerForm from "@/features/WorkerForm/WorkerForm";
import { RouteProvider } from "@/config/RouteProvider";
import { useWorker } from "@/context/WorkerContext";

export default function WorkerProfile() {
  const { bootstrapConfiguration } = useBootstrapConfiguration();
  const { worker, loading, saveCompleteProfile } = useWorker();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(BREAKPOINTS.mobile);

  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const [formData, setFormData] = useState({
    personal: {},
    contact: {},
    socialMedia: [],
    company: {},
    professions: [],
    coverPhoto: null,
    about: "",
  });
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (section, data) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

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

  const services = bootstrapConfiguration?.serviceCategories || [];

  useEffect(() => {
    if (!loading && worker) {
      setFormData(worker);
    }
  }, [worker, loading]);

  if (loading) {
    return <PageLoader text="Loading your worker profile..." />;
  }

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
          registerMode={false}
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
