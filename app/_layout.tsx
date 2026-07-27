import "../global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

import { APP_VERSION } from "../src/config/appConfig";
import { colors } from "../src/config/theme";
import { AuthProvider } from "../src/features/auth/AuthProvider";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: colors.screen },
            headerShadowVisible: false,
            headerRight: () => (
              <Text className="text-[13px] font-bold text-muted">
                v{APP_VERSION}
              </Text>
            ),
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="contacts/index" options={{ title: "Contacts" }} />
          <Stack.Screen name="contacts/[id]" options={{ title: "Details" }} />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}
