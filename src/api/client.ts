import { SESSION_EXPIRED_EVENT } from "@/constants/session";
import { loadSession } from "@/lib/session";
import { create, isAxiosError } from "axios";
import { DeviceEventEmitter } from "react-native";

const apiClient = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await loadSession();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch {
    return config;
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      isAxiosError(error) &&
      error.config?.headers.Authorization &&
      error.response?.status === 401
    ) {
      DeviceEventEmitter.emit(SESSION_EXPIRED_EVENT);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
