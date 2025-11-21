
import { RouteProvider } from "@/config/RouteProvider";

export const navLinks = [
  { label: "My Work Space", path: RouteProvider.WORKER_HOME, requiresAuth: true, worker: true },
  // { label: "Notifications", path: RouteProvider.USER_SETTINGS_NOTIFICATION, requiresAuth: true },
  { label: "Sign In", path: null }, // triggers login popup instead of navigation
];
