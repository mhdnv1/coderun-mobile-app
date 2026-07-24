import { Pressable, Text, View } from "react-native";

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View className="mt-8 items-center gap-4 rounded-[8px] border border-[#FECACA] bg-[#FEF2F2] p-5">
      <Text className="text-center text-[#B91C1C]">{message}</Text>
      {onRetry ? (
        <Pressable
          accessibilityRole="button"
          onPress={onRetry}
          className="rounded-[8px] bg-[#111827] px-5 py-3"
        >
          <Text className="font-bold text-white">Retry</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
