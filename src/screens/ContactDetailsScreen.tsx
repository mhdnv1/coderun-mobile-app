import { Text, View } from "react-native";

import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { useContactQuery } from "../features/contacts/queries";

type ContactDetailsScreenProps = {
  contactId: string;
};

export function ContactDetailsScreen({ contactId }: ContactDetailsScreenProps) {
  const { data, error, isLoading, refetch } = useContactQuery(contactId);

  if (isLoading) {
    return (
      <View className="flex-1 bg-screen px-4 pt-4">
        <LoadingState message="Loading details..." />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="flex-1 bg-screen px-4 pt-4">
        <ErrorState
          message="Could not load contact details."
          onRetry={refetch}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-screen px-4 pt-4">
      <View className="rounded-[8px] border border-card-border bg-surface p-5">
        <Text className="text-[26px] font-bold text-primary-text">
          {data.name}
        </Text>
        <Text className="mt-2 text-[16px] text-secondary">
          {data.role} at {data.company}
        </Text>

        <View className="my-5 h-px bg-soft" />

        <DetailRow label="Email" value={data.email} />
        <DetailRow label="Phone" value={data.phone} />
        <DetailRow label="City" value={data.city} />

        <Text className="mt-5 text-[13px] font-bold uppercase text-muted">
          Bio
        </Text>
        <Text className="mt-2 text-[15px] leading-6 text-body">{data.bio}</Text>
      </View>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-4">
      <Text className="text-[13px] font-bold uppercase text-muted">
        {label}
      </Text>
      <Text className="mt-1 text-[16px] text-primary-text">{value}</Text>
    </View>
  );
}
