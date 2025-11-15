import React from "react";
import { Box, Typography, Grid, IconButton, Stack, Avatar } from "@mui/material";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { Bell as BellIcon } from "@mui/icons-material"; // you can replace with custom BellIcon if needed

const MobMainHeader = () => {
  
  const location = "Thrissur, Kerala";
  const isSignedIn = true;
  const profileImage = "https://via.placeholder.com/150"; 

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pt: 2,
        pr: 2,
        pl: 1,
      }}
    >
      {/* Location */}
      <Box display="flex" position="relative">
        <Box display="flex" flexDirection="column" pl={1.5}>
          <Typography variant="caption" sx={{ lineHeight: 1, fontSize: 13 }}>
            Current Location
          </Typography>
          <Grid container alignItems="center">
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 15,
                color: "#0c136f", // static primary color
              }}
            >
              {location}
            </Typography>
            <IconButton sx={{ padding: 0 }}>
              <KeyboardArrowDownOutlined sx={{ color: "#0c136f" }} />
            </IconButton>
          </Grid>
        </Box>
      </Box>

      {/* User Section */}
      {isSignedIn ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton>
            <BellIcon sx={{ color: "#0c136f" }} />
          </IconButton>
          <Avatar sx={{ width: 32, height: 32 }} src={profileImage} />
        </Stack>
      ) : (
        <Box>
          <button
            style={{
              backgroundColor: "#0c136f",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "6px 16px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            Login
          </button>
        </Box>
      )}
    </Box>
  );
};

export default MobMainHeader;
