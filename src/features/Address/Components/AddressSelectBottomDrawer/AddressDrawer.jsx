import React from "react";
import BottomDrawerLayout from "../../../../layouts/BottomDrawer/BottomDrawer";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import SearchBar from "@/features/Home/Mobile/Components/SearchBar";
import {
  Add,
  KeyboardArrowRight,
  LocationOn,
  MyLocation,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { addressList } from "../../constant";
import { RouteProvider } from "@/config/RouteProvider";

export default function AddressDrawer({ open, setOpen }) {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <BottomDrawerLayout
      open={open}
      setOpen={setOpen}
      sx={{ bgcolor: "rgba(231, 231, 228, 0.06)" }}
    >
      <Typography variant={"h6"} fontWeight={700} pl={1} pb={2}>
        Select Location
      </Typography>
      <SearchBar
        sx={{
          border: "1px solid lightgrey",
          borderRadius: "8px",
          bgcolor: "white",
          maxWidth: "100%"
        }}
        text={"Searh for area, street name..."}
      />
      <Grid mt={2}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "6px",
            border: "1px solid lightgrey",
            p: 1,
            py: 0,
            bgcolor: "#fff",
          }}
        >
          <List disablePadding>
            <ListItemButton
              sx={{
                width: "100%",
                padding: 0,
                paddingX: 2,
              }}
            >
              <ListItemIcon>
                <MyLocation sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText
                primary="Current Location"
                secondary="Siruseri, Tamil Nadu"
                slotProps={{
                  primary: {
                    color: theme.palette.primary.main,
                  },
                  secondary:{
                    fontSize:"12px"
                  }
                }}
              />
              <KeyboardArrowRight sx={{ color: "grey" }} />
            </ListItemButton>
            <Divider />
            <ListItemButton
              sx={{
                width: "100%",
                height:"inherit"
              }}
              onClick={() => navigate(RouteProvider.USER_ADDRESS_ADD)}
            >
              <ListItemIcon>
                <Add sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText
                primary="Add new address"
                slotProps={{
                  primary: {
                    color: theme.palette.primary.main,
                  },
                }}
              />
              <KeyboardArrowRight sx={{ color: "grey" }} />
            </ListItemButton>
          </List>
        </Paper>
      </Grid>
      <Typography sx={{ color: "grey" }} color="primary" mt={2} pl={1}>
        Your Saved Address
      </Typography>
      <Grid mt={2}>
        <Box pt={0} sx={{ width: "100%" }}>
          {addressList.map((item, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: 1,
                p: 1,
                border: "1px solid #e0e0e0",
                mb: 1.5,
              }}
            >
              <List disablePadding>
                <ListItem disableGutters>
                  {/* Title and Details */}
                  <Box px={1}>
                    <Box
                      py={0.5}
                      sx={{ display: "flex", flexDirection: "row", ml: -0.5 }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "normal",
                            color: "inherit",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <LocationOn color="primary" fontSize="small" />
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "14px",
                        mt: 0.5,
                      }}
                    >
                      {item.details}
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            </Box>
          ))}
        </Box>
      </Grid>
      <Box pb={3} />
    </BottomDrawerLayout>
  );
}
