import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import { APP_VERSION } from "../config/appConfig";
import { useAppSelector } from "../store/hooks";
import { ContactDetailsScreen } from "../screens/ContactDetailsScreen";
import { ContactsScreen } from "../screens/ContactsScreen";
import { LoginScreen } from "../screens/LoginScreen";
import type { AuthStackParamList, ProtectedStackParamList } from "./types";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const ProtectedStack = createNativeStackNavigator<ProtectedStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

function ProtectedNavigator() {
  return (
    <ProtectedStack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#F7F8FA" },
        headerShadowVisible: false,
        headerRight: () => (
          <Text className="text-[13px] font-bold text-[#6B7280]">
            v{APP_VERSION}
          </Text>
        ),
      }}
    >
      <ProtectedStack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: "Contacts" }}
      />
      <ProtectedStack.Screen
        name="ContactDetails"
        component={ContactDetailsScreen}
        options={{ title: "Details" }}
      />
    </ProtectedStack.Navigator>
  );
}

export function RootNavigator() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <ProtectedNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
