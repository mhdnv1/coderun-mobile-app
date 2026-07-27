import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { AuthSession } from "../../shared/api/mockApi";

const AUTH_STORAGE_KEY = "coderun.auth.session";

type AuthContextValue = {
  isAuthenticated: boolean;
  isHydrating: boolean;
  session: AuthSession | null;
  setSession: (session: AuthSession) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSessionState] = useState<AuthSession | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    async function hydrateSession() {
      try {
        const storedSession = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

        if (storedSession) {
          setSessionState(JSON.parse(storedSession) as AuthSession);
        }
      } finally {
        setIsHydrating(false);
      }
    }

    hydrateSession();
  }, []);

  const setSession = useCallback(async (nextSession: AuthSession) => {
    setSessionState(nextSession);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
  }, []);

  const logout = useCallback(async () => {
    setSessionState(null);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(session),
      isHydrating,
      session,
      setSession,
      logout,
    }),
    [isHydrating, logout, session, setSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
