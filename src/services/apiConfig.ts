import { Platform } from "react-native";

const fallbackUrl = Platform.select({
  android: "http://10.0.2.2:3001",
  default: "http://localhost:3001",
});

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? fallbackUrl;
