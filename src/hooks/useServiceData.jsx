import { useQuery } from "@tanstack/react-query";
import { serviceRegistry } from "../services/serviceRegistry";

export function useServiceData(serviceName, method, args = [], options = {}) {
  const service = serviceRegistry[serviceName];
  if (!service || !service[method]) {
    throw new Error(`Service or method not found: ${serviceName}.${method}`);
  }
  const queryKey = [serviceName, method, ...args];

  return useQuery({
    queryKey,
    queryFn: () => service[method](...(Array.isArray(args) ? args : [args])),
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 15000),
    refetchOnWindowFocus: false,
    ...options,
  });
}
