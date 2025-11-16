// ShareModal.jsx
import React from "react";
import {
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  WhatsappLogoIcon,
  FacebookLogoIcon,
  TelegramLogoIcon,
  LinkSimpleBreakIcon,
} from "@phosphor-icons/react";

const ShareModal = ({ open, onClose, url }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleShareClick = (e, platform) => {
    e.stopPropagation(); // Prevent card click

    let shareURL = "";

    switch (platform) {
      case "whatsapp":
        shareURL = `https://wa.me/?text=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "telegram":
        shareURL = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
        break;
      case "copy":
        navigator.clipboard
          .writeText(url)
          .then(() => alert("URL copied!"))
          .catch(() => alert("Failed to copy URL"));
        return;
      case "instagram":
        alert("Instagram does not support direct URL sharing. You can copy the URL instead.");
        return;
      default:
        return;
    }

    if (shareURL) {
      window.open(shareURL, "_blank");
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      key: "whatsapp",
      color: "#25D366",
      Icon: () => <WhatsappLogoIcon size={28} weight="fill" color="#fff" />,
    },
    {
      name: "Facebook",
      key: "facebook",
      color: "#1877F2",
      Icon: () => <FacebookLogoIcon size={28} weight="fill" color="#fff" />,
    },
    {
      name: "Telegram",
      key: "telegram",
      color: "#0088cc",
      Icon: () => <TelegramLogoIcon size={28} weight="fill" color="#fff" />,
    },
    {
      name: "Copy Link",
      key: "copy",
      color: "#6c757d",
      Icon: () => <LinkSimpleBreakIcon size={28} weight="fill" color="#fff" />,
    },
  ];

  const content = (
    <Stack direction="row" spacing={3} justifyContent="center" alignItems="center" py={2}>
      {shareOptions.map((option) => (
        <Stack key={option.key} direction="column" alignItems="center" spacing={0.5}>
          <IconButton
            onClick={(e) => handleShareClick(e, option.key)}
            sx={{
              bgcolor: option.color,
              "&:hover": { bgcolor: option.color },
              "&:active": { bgcolor: option.color },
            }}
          >
            <option.Icon />
          </IconButton>
          <Typography variant="caption">{option.name}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  // Mobile Drawer
  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={(e) => { e.stopPropagation(); onClose(); }}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            borderRadius: "16px 16px 0 0",
            width: "100%",
            maxHeight: "80vh",
            overflow: "hidden",
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.2)" },
            zIndex: 2,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            pt: 5,
            pb: 2,
            px: 2,
            overflowY: "auto",
            maxHeight: "75vh",
          }}
        >
          <Typography variant="subtitle1" mb={2} textAlign="center">
            Share via
          </Typography>
          {content}
        </Box>
      </Drawer>
    );
  }

  // Desktop Dialog
  return (
    <Dialog
      open={open}
      onClose={(e) => { e.stopPropagation(); onClose(); }}
    >
      <DialogTitle>
        Share via
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default ShareModal;
