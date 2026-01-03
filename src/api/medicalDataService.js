import { api } from "./api";
import { endpoints } from "./endpoints";

export const medicalDataService = {
  getMedicines: () => api.get(endpoints.medicines).then((r) => r.data),
  getFrequencies: () => api.get(endpoints.frequencies).then((r) => r.data),
  getAllergies: () => api.get(endpoints.allergies).then((r) => r.data),
  getUserAllergies: () => api.get(endpoints.userAllergies).then((r) => r.data),
};
