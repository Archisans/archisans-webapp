import Search from "@/components/integrated/components/Search/Search";
import SideBar from "@/components/integrated/components/SideBar/SideBar";

import SideBarLayout from "@/layouts/SideBarLayout/SideBarLayout";
import {ProfileManagementDashboard} from "./ProfileManagement";

export default function Profile() {
  return (
    <SideBarLayout SideBar={SideBar}>
      <Search />
      <ProfileManagementDashboard/>
    </SideBarLayout>
  );
}
