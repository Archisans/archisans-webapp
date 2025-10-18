import React, { useState } from "react";
import MobHeading from "@/components/Mobile/mobileHeading";
import {
  Box,
  Button,
  Chip,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SearchBar from "@/features/Home/Mobile/Components/SearchBar";
import { address1 } from "../constant";
import BottomDrawerLayout from "@/layouts/BottomDrawer/BottomDrawer";


const AddressDetailsDrawer = ({ open, setOpen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const theme = useTheme()
  return (
    <BottomDrawerLayout open={open} setOpen={setOpen}>
      <Typography
        variant={"h6"}
        fontWeight={700}
        pb={1}
        sx={{
          position: "fixed",
          backgroundColor: "white",
          width: "100%",
          zIndex: 2000,
        }}
      >
        Enter complete Address
      </Typography>
      <Box pt={7} />
      <Typography color="textSecondary" sx={{ fontSize: "0.8em" }}>
        Save address as *
      </Typography>
      <Grid container size={12} pt={1} alignItems="center" spacing={1}>
        {address1.map((address, index) => (
          <Grid key={index}>
            <Chip
              icon={<address.Icon sx={{ fontSize: "1.5em" }} />}
              label={address.name}
              variant={"outlined"}
              sx={{
                borderRadius: "4px",
                color: selectedIndex === index ? theme.palette.primary.chipLight : "inherit",
                borderColor: selectedIndex === index ? theme.palette.primary.chipLight : undefined,
                "& .MuiChip-icon": {
                  color: selectedIndex === index ? theme.palette.primary.chipLight : "inherit",
                },
                "&:hover": {
                  borderColor: selectedIndex === index ? theme.palette.primary.chipLight : "#f5f5f5",
                },
              }}
              onClick={() => setSelectedIndex(index)}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container flexDirection={"row"} size={12} pt={3} spacing={3}>
        <TextField
          label={"flat / House no / Building name"}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{
            backgroundColor: "white",
            "& .MuiInputLabel-root": {
              color: "grey", // Change label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.primary.chipLight, // Change label color
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              height: "3em", // Ensure this is applied to the wrapper
            },
          }}
          fullWidth
          required
        />

        <TextField
          label={"Floor (Optional)"}
          sx={{
            backgroundColor: "white",
            fontSize: 13,
            "& .MuiInputLabel-root": {
              color: "grey", // Change label color
              fontSize: 13,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.primary.chipLight, // Change label color
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              fontSize: 13,
            },
          }}
          fullWidth
        />
        <TextField
          label={"Area / Sector /Locality"}
          value={"Siruseri, India"}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="outlined" sx={{ height: "2em" }}>
                    Change
                  </Button>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            backgroundColor: "white",
            "& .MuiInputLabel-root": {
              color: "grey", // Change label color
              fontSize: 13,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.primary.chipLight, // Change label color
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              fontSize: 13,
            },
          }}
          fullWidth
          required
          disabled
        />
        <TextField
          label={"Nearby landmark (Optional)"}
          sx={{
            backgroundColor: "white",
            "& .MuiInputLabel-root": {
              color: "grey", // Change label color
              fontSize: 13,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.primary.chipLight, // Change label color
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              fontSize: 13,
            },
          }}
          fullWidth
        />
        <TextField
          label={"Enter your name"}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{
            backgroundColor: "white",
            "& .MuiInputLabel-root": {
              color: "grey", // Change label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.primary.chipLight, // Change label color
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              height: "3em", // Ensure this is applied to the wrapper
            },
          }}
          fullWidth
          required
        />

        <TextField
          label={"Enter your phone number"}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{
            backgroundColor: "white",
            "& .MuiInputLabel-root": {
              color: "grey", // Change label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: theme.palette.primary.chipLight, // Change label color
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
            },
          }}
          fullWidth
          required
        />
        <Button variant="contained" fullWidth>
          Save Address
        </Button>
      </Grid>
      <Box pb={4} />
    </BottomDrawerLayout>
  );
};

export default function AddressDetails() {
  const [open, setOpen] = useState(false);
  const handleOpen = (isOpen) => {
    setOpen(isOpen);
  };
  return (
    <Grid
      container
      direction={"column"}
      spacing={0}
      size={12}
    >
      <MobHeading Heading={"Add address"} />
      <Grid
        container
        justifyContent={"center"}
        pt={2}
      >
        <SearchBar
          sx={{ border: "1px solid grey", backgroundColor: "white" }}
          text={"Search new area, locality..."}
        />
      </Grid>

      <Grid container size={12} spacing={2} mt={2} justifyContent={"center"}>
        <Grid
          container
          sx={{
            backgroundColor: "rgb(242, 242, 242)",
            height: "12vh",
            width: "94vw",
            borderRadius: "10px",
            border: "0.5px solid grey"
          }}
          alignItems={"center"}
          spacing={2}
          pl={2}
        >
          <LocationPin sx={{ fontSize: "2em" }} />
          <Grid>
            <Typography color="textPrimary" sx={{ fontSize: "1em" }}>
              Siruseri
            </Typography>
            <Typography color="textSecondary">India</Typography>
          </Grid>
          <Grid container sx={{ flexGrow: 1 }} justifyContent={"end"} pr={2}>
            <Button variant="outlined" sx={{ height: "2em" }}>
              Change
            </Button>
          </Grid>
        </Grid>
        <Grid container pb={2}>
          <Button
            variant="contained"
            sx={{ width: "80vw", height: "3em", fontSize: "1em" }}
            onClick={() => handleOpen(true)}
          >
            Add More Address Details
          </Button>
        </Grid>
      </Grid>
      <AddressDetailsDrawer open={open} setOpen={setOpen} />
    </Grid>
  );
}
