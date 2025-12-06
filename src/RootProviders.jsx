import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { QueryProvider } from "./providers/QueryProvider";
import { UserProvider } from "./context/UserContext";
import { WorkerProvider } from "./context/WorkerContext";
import theme from "@/config/Theme/theme";

export function RootProviders({ children }) {
  return (
    <StrictMode>
      <BrowserRouter>
        <QueryProvider>
          <UserProvider>
            <WorkerProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </WorkerProvider>
          </UserProvider>
        </QueryProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
