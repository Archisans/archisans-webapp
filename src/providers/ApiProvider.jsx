import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { api } from "../lib/apiClient";

export function ApiProvider({ children }) {
  const { getToken, signOut } = useAuth();

  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken({ template: "primary" });
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [getToken, signOut]);

  return children;
}
