import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "@/config/Theme/customTheme.jsx";
import { UserProvider } from "./hooks/UserContext";

export function RootProviders({ children }) {
  return (
    <StrictMode>
      <BrowserRouter>
        <UserProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </UserProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
