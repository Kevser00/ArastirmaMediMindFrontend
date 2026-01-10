import { api } from "./api";

export const reminderService = {
  // 🔔 Doktor tarafı / reminder oluşturma (aynı kalabilir)
  create: async (payload) => {
    const res = await api.post("/api/reminders", payload);
    return res.data;
  },

  // 🟢 Hasta ana sayfa → execution report
  getExecutionReport: async (userId) => {
    const res = await api.get(
      `/api/reminder-executions/report/${userId}`
    );
    return res.data;
  },
};
