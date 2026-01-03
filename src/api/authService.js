import { api } from "./api";
import { endpoints } from "./endpoints";
import { tokenStorage } from "./tokenStorage";

export const authService = {
  // POST /api/auth/login/user
  // body: { email, password }
  // response: { accessToken, userId }
  loginUser: async (email, password) => {
    const res = await api.post(endpoints.userLogin, { email, password });
    const { accessToken, userId } = res.data || {};

    if (accessToken) await tokenStorage.setAccessToken(accessToken);

    return { accessToken, userId };
  },

  // POST /api/auth/login/doctor
  // body: { registrationNumber, password }
  // response: backend ne dönüyorsa aynen döndürür (token alanını da yakalamaya çalışıyoruz)
  loginDoctor: async (registrationNumber, password) => {
    const res = await api.post(endpoints.doctorLogin, {
      registrationNumber,
      password,
    });

    // Olası token alanları (keycloak genelde access_token döner)
    const token =
      res.data?.access_token ||
      res.data?.accessToken ||
      res.data?.token ||
      null;

    if (token) await tokenStorage.setAccessToken(token);

    return res.data;
  },

  // POST /api/identity/register
  register: (payload) => api.post(endpoints.register, payload).then((r) => r.data),

  logout: async () => {
    await tokenStorage.clear();
  },
};
