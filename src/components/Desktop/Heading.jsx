import React from "react";
import { Typography } from "@mui/material";

const Heading = ({ value }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        fontFamily: "'Poppins', 'Roboto', sans-serif", // fallback to Roboto
        fontWeight: 600,          // bold, modern feel
        mb: 3,
        mt: 3,
        ml: 3,
        textAlign: "left",
        textTransform: "uppercase",
        letterSpacing: 0.75,         // subtle spacing
        lineHeight: 1,          // comfortable reading
        px: { xs: 1.5, md: 0 },
        color: "primary.main",
        fontSize: { xs: "1.8rem", md: "2.1rem" },  // slightly larger for impact
      }}
    >
      {value}
    </Typography>
  );
};

export default Heading;
