import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "accessToken";

export const tokenStorage = {
  setAccessToken: (token) => AsyncStorage.setItem(ACCESS_TOKEN_KEY, token),
  getAccessToken: () => AsyncStorage.getItem(ACCESS_TOKEN_KEY),
  clear: () => AsyncStorage.removeItem(ACCESS_TOKEN_KEY),
};
