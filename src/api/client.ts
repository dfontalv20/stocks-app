import { loadSession } from "@/lib/session";
import { create } from "axios";

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

export default apiClient;
