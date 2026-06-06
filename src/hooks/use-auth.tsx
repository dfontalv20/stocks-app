import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SESSION_KEY = "auth.session";

type AuthState = {
  token: string | null;
  isLoading: boolean;
};

type Credentials = {
  username: string;
  password: string;
};

type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  signIn: UseMutateAsyncFunction<string, Error, Credentials, unknown>;
  signUp: UseMutateAsyncFunction<string, Error, Credentials, unknown>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadSession(): Promise<string | null> {
  try {
    const token = await SecureStore.getItemAsync(SESSION_KEY);
    return token;
  } catch {
    return null;
  }
}

async function persistSession(token: string): Promise<void> {
  await SecureStore.setItemAsync(SESSION_KEY, token);
}

async function clearStoredSession(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}

async function mockAuthenticate(
  username: string,
  password: string,
): Promise<string> {
  if (!username.trim()) throw new Error("Username is required");
  if (!password) throw new Error("Password is required");
  await new Promise((resolve) => setTimeout(resolve, 400));
  return `mock.${btoa(username)}.${Date.now()}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: token,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: () => loadSession(),
    initialData: null,
  });

  const { mutateAsync: signInMutation, isPending: isSignInPending } =
    useMutation({
      mutationFn: async (credentials: Credentials) => {
        const token = await mockAuthenticate(
          credentials.username,
          credentials.password,
        );
        await persistSession(token);
        return token;
      },
    });

  const { mutateAsync: signUpMutation, isPending: isSignUpPending } =
    useMutation({
      mutationFn: (credentials: Credentials) =>
        mockAuthenticate(credentials.username, credentials.password),
    });

  const signOut = async () => {
    await clearStoredSession();
    await refetch();
  };

  const value: AuthContextValue = useMemo(
    () => ({
      token,
      isAuthenticated: token !== null,
      signIn: signInMutation,
      signUp: signUpMutation,
      signOut,
      isLoading: isLoading || isSignInPending || isSignUpPending,
    }),
    [
      token,
      isLoading,
      isSignInPending,
      isSignUpPending,
      signInMutation,
      signUpMutation,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
