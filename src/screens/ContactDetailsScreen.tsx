import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { useGetContactByIdQuery } from "../services/contactsApi";
import type { ProtectedStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<ProtectedStackParamList, "ContactDetails">;

export function ContactDetailsScreen({ route }: Props) {
  const { contactId } = route.params;
  const { data, error, isLoading, refetch } = useGetContactByIdQuery(contactId);

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#F7F8FA] px-4 pt-4">
        <LoadingState message="Loading details..." />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="flex-1 bg-[#F7F8FA] px-4 pt-4">
        <ErrorState
          message="Could not load contact details."
          onRetry={refetch}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#F7F8FA] px-4 pt-4">
      <View className="rounded-[8px] border border-[#D9DEE8] bg-white p-5">
        <Text className="text-[26px] font-bold text-[#111827]">
          {data.name}
        </Text>
        <Text className="mt-2 text-[16px] text-[#4B5563]">
          {data.role} at {data.company}
        </Text>

        <View className="my-5 h-px bg-[#E5E7EB]" />

        <DetailRow label="Email" value={data.email} />
        <DetailRow label="Phone" value={data.phone} />
        <DetailRow label="City" value={data.city} />

        <Text className="mt-5 text-[13px] font-bold uppercase text-[#6B7280]">
          Bio
        </Text>
        <Text className="mt-2 text-[15px] leading-6 text-[#374151]">
          {data.bio}
        </Text>
      </View>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-4">
      <Text className="text-[13px] font-bold uppercase text-[#6B7280]">
        {label}
      </Text>
      <Text className="mt-1 text-[16px] text-[#111827]">{value}</Text>
    </View>
  );
}
