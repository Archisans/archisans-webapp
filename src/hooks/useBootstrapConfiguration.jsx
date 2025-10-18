import { useServiceData } from "./useServiceData";

export const useBootstrapConfiguration = () => {
  const bootstrapConfiguration = useServiceData(
    "bootstrap",
    "getBootstrapConfiguration"
  );

  return {
    bootstrapConfiguration: bootstrapConfiguration?.data,
    isLoading: bootstrapConfiguration.isLoading,
    hasError: bootstrapConfiguration.error,
  };
};
