import { Pressable, Text, View } from "react-native";

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <View className="mt-8 items-center gap-4 rounded-[8px] border border-danger-border bg-danger-soft p-5">
      <Text className="text-center text-danger">{message}</Text>
      {onRetry ? (
        <Pressable
          accessibilityRole="button"
          onPress={onRetry}
          className="rounded-[8px] bg-primary-text px-5 py-3"
        >
          <Text className="font-bold text-surface">Retry</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
