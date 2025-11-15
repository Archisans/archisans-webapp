import BottomDrawerLayout from "@/layouts/BottomDrawer/BottomDrawer";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { usePhoneLogin } from "@/hooks/usePhoneLogin";
import { ArrowForward } from "@mui/icons-material";

export default function LoginDrawer({ open, setOpen, height, onLogin }) {
  const [focus, setFocus] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [initialHeight, setInitialHeight] = useState(window.innerHeight);
  const [drawerHeight, setDrawerHeight] = useState(height);

  const {
    step,
    phoneNumber,
    setPhoneNumber,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    otp,
    otpRefs,
    error,
    loading,
    handlePhoneSubmit,
    handleNameSubmit,
    handleOtpChange,
    handleOtpSubmit,
    reset,
  } = usePhoneLogin(onLogin || (() => setOpen(false)));

  useEffect(() => {
    const calculateDrawerHeight = () => {
      const contentElement = document.getElementById("login-drawer-content");
      if (!contentElement) return;

      const contentHeight = contentElement.scrollHeight;
      const padding = 48;
      const minHeight = 300;
      const maxHeight = window.innerHeight * 0.9;

      let calculatedHeight = contentHeight + padding;
      calculatedHeight = Math.max(
        minHeight,
        Math.min(calculatedHeight, maxHeight)
      );

      setDrawerHeight(`${calculatedHeight}px`);
    };

    if (open) {
      const timer = setTimeout(calculateDrawerHeight, 100);
      return () => clearTimeout(timer);
    }
  }, [open, step, error]);

  useEffect(() => {
    setInitialHeight(window.innerHeight);

    const updateViewport = () => {
      const viewportHeight = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;

      const heightDiff = initialHeight - viewportHeight;
      const kbOpen = heightDiff > 150;
      setKeyboardOpen(kbOpen);

      if (focus && kbOpen) {
        const visibleHeight = viewportHeight;
        const targetHeight = Math.max(300, visibleHeight - 24);
        setDrawerHeight(`${targetHeight}px`);

        const active = document.activeElement;
        if (active && typeof active.scrollIntoView === "function") {
          setTimeout(() => {
            try {
              active.scrollIntoView({ behavior: "smooth", block: "center" });
            } catch {
              void 0;
            }
          }, 50);
        }
      } else {
        const contentElement = document.getElementById("login-drawer-content");
        if (contentElement) {
          const contentHeight = contentElement.scrollHeight;
          const padding = 48;
          const minHeight = 300;
          const maxHeight = window.innerHeight * 0.9;

          let calculatedHeight = contentHeight + padding;
          calculatedHeight = Math.max(
            minHeight,
            Math.min(calculatedHeight, maxHeight)
          );
          setDrawerHeight(`${calculatedHeight}px`);
        }
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateViewport);
      window.visualViewport.addEventListener("scroll", updateViewport);
    } else {
      window.addEventListener("resize", updateViewport);
    }
    updateViewport();

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateViewport);
        window.visualViewport.removeEventListener("scroll", updateViewport);
      } else {
        window.removeEventListener("resize", updateViewport);
      }
    };
  }, [initialHeight, focus, step]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;

    if (step === 1) {
      const timer = setTimeout(() => {
        const phoneInput = document.getElementById("phone-input-drawer");
        phoneInput?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }

    if (step === 2) {
      const timer = setTimeout(() => {
        const firstNameInput = document.getElementById("first-name-drawer");
        firstNameInput?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }

    if (step === 3) {
      const timer = setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, step, otpRefs]);

  const getTitle = () => {
    if (step === 1) return "Login or SignUp";
    if (step === 2) return "Create Profile";
    if (step === 3) return "Verify OTP";
    return "Welcome!";
  };

  const getSubtitle = () => {
    if (step === 1) return "Enter your phone number to continue";
    if (step === 2) return "This phone number is new! Tell us your name.";
    if (step === 3) return `Code sent to +91 ${phoneNumber}`;
    return "";
  };

  return (
    <BottomDrawerLayout
      open={open}
      setOpen={setOpen}
      height={drawerHeight}
      headerBar={false}
      closeIcon={true}
    >
      <Box id="login-drawer-content" sx={{ width: "100%" }}>
        <Box sx={{ width: "90%", mx: "auto", textAlign: "center", mb: 0.5 }}>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#111827",
              mb: 0.5,
            }}
          >
            {getTitle()}
          </Typography>
          <Typography sx={{ fontSize: "0.85rem", color: "#6b7280" }}>
            {getSubtitle()}
          </Typography>
        </Box>

        {/* Step 1: Phone Number */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePhoneSubmit();
            }}
            style={{ width: "100%" }}
          >
            <TextField
              id="phone-input-drawer"
              variant="outlined"
              fullWidth
              placeholder="Enter 10-digit number"
              type="tel"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ fontWeight: 600, color: "#374151" }}>
                      +91
                    </Typography>
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#f9fafb",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                  },
                },
              }}
            />

            {error && (
              <Typography sx={{ color: "#dc2626", fontSize: 12, mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={phoneNumber.length !== 10 || loading}
              endIcon={
                loading ? (
                  <CircularProgress size={18} sx={{ color: "white" }} />
                ) : (
                  <ArrowForward />
                )
              }
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                bgcolor: "#3b82f6",
                "&:hover": {
                  bgcolor: "#2563eb",
                },
                "&:disabled": {
                  bgcolor: "#e5e7eb",
                  color: "#9ca3af",
                },
              }}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        )}

        {/* Step 2: Name Collection */}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNameSubmit();
            }}
            style={{ width: "100%" }}
          >
            <TextField
              id="first-name-drawer"
              variant="outlined"
              fullWidth
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && firstName.trim().length > 0) {
                  e.preventDefault();
                  document.getElementById("last-name-drawer")?.focus();
                }
              }}
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#f9fafb",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                  },
                },
              }}
            />

            <TextField
              id="last-name-drawer"
              variant="outlined"
              fullWidth
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#f9fafb",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                  },
                },
              }}
            />

            {error && (
              <Typography sx={{ color: "#dc2626", fontSize: 12, mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              endIcon={
                loading ? (
                  <CircularProgress size={18} sx={{ color: "white" }} />
                ) : null
              }
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                bgcolor: "#3b82f6",
                "&:hover": {
                  bgcolor: "#2563eb",
                },
                "&:disabled": {
                  bgcolor: "#e5e7eb",
                  color: "#9ca3af",
                },
              }}
            >
              {loading ? "Processing..." : "Continue"}
            </Button>
          </form>
        )}

        {/* Step 3: OTP Verification */}
        {step === 3 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOtpSubmit();
            }}
            style={{ width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                gap: 0.5,
              }}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  value={digit}
                  maxLength={1}
                  type="tel"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
                    handleOtpChange(val, index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      e.preventDefault();
                      if (otp[index] !== "") {
                        handleOtpChange("", index);
                      } else if (index > 0) {
                        otpRefs.current[index - 1]?.focus();
                      }
                    }
                  }}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                  style={{
                    width: "15%",
                    height: "50px",
                    textAlign: "center",
                    fontSize: "1.4rem",
                    borderRadius: "12px",
                    border: "2px solid #e5e7eb",
                    backgroundColor: "#f9fafb",
                    color: "#111827",
                    fontWeight: 600,
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </Box>

            {error && (
              <Typography sx={{ color: "#dc2626", fontSize: 12, mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={otp.join("").length !== 6 || loading}
              endIcon={
                loading ? (
                  <CircularProgress size={18} sx={{ color: "white" }} />
                ) : null
              }
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                bgcolor: "#3b82f6",
                "&:hover": {
                  bgcolor: "#2563eb",
                },
                "&:disabled": {
                  bgcolor: "#e5e7eb",
                  color: "#9ca3af",
                },
              }}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </Button>
          </form>
        )}

        <Box sx={{ fontSize: 10, color: "grey", mt: 2, textAlign: "center" }}>
          By continuing, you agree to archisans{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            Terms of use
          </Box>{" "}
          and{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            Privacy Policy
          </Box>
        </Box>
      </Box>
    </BottomDrawerLayout>
  );
}
