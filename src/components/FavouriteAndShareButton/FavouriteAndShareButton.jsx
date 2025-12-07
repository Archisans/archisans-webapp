import React, { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { HeartIcon } from "@phosphor-icons/react";
import { ShareOutlined } from "@mui/icons-material";
import ShareModal from "./ShareModal";

const FavouriteAndShareButton = ({ showShare = true }) => {
  const [saved, setSaved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const currentURL = window.location.href;

  return (
    <>
      <Stack direction="row" spacing={1}>
        {/* Favourite Button */}
        {/* <IconButton
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
        </IconButton> */}

        {/* Share Button - optional */}
        {showShare && (
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
        )}
      </Stack>

      {/* Share Modal */}
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={currentURL}
      />
    </>
  );
};

export default FavouriteAndShareButton;
