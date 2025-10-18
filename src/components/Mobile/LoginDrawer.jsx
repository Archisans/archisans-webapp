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

export default function LoginDrawer({ open, setOpen, height }) {
  const [focus, setFocus] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [initialHeight, _setInitialHeight] = useState(window.innerHeight);

  const {
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
  } = usePhoneLogin(() => setOpen(false));

  useEffect(() => {
    const handleResize = () => {
      const heightDiff = initialHeight - window.innerHeight;
      setKeyboardOpen(heightDiff > 150);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialHeight]);

  return (
    <BottomDrawerLayout
      open={open}
      setOpen={setOpen}
      height={focus && keyboardOpen ? "60vh" : height}
      headerBar={false}
      closeIcon={true}
    >
      <Box sx={{ width: "90%", textAlign: "center", mb: 1 }}>
        {success
          ? "Welcome Back!"
          : step === 1
          ? "Login or SignUp"
          : "Enter OTP"}
      </Box>

      {!success && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step === 1) handlePhoneSubmit();
            else handleOtpSubmit();
          }}
        >
          {step === 1 ? (
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Enter a 10-digit number"
              type="number"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
              sx={{ mt: 2 }}
            />
          ) : (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (otpRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center", fontSize: "1.1rem" },
                  }}
                  sx={{ width: "14%" }}
                />
              ))}
            </Box>
          )}

          {error && (
            <Typography sx={{ color: "red", fontSize: 12, mt: 1, mb: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={
              loading ||
              (step === 1
                ? phoneNumber.length !== 10
                : otp.join("").length !== 6)
            }
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : step === 1 ? (
              "Send OTP"
            ) : (
              "Verify OTP"
            )}
          </Button>
        </form>
      )}

      {success && (
        <Typography sx={{ mt: 2, color: "green", fontWeight: 600 }}>
          Successfully logged in!
        </Typography>
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
    </BottomDrawerLayout>
  );
}
