import { bootStrapData } from "@/utils/bootStrap";

export const useBootstrapConfiguration = () => {
  return {
    bootstrapConfiguration: bootStrapData,
    isLoading: false,
    hasError: false,
  };
};
