import { Redirect } from "expo-router";

import { LoadingState } from "../src/components/LoadingState";
import { useAuth } from "../src/features/auth/AuthProvider";
import { LoginScreen } from "../src/screens/LoginScreen";

export default function LoginRoute() {
  const { isAuthenticated, isHydrating } = useAuth();

  if (isHydrating) {
    return <LoadingState fullScreen message="Loading session..." />;
  }

  if (isAuthenticated) {
    return <Redirect href="/contacts" />;
  }

  return <LoginScreen />;
}
