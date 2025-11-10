import { Box, Typography } from "@mui/material";

const WorkerAbout = ({ about }) => {
  if (!about || about.trim() === "") return null;

  return (
    <Box
      sx={{
        mb: 4,
        px: 1,
        py: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: 15.5,
          color: "#555",
          lineHeight: 1.8,
          whiteSpace: "pre-line",
          wordBreak: "break-word",
        }}
      >
        {about}
      </Typography>
    </Box>
  );
};

export default WorkerAbout;
