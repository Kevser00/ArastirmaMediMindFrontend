import axios from "axios";
import { Platform } from "react-native";
import { tokenStorage } from "./tokenStorage";

const PORT = 5127;

// ANDROID EMULATOR -> 10.0.2.2
// IOS SIMULATOR -> localhost

const BASE_URL = `http://10.0.2.2:${PORT}`;
  //Platform.OS === "ios"
  //  ? `http://localhost:${PORT}`
    //: `http://10.0.2.2:${PORT}`;



export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err?.response?.status === 401) {
      // İstersen burada otomatik logout yap:
      // await tokenStorage.clear();
    }
    return Promise.reject(err);
  }
);