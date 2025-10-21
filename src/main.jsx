import { createRoot } from "react-dom/client";
import { RootProviders } from "./RootProviders";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <RootProviders>
    <App />
    <Analytics />
  </RootProviders>
);
