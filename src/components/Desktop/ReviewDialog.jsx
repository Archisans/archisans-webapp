import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  Rating,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AlertMessage from "@/components/Desktop/AlertMessage";

const ReviewDialog = ({
  open,
  onClose,
  onSubmit,
  title = "Rate the Service",
  description = "We value your feedback! 😇",
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = () => {
    if (onSubmit) onSubmit({ rating, comment });
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
      setRating(0);
      setComment("");
      onClose();
    }, 2000);
  };

  return (
    <>
      {/* ✅ Success Alert */}
      <AlertMessage
        isAlert={showAlert}
        message="🎉 Review submitted successfully!"
        color="success"
      />

      {/* Review Dialog */}
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            mx: isMobile ? 2 : 0, // small margin on mobile
            p: isMobile ? 2 : 3,
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              color: "#aaa",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Title */}
          <DialogTitle
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: isMobile ? "1.25rem" : "1.5rem",
            }}
          >
            {title}
          </DialogTitle>

          {/* Content */}
          <DialogContent sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                color: "#555",
                mb: 2,
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              {description}
            </Typography>

            <Rating
              name="service-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
              sx={{
                fontSize: isMobile ? "2.2rem" : "3rem",
              }}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your feedback here..."
              variant="outlined"
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
                "& textarea": {
                  fontSize: isMobile ? "0.9rem" : "1rem",
                },
              }}
            />
          </DialogContent>

          {/* Actions */}
          <DialogActions sx={{ justifyContent: "center", mt: 0 }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "50px",
                px: isMobile ? 4 : 6,
                py: isMobile ? 0.8 : 1,
                color: "white",
                fontWeight: "bold",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default ReviewDialog;
