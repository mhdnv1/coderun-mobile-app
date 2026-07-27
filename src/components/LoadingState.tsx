import { ActivityIndicator, Text, View } from "react-native";

import { colors } from "../config/theme";

type LoadingStateProps = {
  fullScreen?: boolean;
  message?: string;
};

export function LoadingState({
  fullScreen = false,
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <View
      className={
        fullScreen
          ? "flex-1 items-center justify-center gap-3 bg-screen px-4"
          : "mt-8 items-center gap-3"
      }
    >
      <ActivityIndicator color={colors.brand} />
      <Text className="text-center text-secondary">{message}</Text>
    </View>
  );
}
