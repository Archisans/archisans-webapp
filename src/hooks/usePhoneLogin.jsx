import { useState, useRef } from "react";
import { useSignIn } from "@clerk/clerk-react";

export const usePhoneLogin = (onLogin) => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [step, setStep] = useState(1); // 1=phone, 2=otp
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef([]);

  const handlePhoneSubmit = async () => {
    if (!isLoaded || phoneNumber.length !== 10) return;
    setLoading(true);
    setError("");

    try {
      const fullPhoneNumber = `+91${phoneNumber}`;
      const signInResponse = await signIn.create({
        identifier: fullPhoneNumber,
      });

      const phoneNumberId = signInResponse.supportedFirstFactors.find(
        (factor) => factor.strategy === "phone_code"
      )?.phoneNumberId;

      if (!phoneNumberId) throw new Error("Phone number not configured");

      await signIn.prepareFirstFactor({
        strategy: "phone_code",
        phoneNumberId,
      });

      setStep(2);
    } catch (err) {
      console.error(err);
      setError(err.errors?.[0]?.message || err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    if (!value && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const handleOtpSubmit = async () => {
    if (!isLoaded) return;

    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;

    setLoading(true);
    setError("");

    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "phone_code",
        code: otpValue,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });

        setSuccess(true);
        setTimeout(() => {
          onLogin?.();
        }, 1000);
      } else {
        setError("Verification incomplete. Try again.");
      }
    } catch (err) {
      console.error("OTP Error:", err);
      setError(err.errors?.[0]?.message || "Incorrect OTP. Try again.");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setPhoneNumber("");
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccess(false);
    setLoading(false);
  };

  return {
    step,
    phoneNumber,
    setPhoneNumber,
    otp,
    otpRefs,
    error,
    success,
    loading,
    handlePhoneSubmit,
    handleOtpChange,
    handleOtpSubmit,
    reset,
  };
};
