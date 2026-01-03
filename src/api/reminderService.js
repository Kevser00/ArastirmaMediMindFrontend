import { api } from "./api";
import { endpoints } from "./endpoints";

export const reminderService = {
  create: (payload) => api.post(endpoints.reminders, payload).then((r) => r.data),
  getMine: () => api.get(endpoints.reminders).then((r) => r.data),
};
