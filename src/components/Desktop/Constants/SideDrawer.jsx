// drawerConstants.js
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GavelIcon from "@mui/icons-material/Gavel";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import HelpIcon from "@mui/icons-material/Help";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LogoutIcon from "@mui/icons-material/Logout";
import {RouteProvider} from "@/config/RouteProvider";

export const DRAWER_WIDTH = 300;

export const MOCK_USER = {
  name: "John Babu",
  email: "daisonbabu@gmail.com",
  phone: "+91 9736458763",
  avatar: "https://randomuser.me/api/portraits/men/83.jpg",
};

export const MENU_TEXT_STYLE = { fontSize: 15, fontWeight: 500 };

export const MENU_ITEMS = [
  {
    label: "Account Info",
    icon: <AccountCircleIcon />,
    action: "accountInfo",
  },
  {
    label: "Saved Workers",
    icon: <BookmarkIcon />,
    to: RouteProvider.USER_SAVED_WORKERS,
  },
  {
    label: "Saved Address",
    icon: <LocationOnIcon />,
    to: RouteProvider.USER_ADDRESS_SAVED,
  },
  { divider: true },
  {
    label: "Join as Worker",
    icon: <EngineeringIcon />,
    to: RouteProvider.WORKER_REGISTER,
    isWorker: false,
  },
  {
    label: "Help & Support",
    icon: <HelpIcon />,
    action: "help&support",
  },

  {
    label: "Logout",
    icon: <LogoutIcon />,
    action: "logout",
  },
  
];
