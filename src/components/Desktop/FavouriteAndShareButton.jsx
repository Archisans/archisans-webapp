import React, { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { HeartIcon } from "@phosphor-icons/react";
import { ShareOutlined } from "@mui/icons-material";

const FavouriteAndShareButton = () => {
  const [saved, setSaved] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => alert("URL copied!"))
      .catch(() => alert("Failed to copy URL"));
  };

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          setSaved(!saved);
        }}
        sx={{ bgcolor: "rgba(255,255,255,0.75)" }}
      >
        <HeartIcon
          size={20}
          weight={saved ? "fill" : "regular"}
          color={saved ? "#ff0000" : "#000000"}
        />
      </IconButton>

      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleShare();
        }}
        sx={{ bgcolor: "rgba(255,255,255,0.75)" }}
      >
        <ShareOutlined fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default FavouriteAndShareButton;
