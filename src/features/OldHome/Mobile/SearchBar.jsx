import { Search } from "@mui/icons-material";
import { Grid, Input, InputAdornment } from "@mui/material";
import React from "react";
import { color } from "./constants";
export default function SearchBar({ sx, text, onClick }) {
  return (
    <Grid
      sx={{
        bgcolor: color.layoutColor,
        height: "5vh",
        width: "95vw",
        borderRadius: "50px",
        display: "flex",
        padding: "5px",
        ...sx,
      }}
      alignItems={"center"}
      size={10}
      onClick={onClick}
    >
      <Input
        placeholder={text ? text : "Job title, keyword, worker"}
        disableUnderline
        fullWidth
        inputProps={{ readOnly: false }}
        startAdornment={
          <InputAdornment position="start">
            <Search sx={{ color: "gray", marginLeft: "0.3em" }} />
          </InputAdornment>
        }
        sx={{
          "& .MuiInputBase-root": {
            border: "none", // Ensure no border
            backgroundColor: "transparent", // Transparent background
            display: "flex",
            alignItems: "center",
            height: "100%",
          },
          "& .MuiInputBase-input": {
            fontSize: "0.9em", // Font size
          },
        }}
      />
    </Grid>
  );
}
