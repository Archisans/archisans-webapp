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
  const [currentStep, setCurrentStep] = useState(0);

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

  const forms = [
    WorkerForm1,
    WorkerForm2,
    WorkerForm3,
    WorkerForm4,
    WorkerForm5,
    WorkerForm6,
    WorkerForm7
  ];
  const CurrentForm = forms[currentStep] || WorkerForm1;


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

  const updateFormData = (section, data) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const services = bootstrapConfiguration?.serviceCategories || [];

  return (
<>
    {isMobile ? (
      <CurrentForm
        formData={formData}
        updateFormData={updateFormData}
        next={() => setCurrentStep(prev => Math.min(prev + 1, forms.length - 1))}
        back={() => {
          if (currentStep === 0) {
            navigate("/"); // leave form page only from first step
          } else {
            setCurrentStep(prev => prev - 1); // go to previous step
          }
        }}
        services={services}
        onSubmit={currentStep === forms.length - 1 ? handleSubmit : undefined}
        submissionStatus={submissionStatus}
      />
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
