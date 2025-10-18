import { Box, List, ListItem, Typography, Button, Grid } from "@mui/material";

const Edit = "/assets/Icon/Edit.png"
export default function AddressInformation() {
  return (
    <Grid
      container
      direction={"column"}
      sx={{
        display: "flex",
        bgcolor: "white",
        height: "16rem",
        border: "1px solid rgba(204, 203, 202)",
        borderRadius: "20px",
      }}
      p={2}
    >
      <Grid container direction={"row"} justifyContent={"space-between"}>
        <Typography
          color="textPrimary"
          sx={{ fontWeight: "700", fontSize: "18px" }}
        >
          Address
        </Typography>
        <Button
          variant="outlined"
          sx={{
            height: "30px",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.primary",
            borderColor: "text.primary",
          }}
        >
          <Box
            component="img"
            src={Edit}
            alt="Edit"
            sx={{ width: "10px", height: "10px", marginRight: "4px" }}
          />
          Edit
        </Button>
      </Grid>
      <Grid container direction={"row"} spacing={35}>
        <List>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              House / Flat No.
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography color="textPrimary" sx={{ fontSize: "12px" }}>
              24B
            </Typography>
          </ListItem>
          <Box sx={{ padding: "12px" }} />
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              City / Town
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "13px" }}>Kozhikode</Typography>
          </ListItem>
          <Box sx={{ padding: "12px" }} />
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              Postal / ZIP Code
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "12px" }}>600001</Typography>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              Street Name / Road
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography color="textPrimary" sx={{ fontSize: "13px" }}>
              KA Road
            </Typography>
          </ListItem>
          <Box sx={{ padding: "12px" }} />
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              District
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "13px" }}>Kozhikode</Typography>
          </ListItem>
          <Box sx={{ padding: "12px" }} />
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              Country
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "13px" }}>India</Typography>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              Landmark
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography color="textPrimary" sx={{ fontSize: "13px" }}>
              Near City Mall
            </Typography>
          </ListItem>
          <Box sx={{ padding: "12px" }} />
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              State / Province
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "13px" }}>Kerala</Typography>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
