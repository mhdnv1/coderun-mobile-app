import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { colors } from "../config/theme";
import { useAuth } from "../features/auth/AuthProvider";
import { useContactsQuery } from "../features/contacts/queries";
import type { Contact } from "../types/contact";
import { filterContacts } from "../utils/search";
import { truncateText } from "../utils/text";

const CARD_TITLE_LIMIT = 24;
const CARD_DESCRIPTION_LIMIT = 56;

export function ContactsScreen() {
  const router = useRouter();
  const { logout, session } = useAuth();
  const { data, error, isFetching, isLoading, refetch } = useContactsQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = useMemo(
    () => filterContacts(data ?? [], searchQuery),
    [data, searchQuery],
  );

  const renderContact = ({ item }: { item: Contact }) => (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/contacts/${item.id}`)}
      className="mb-3 rounded-[8px] border border-card-border bg-surface p-4"
    >
      <Text className="text-[18px] font-bold text-primary-text">
        {truncateText(item.name, CARD_TITLE_LIMIT)}
      </Text>
      <Text className="mt-1 text-[14px] text-secondary">
        {truncateText(
          `${item.role} at ${item.company}`,
          CARD_DESCRIPTION_LIMIT,
        )}
      </Text>
      <Text className="mt-3 text-[13px] font-semibold text-brand">
        View details
      </Text>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-screen px-4 pt-4">
      <View className="mb-5 flex-row items-center justify-between gap-3">
        <View className="flex-1">
          <Text className="text-[13px] text-muted">Signed in as</Text>
          <Text className="text-[16px] font-bold text-primary-text">
            {session?.user.email}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={logout}
          className="rounded-[8px] border border-control-border px-4 py-3"
        >
          <Text className="font-bold text-primary-text">Logout</Text>
        </Pressable>
      </View>

      <View className="mb-4 flex-row gap-3">
        <TextInput
          autoCapitalize="none"
          onChangeText={setSearchQuery}
          placeholder="Search by name, role, company or city"
          placeholderTextColor={colors.muted}
          value={searchQuery}
          className="min-w-0 flex-1 rounded-[8px] border border-control-border bg-surface px-4 py-3 text-primary-text"
        />
        <Pressable
          accessibilityRole="button"
          onPress={() => refetch()}
          className="rounded-[8px] bg-primary-text px-4 py-3"
        >
          <Text className="font-bold text-surface">Refresh</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <LoadingState message="Loading contacts..." />
      ) : error ? (
        <ErrorState message="Could not load contacts." onRetry={refetch} />
      ) : filteredContacts.length === 0 ? (
        <EmptyState
          title="No contacts found"
          description="Try another name, role, company or city."
        />
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          onRefresh={refetch}
          refreshing={isFetching}
          renderItem={renderContact}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}
