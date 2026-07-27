import { Redirect } from "expo-router";

import { LoadingState } from "../../src/components/LoadingState";
import { useAuth } from "../../src/features/auth/AuthProvider";
import { ContactsScreen } from "../../src/screens/ContactsScreen";

export default function ContactsRoute() {
  const { isAuthenticated, isHydrating } = useAuth();

  if (isHydrating) {
    return <LoadingState fullScreen message="Loading session..." />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  return <ContactsScreen />;
}
