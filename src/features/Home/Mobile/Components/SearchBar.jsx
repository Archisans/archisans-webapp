import React from "react";
import { Box, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { RouteProvider } from "@/config/RouteProvider";

const SearchBar = ({ placeholder = "Search for Services" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RouteProvider.USER_SEARCH);
  };

  return (
    <Box
      sx={{
        mt: 2,
        bgcolor: "neutral.bg.50",
        borderRadius: 1,
        height: 45,
        display: "flex",
        alignItems: "center",
        width: "100%",
        cursor: "pointer",
        border: "0.7px solid #d4d3d3ff",
        boxShadow: "0 0 10px rgba(6, 14, 85, 0.1)",
        transition: "box-shadow 0.25s ease, border 0.3s ease",
      }}
      onClick={handleClick}
    >
      <MagnifyingGlassIcon
        size={22}
        color="redneutral.bg.50"
        style={{ marginLeft: 16, marginRight: 16 }}
      />
      <InputBase
        placeholder={placeholder}
        sx={{
          flex: 1,
          fontSize: "0.8rem",
          color: "neutral.content.400",
          "& input::placeholder": {
            color: "neutral.content.600",
            opacity: 1,
          },
        }}
        inputProps={{ readOnly: true }}
      />
    </Box>
  );
};

export default SearchBar;
