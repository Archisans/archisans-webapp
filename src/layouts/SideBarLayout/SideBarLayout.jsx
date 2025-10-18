import { Grid } from "@mui/material";

import UserPageLayout from "@/layouts/UserPageLayout/UserPageLayout";
export default function SideBarLayout({ children , SideBar}) {
  return (
    <>
      <UserPageLayout>
        <Grid size={2} spacing={10}>
          <SideBar/>
        </Grid>
        <Grid container direction={"column"} size={9} spacing={2}>
          {children}
        </Grid>
      </UserPageLayout>
    </>
  );
}
