import { Box, Input, InputAdornment, Divider,Grid } from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material";
import { ArrowDropDown, MyLocation } from "@mui/icons-material";

export default function Search() {
  return (
    <Grid
      width={"100%"}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box width={"80%"}>
        <Box
          mt={2.2}
          width={"100%"}
          height={"2.5rem"}
          sx={{
            display: "inline-flex",
            border: "1px solid #B08B6F",
            borderRadius: "5px",
            bgcolor: "rgba(184, 151, 125, 0.09)",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              width: "10em",
            }}
          >
            <Input
              disableUnderline
              placeholder="location"
              startAdornment={
                <>
                  <MyLocation
                    sx={{
                      width: "15px",
                      height: "15px",
                      margin: "4px",
                      color: "gray",
                    }}
                  />
                </>
              }
              endAdornment={<ArrowDropDown sx={{ color: "GrayText" }} />}
              sx={{
                textAlign: "center",
                "& .MuiInputBase-input": {
                  textAlign: "center", // Center the placeholder text
                  width: "100%", // Ensure the input spans full width
                  padding: "8px", // Padding for comfort
                },
              }}
            />
            <Divider
              orientation="vertical"
              variant="middle"
              sx={{ margin: "4px", height: "30px" }}
            />
          </Box>
          <Input
            placeholder="Job title, keyword, worker"
            disableUnderline
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "gray" }} />
              </InputAdornment>
            }
            sx={{
              "& .MuiInputBase-root": {
                border: "none", // Ensure no border
                backgroundColor: "transparent", // Transparent background
              },
              "& .MuiInputBase-input": {
                padding: "8px", // Padding for text
                fontSize: "0.9em", // Font size
              },
            }}
          />
        </Box>
      </Box>
    </Grid>
  );
}
