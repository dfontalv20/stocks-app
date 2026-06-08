import apiClient from "./client";

export type UserResponse = {
  id: number;
  username: string;
  fcmToken: string;
};

export type AuthResponse = { accessToken: string };

export type Credentials = {
  username: string;
  password: string;
  fcmToken?: string;
};

export async function signIn(credentials: Credentials) {
  const res = await apiClient.post<AuthResponse>("/auth/signIn", {
    username: credentials.username,
    password: credentials.password,
    fcmToken: credentials.fcmToken || undefined,
  });
  return res.data;
}

export async function signUp(credentials: Omit<Credentials, "fcmToken">) {
  return (
    await apiClient.post<UserResponse>("/auth/signUp", {
      username: credentials.username,
      password: credentials.password,
    })
  ).data;
}

export async function getUser() {
  return (await apiClient.get<UserResponse>("/auth/user")).data;
}

export async function signOut() {
  await apiClient.post("/auth/signOut");
}
