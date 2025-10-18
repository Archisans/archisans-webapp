
import { RouteProvider } from "@/config/RouteProvider";

export const navLinks = [
  { label: "Bookings", path: RouteProvider.USER_BOOKINGS, requiresAuth: true },
  { label: "Notifications", path: RouteProvider.USER_SETTINGS_NOTIFICATION, requiresAuth: true },
  { label: "Sign In", path: null }, // triggers login popup instead of navigation
];
