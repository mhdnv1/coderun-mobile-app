import { Text, View } from "react-native";

type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View className="mt-8 items-center rounded-[8px] border border-soft bg-surface p-5">
      <Text className="text-center text-[17px] font-bold text-primary-text">
        {title}
      </Text>
      {description ? (
        <Text className="mt-2 text-center text-[14px] text-muted">
          {description}
        </Text>
      ) : null}
    </View>
  );
}
