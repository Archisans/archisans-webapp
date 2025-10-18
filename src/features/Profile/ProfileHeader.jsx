import { Typography, Avatar, Grid } from "@mui/material";

import { Verified } from "@mui/icons-material";

export default function ProfileHeader() {
  return (
    <Grid
      container
      direction="row"
      sx={{
        display: "flex",
        bgcolor: "white",
        height: "6rem",
        border: "1px solid rgba(204, 203, 202)",
        borderRadius: "20px",
        alignItems: "center",
      }}
      pl={2}
      spacing={1}
    >
      <Avatar
        src="https://randomuser.me/api/portraits/women/79.jpg"
        alt="Daison"
        sx={{ height: "4rem", width: "4rem" }}
      />
      <Grid container direction="column" spacing={0}>
        <Grid container direction="row" spacing={1} alignItems="center" p={0}>
          <Typography variant="h6" component="div" sx={{lineHeight:"0"}}>
            Jane
          </Typography>
          <Verified sx={{ color: "#4e9cf5", height: "20px" }} />
        </Grid>
        <Typography
          variant="subtitle1"
          color="textPrimary"
          sx={{ fontSize: "13px" }}
          p={0}
        >
          Premium member
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          sx={{ fontSize: "10px" }}
        >
          Kozhikode
        </Typography>
      </Grid>
    </Grid>
  );
}
