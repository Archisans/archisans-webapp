import { api } from "../lib/apiClient";

const bootstrap = {
  getBootstrapConfiguration: () =>
    api.get("/functions/v1/bootstrap-config").then((r) => r.data),
};

export const serviceRegistry = {
  bootstrap,
};
