import { Text, View } from "react-native";

type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View className="mt-8 items-center rounded-[8px] border border-[#E5E7EB] bg-white p-5">
      <Text className="text-center text-[17px] font-bold text-[#111827]">
        {title}
      </Text>
      {description ? (
        <Text className="mt-2 text-center text-[14px] text-[#6B7280]">
          {description}
        </Text>
      ) : null}
    </View>
  );
}
