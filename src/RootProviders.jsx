import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryProvider } from "./providers/QueryProvider";
import { ApiProvider } from "./providers/ApiProvider";
import { ThemeProvider } from "@emotion/react";
import theme from "@/config/Theme/customTheme.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export function RootProviders({ children }) {
  return (
    <StrictMode>
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <ApiProvider>
            <QueryProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </QueryProvider>
          </ApiProvider>
        </ClerkProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
