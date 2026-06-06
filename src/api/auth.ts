import apiClient from "./client";

export type UserResponse = {
  id: number;
  username: string;
  password: string;
  fcmToken: string;
};

export type AuthResponse = { accessToken: string };

export type Credentials = {
  username: string;
  password: string;
};

export async function signIn(credentials: Credentials) {
  const res = await apiClient.post<AuthResponse>("/auth/signIn", {
    username: credentials.username,
    password: credentials.password,
    fcmToken: "",
  });
  return res.data;
}

export async function signUp(credentials: Credentials) {
  return (
    await apiClient.post<UserResponse>("/auth/signUp", {
      username: credentials.username,
      password: credentials.password,
    })
  ).data;
}
