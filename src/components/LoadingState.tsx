import { ActivityIndicator, Text, View } from "react-native";

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <View className="mt-8 items-center gap-3">
      <ActivityIndicator color="#6D28D9" />
      <Text className="text-center text-[#4B5563]">{message}</Text>
    </View>
  );
}
