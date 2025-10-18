import { Grid } from "@mui/material";

export default function DashBoardLayout({ children,marginTop,padding}) {
  return (
    <Grid
      container
      direction="column"
      sx={{
        bgcolor: "rgba(250, 242, 225, 0.3)",
        width: "100%",
        borderRadius: "20px",
        border: "1px solid rgba(204, 203, 202)",
      }}
      p={padding}
      mt={marginTop}
      spacing={2.5}
    >
      {children}
    </Grid>
  );
}
