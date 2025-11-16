import React, { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { HeartIcon } from "@phosphor-icons/react";
import { ShareOutlined } from "@mui/icons-material";
import ShareModal from "./ShareModal";

const FavouriteAndShareButton = () => {
  const [saved, setSaved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const currentURL = window.location.href;

  return (
    <>
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
            setShareOpen(true);
          }}
          sx={{ bgcolor: "rgba(255,255,255,0.75)" }}
        >
          <ShareOutlined fontSize="small" />
        </IconButton>
      </Stack>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={currentURL}
      />
    </>
  );
};

export default FavouriteAndShareButton;
