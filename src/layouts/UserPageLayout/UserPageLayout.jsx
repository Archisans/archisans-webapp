import {
  Grid,
} from "@mui/material";

export default function UserPageLayout({children}) {
  return (
   <>
      <Grid container direction={"row"}>
            {children}
      </Grid>
    </>
  )
}
