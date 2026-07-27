import { Redirect, useLocalSearchParams } from "expo-router";

import { LoadingState } from "../../src/components/LoadingState";
import { useAuth } from "../../src/features/auth/AuthProvider";
import { ContactDetailsScreen } from "../../src/screens/ContactDetailsScreen";

export default function ContactDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isAuthenticated, isHydrating } = useAuth();

  if (isHydrating) {
    return <LoadingState fullScreen message="Loading session..." />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  return <ContactDetailsScreen contactId={id} />;
}
