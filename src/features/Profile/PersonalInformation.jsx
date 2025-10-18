import { Box, List, ListItem, Typography, Button, Grid } from "@mui/material";

const Edit = "/assets/Icon/Edit.png"
export default function PersonalInformation() {
  return (
    <Grid
      container
      direction={"column"}
      sx={{
        display: "flex",
        bgcolor: "white",
        height: "11rem",
        border: "1px solid rgba(204, 203, 202)",
        borderRadius: "20px",
      }}
      p={2}
      spacing={1}
    >
      <Grid container direction={"row"} justifyContent={"space-between"}>
        <Typography
          color="textPrimary"
          sx={{ fontWeight: "700", fontSize: "18px" }}
        >
          Personal Information
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
              Name
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography color="textPrimary" sx={{ fontSize: "15px" }}>
              Jane
            </Typography>
          </ListItem>
          <Box sx={{ padding: "5px" }} />
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              Phone Number
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "12px" }}>+91 345 346 347</Typography>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              Date of Birth
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography color="textPrimary" sx={{ fontSize: "12px" }}>
              07/01/1997
            </Typography>
          </ListItem>
          <Box sx={{ padding: "5px" }} />
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              Email address
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "13px" }}>
              jane.doe@gmail.com
            </Typography>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <Typography sx={{ fontSize: "11px" }} color="textSecondary">
              Age
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography color="textPrimary" sx={{ fontSize: "12px" }}>
              26
            </Typography>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
