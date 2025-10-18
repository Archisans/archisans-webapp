import DashBoardLayout from "@/layouts/DashBoardLayout/DashBoardLayout";
import AddressInformation from "./AddressInformation";
import PersonalInformation from "./PersonalInformation";
import ProfileHeader from "./ProfileHeader";

export const ProfileManagementDashboard = () => {
  return (
    <DashBoardLayout marginTop={1} padding={4}>
      {/* Profile Header */}
      <ProfileHeader />

      {/* Personal Information */}
      <PersonalInformation />

      {/* Address Section */}
      <AddressInformation />
    </DashBoardLayout>
  );
};
