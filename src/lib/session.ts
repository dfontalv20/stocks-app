import * as SecureStore from "expo-secure-store";
export const SESSION_KEY = "auth.session";

export async function loadSession(): Promise<string | null> {
  try {
    const token = await SecureStore.getItemAsync(SESSION_KEY);
    return token;
  } catch {
    return null;
  }
}

export async function persistSession(token: string): Promise<void> {
  await SecureStore.setItemAsync(SESSION_KEY, token);
}

export async function clearStoredSession(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}
