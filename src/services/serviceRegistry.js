import { api } from "../lib/apiClient";

const bootstrap = {
  getBootstrapConfiguration: () =>
    api.get("/content/bootstrap-configuration").then((r) => r.data),
};

export const serviceRegistry = {
  bootstrap,
};
