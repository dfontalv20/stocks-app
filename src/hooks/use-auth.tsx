import { clearStoredSession, loadSession, persistSession } from "@/lib/session";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { AuthResponse, Credentials, signIn as signInRequest } from "@/api/auth";

type AuthState = {
  token: string | null;
  isLoading: boolean;
};

type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  signIn: (credentials: Credentials) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

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

  const signIn = useCallback(
    async (credentials: Credentials) => {
      const res = await signInRequest(credentials);
      await persistSession(res.accessToken);
      await refetch();
      return res;
    },
    [refetch],
  );

  const signOut = useCallback(async () => {
    await clearStoredSession();
    await refetch();
  }, [refetch]);

  const value: AuthContextValue = useMemo(
    () => ({
      token,
      isAuthenticated: token !== null,
      signIn,
      signOut,
      isLoading: isLoading,
    }),
    [token, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
