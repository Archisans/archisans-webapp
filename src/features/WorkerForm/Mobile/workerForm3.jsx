import { Box, TextField, InputAdornment } from "@mui/material";
import BottomButton from "@/features/WorkerForm/Mobile/components/BottomButton";
import TopProgressBar from "@/features/WorkerForm/Mobile/components/TopProgressBar";
import { sanitizeInput } from "../utils/workerFormLogic";
import { Instagram, Facebook, YouTube, LinkedIn, Language } from "@mui/icons-material";

const WorkerForm3 = ({ formData, updateFormData, next, back }) => {
  const socialMedia = formData.socialMedia || {};

  const handleChange = (platform, value) => {
    updateFormData("socialMedia", {
      ...socialMedia,
      [platform]: value,
    });
  };

  const handleNext = () => {
    next();
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: 500,
        mx: "auto",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pb: { xs: 12, sm: 10 },
      }}
    >
      <Box>
        <TopProgressBar
          activeStep={2}
          onBack={back}
          pgnum="3/7"
          title="Social Media Profiles (Optional)"
        />

        <Box sx={{ mb: 3 }}>

          <TextField
            label="Website"
            placeholder="https://yourwebsite.com"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Language sx={{ color: "#555" }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Instagram"
            placeholder="https://instagram.com/yourprofile"
            fullWidth
            value={socialMedia.Instagram || ""}
            onChange={(e) =>
              handleChange("Instagram", sanitizeInput.url(e.target.value))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Instagram sx={{ color: "#E1306C" }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Facebook"
            placeholder="https://facebook.com/yourprofile"
            fullWidth
            value={socialMedia.Facebook || ""}
            onChange={(e) =>
              handleChange("Facebook", sanitizeInput.url(e.target.value))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Facebook sx={{ color: "#1877F2" }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField
            label="YouTube"
            placeholder="https://youtube.com/yourchannel"
            fullWidth
            value={socialMedia.YouTube || ""}
            onChange={(e) =>
              handleChange("YouTube", sanitizeInput.url(e.target.value))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <YouTube sx={{ color: "#FF0000" }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField
            label="LinkedIn"
            placeholder="https://linkedin.com/in/yourprofile"
            fullWidth
            value={socialMedia.LinkedIn || ""}
            onChange={(e) =>
              handleChange("LinkedIn", sanitizeInput.url(e.target.value))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkedIn sx={{ color: "#0A66C2" }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
        </Box>

        <BottomButton handleNext={handleNext} />
      </Box>
    </Box>
  );
};

export default WorkerForm3;
