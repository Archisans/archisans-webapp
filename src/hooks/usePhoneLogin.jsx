import { useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";

export const usePhoneLogin = (onLogin) => {
  const [step, setStep] = useState(1); // 1 = phone, 2 = otp
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef([]);

  const handlePhoneSubmit = async () => {
    const cleanedPhone = phoneNumber.replace(/\D/g, "");
    if (cleanedPhone.length !== 10) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fullPhoneNumber = `+91${cleanedPhone}`;

      const { error: signInError } = await supabase.auth.signInWithOtp({
        phone: fullPhoneNumber,
      });

      if (signInError) throw signInError;

      setStep(2);
    } catch (err) {
      console.error("Send OTP Error:", err);
      setError(err.message || "Failed to send OTP. Try again.");
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
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Enter the full 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fullPhoneNumber = `+91${phoneNumber.replace(/\D/g, "")}`;

      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        phone: fullPhoneNumber,
        token: otpValue,
        type: "sms",
      });

      if (verifyError) throw verifyError;

      const userId = data?.session?.user?.id;
      if (!userId) throw new Error("Unable to get user ID from session.");

      try {
        const { data: profileData, error: fetchError } = await supabase
          .from("profile")
          .select("id")
          .eq("id", userId)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

        if (!profileData) {
          await supabase.from("profile").upsert(
            {
              id: userId,
              phone_number: fullPhoneNumber,
              first_name: "",
              last_name: "",
            },
            { onConflict: "id" }
          );
        }
      } catch (err) {
        console.error("Profile creation error:", err);
      }

      setSuccess(true);
      setTimeout(() => onLogin?.(), 1000);
    } catch (err) {
      console.error("OTP Verification Error:", err);
      setError(err.message || "Incorrect OTP. Try again.");
      setOtp(Array(6).fill(""));
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setPhoneNumber("");
    setOtp(Array(6).fill(""));
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
