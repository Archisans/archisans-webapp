import { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Close, ArrowForward } from "@mui/icons-material";
import { usePhoneLogin } from "@/hooks/usePhoneLogin";

const LoginModal = ({ open, onClose, onLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    step,
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    otpRefs,
    error,
    success,
    loading,
    handlePhoneSubmit,
    handleOtpChange,
    handleOtpSubmit,
    reset,
  } = usePhoneLogin(onLogin);
  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (open && step === 1 && !success) {
      const timer = setTimeout(() => {
        phoneInputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }

    if (step === 2 && open) {
      const timer = setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, step, success]);


  useEffect(() => {
    if (step === 2 && open) {
      const timer = setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [step, open]);

  const handleClose = () => {
    if (location.pathname !== "/") {
      navigate(-1);
      return;
    }
    reset();
    onClose();
  };

  const glassStyle = {
    backdropFilter: "blur(20px)",
    background: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    borderRadius: "24px",
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Box
              sx={{
                ...glassStyle,
                p: 0,
                maxWidth: 440,
                width: "90vw",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Close Button */}
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  color: "#6b7280",
                  zIndex: 10,
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.08)",
                    color: "#374151",
                  },
                }}
              >
                <Close />
              </IconButton>

              <Box sx={{ p: 5, color: "#1f2937", textAlign: "center" }}>
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box
                        sx={{
                          fontSize: "4rem",
                          mb: 2,
                          background:
                            "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        ✓
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          fontSize: "1.8rem",
                          color: "#111827",
                        }}
                      >
                        Welcome Back!
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.95rem" }}
                      >
                        Successfully logged in as +91 {phoneNumber}
                      </Typography>
                    </motion.div>
                  ) : step === 1 ? (
                    <motion.div
                      key="phone"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          fontSize: "1.9rem",
                          color: "#111827",
                        }}
                      >
                        Login
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", mb: 4, fontSize: "0.95rem" }}
                      >
                        Enter your phone number to continue
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 4,
                          gap: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "#f3f4f6",
                            borderRadius: 2,
                            px: 3,
                            py: 2.5,
                            border: "1px solid #e5e7eb",
                            fontWeight: 600,
                            color: "#374151",
                            fontSize: "1.05rem",
                          }}
                        >
                          +91
                        </Box>
                        <input
                          ref={phoneInputRef}
                          type="text"
                          placeholder="Enter phone number"
                          value={phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);
                            setPhoneNumber(value);
                          }}
                          onKeyDown={(e) => {
                            if (
                              e.key === "Enter" &&
                              phoneNumber.length === 10 &&
                              !loading
                            ) {
                              handlePhoneSubmit();
                            }
                          }}
                          style={{
                            flex: 1,
                            padding: "14px 18px",
                            borderRadius: "12px",
                            border: "1px solid #e5e7eb",
                            backgroundColor: "#f9fafb",
                            color: "#111827",
                            fontSize: "1.05rem",
                            outline: "none",
                            transition: "all 0.2s",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#3b82f6";
                            e.target.style.backgroundColor = "#fff";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e5e7eb";
                            e.target.style.backgroundColor = "#f9fafb";
                          }}
                        />
                      </Box>

                      <Button
                        onClick={handlePhoneSubmit}
                        disabled={phoneNumber.length !== 10 || loading}
                        endIcon={
                          loading ? (
                            <CircularProgress
                              size={20}
                              sx={{ color: "white" }}
                            />
                          ) : (
                            <ArrowForward />
                          )
                        }
                        sx={{
                          bgcolor: "#3b82f6",
                          color: "white",
                          fontWeight: 600,
                          py: 2.5,
                          px: 4,
                          borderRadius: 3,
                          width: "100%",
                          fontSize: "1rem",
                          textTransform: "none",
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                          "&:hover": {
                            bgcolor: "#2563eb",
                            boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
                          },
                          "&:disabled": {
                            bgcolor: "#e5e7eb",
                            color: "#9ca3af",
                            boxShadow: "none",
                          },
                        }}
                      >
                        {loading ? "Sending..." : "Send OTP"}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="otp"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          fontSize: "1.9rem",
                          color: "#111827",
                        }}
                      >
                        Verify OTP
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", mb: 4, fontSize: "0.95rem" }}
                      >
                        Code sent to +91 {phoneNumber}
                      </Typography>

                      {/* OTP Boxes */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 3,
                          gap: 1,
                        }}
                      >
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => (otpRefs.current[index] = el)}
                            value={digit}
                            maxLength={1}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 1);
                              handleOtpChange(value, index);
                              setOtp((prev) => {
                                const newOtp = [...prev];
                                newOtp[index] = value;
                                return newOtp;
                              });

                              // Move focus to next input if filled
                              if (value && index < otp.length - 1) {
                                otpRefs.current[index + 1]?.focus();
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Backspace") {
                                e.preventDefault();

                                if (otp[index] !== "") {
                                  handleOtpChange("", index);
                                  setOtp((prev) => {
                                    const newOtp = [...prev];
                                    newOtp[index] = "";
                                    return newOtp;
                                  });
                                } else if (index > 0) {
                                  otpRefs.current[index - 1]?.focus();
                                }
                              }

                              if (
                                e.key === "Enter" &&
                                otp.join("").length === 6 &&
                                !loading
                              ) {
                                handleOtpSubmit();
                              }
                            }}
                            style={{
                              width: "52px",
                              height: "60px",
                              textAlign: "center",
                              fontSize: "1.6rem",
                              borderRadius: "12px",
                              border: "2px solid #e5e7eb",
                              backgroundColor: "#f9fafb",
                              color: "#111827",
                              fontWeight: 600,
                              outline: "none",
                              transition: "all 0.2s",
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#3b82f6";
                              e.target.style.backgroundColor = "#fff";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e5e7eb";
                              e.target.style.backgroundColor = "#f9fafb";
                            }}
                          />
                        ))}
                      </Box>

                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                          onClick={handleOtpSubmit}
                          disabled={otp.join("").length !== 6 || loading}
                          endIcon={
                            loading ? (
                              <CircularProgress
                                size={20}
                                sx={{ color: "white" }}
                              />
                            ) : null
                          }
                          sx={{
                            bgcolor: "#3b82f6",
                            color: "white",
                            fontWeight: 600,
                            py: 2.5,
                            px: 4,
                            borderRadius: 3,
                            flex: 1,
                            fontSize: "1rem",
                            textTransform: "none",
                            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                            "&:hover": {
                              bgcolor: "#2563eb",
                              boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
                            },
                            "&:disabled": {
                              bgcolor: "#e5e7eb",
                              color: "#9ca3af",
                              boxShadow: "none",
                            },
                          }}
                        >
                          {loading ? "Verifying..." : "Verify & Login"}
                        </Button>
                      </Box>
                    </motion.div>
                  )}
                  {error && (
                    <Typography
                      sx={{
                        color: "#dc2626",
                        fontSize: "0.9rem",
                        mt: 2,
                      }}
                    >
                      {error}
                    </Typography>
                  )}
                </AnimatePresence>
              </Box>
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;