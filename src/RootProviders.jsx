import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { UserProvider } from "./context/UserContext";
import theme from "@/config/Theme/customTheme.jsx";

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
