import { useState, useRef, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUser } from "@/context/UserContext";

export const usePhoneLogin = (onLogin) => {
  const { fetchProfile } = useUser();
  const [step, setStep] = useState(1); // 1=phone, 2=name, 3=otp
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
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

      const { data: existing, error: existingError } = await supabase
        .from("profile")
        .select("id")
        .eq("phone_number", fullPhoneNumber)
        .maybeSingle();

      if (existingError) throw existingError;

      if (!existing) {
        setIsNewUser(true);
        setStep(2);
        return;
      }

      setIsNewUser(false);

      const { error: signInError } = await supabase.auth.signInWithOtp({
        phone: fullPhoneNumber,
      });

      if (signInError) throw signInError;

      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNameSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fullPhoneNumber = `+91${phoneNumber.replace(/\D/g, "")}`;

      const { error: signInError } = await supabase.auth.signInWithOtp({
        phone: fullPhoneNumber,
      });

      if (signInError) throw signInError;

      setStep(3);
    } catch (err) {
      setError(err.message);
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
      if (!userId) throw new Error("Could not retrieve user ID.");

      try {
        const { data: profileData } = await supabase
          .from("profile")
          .select("id")
          .eq("id", userId)
          .single();

        if (!profileData) {
          await supabase.from("profile").upsert(
            {
              id: userId,
              phone_number: fullPhoneNumber,
              first_name: firstName || "",
              last_name: lastName || "",
            },
            { onConflict: "id" }
          );
        }
      } catch (profileErr) {
        console.error("Profile creation error:", profileErr);
      }

      await fetchProfile(userId);

      setSuccess(true);
      setTimeout(() => onLogin?.(), 1000);
    } catch (err) {
      setError(err.message);
      setOtp(Array(6).fill(""));
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const reset = useCallback(() => {
    setStep(1);
    setPhoneNumber("");
    setFirstName("");
    setLastName("");
    setOtp(Array(6).fill(""));
    setError("");
    setSuccess(false);
    setLoading(false);
  }, []);

  return {
    step,
    phoneNumber,
    setPhoneNumber,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    isNewUser,
    otp,
    setOtp,
    otpRefs,
    error,
    success,
    loading,
    handlePhoneSubmit,
    handleNameSubmit,
    handleOtpChange,
    handleOtpSubmit,
    reset,
  };
};
