import { Box, Grid, Typography } from "@mui/material";
import Signupimg from "@/assets/Images/signup.png";

export const AuthenticationHeadingContent = ({ mainheading, subheading }) => {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { lg: "50vh", md: "31vh", sm: "30vh", xs: "23vh" },
        ml: { lg: 8, md: 8, sm: 2, xs: 5 },
        mt: { lg: 8, md: 8, sm: 8, xs: -5 },
      }}
    >
      <Typography
        sx={{
          fontSize: { lg: "2.3rem", md: "1.9rem", sm: "2rem", xs: "1.8rem" },
        }}
        color="white"
        mb={2}
        fontWeight={"bold"}
      >
        {mainheading}
        <Box
          component="img"
          src={Signupimg}
          alt="My image"
          sx={{
            width: { xs: "100px" },
            height: "auto",
            marginTop: "-50px",
            marginLeft: "120px",
            borderRadius: 2,
            display: { xs: "block", sm: "none" },
          }}
        />
      </Typography>
      <Typography
        sx={{
          fontSize: { lg: "1.2rem", md: "1.2rem", sm: "0.9rem" },
          display: { xs: "none", sm: "block" },
        }}
        color="#fff5ee"
      >
        {subheading}
      </Typography>
      <Box
        component="img"
        src={Signupimg}
        alt="My image"
        sx={{
          width: { lg: "300px", md: "300px", sm: "220px", xs: "100px" },
          height: "auto",
          borderRadius: 2,
          display: { xs: "none", sm: "block" },
        }}
      />
    </Grid>
  );
};
