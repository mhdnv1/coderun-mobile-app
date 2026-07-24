import { useMemo, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { logout } from "../features/auth/authSlice";
import { useGetContactsQuery } from "../services/contactsApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { Contact } from "../types/contact";
import type { ProtectedStackParamList } from "../navigation/types";
import { filterContacts } from "../utils/search";
import { truncateText } from "../utils/text";

type Props = NativeStackScreenProps<ProtectedStackParamList, "Contacts">;

const CARD_TITLE_LIMIT = 24;
const CARD_DESCRIPTION_LIMIT = 56;

export function ContactsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state) => state.auth.user?.email);
  const { data, error, isFetching, isLoading, refetch } = useGetContactsQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = useMemo(
    () => filterContacts(data ?? [], searchQuery),
    [data, searchQuery],
  );

  const renderContact = ({ item }: { item: Contact }) => (
    <Pressable
      accessibilityRole="button"
      onPress={() =>
        navigation.navigate("ContactDetails", { contactId: item.id })
      }
      className="mb-3 rounded-[8px] border border-[#D9DEE8] bg-white p-4"
    >
      <Text className="text-[18px] font-bold text-[#111827]">
        {truncateText(item.name, CARD_TITLE_LIMIT)}
      </Text>
      <Text className="mt-1 text-[14px] text-[#4B5563]">
        {truncateText(
          `${item.role} at ${item.company}`,
          CARD_DESCRIPTION_LIMIT,
        )}
      </Text>
      <Text className="mt-3 text-[13px] font-semibold text-[#6D28D9]">
        View details
      </Text>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-[#F7F8FA] px-4 pt-4">
      <View className="mb-5 flex-row items-center justify-between gap-3">
        <View className="flex-1">
          <Text className="text-[13px] text-[#6B7280]">Signed in as</Text>
          <Text className="text-[16px] font-bold text-[#111827]">
            {userEmail}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => dispatch(logout())}
          className="rounded-[8px] border border-[#D1D5DB] px-4 py-3"
        >
          <Text className="font-bold text-[#111827]">Logout</Text>
        </Pressable>
      </View>

      <View className="mb-4 flex-row gap-3">
        <TextInput
          autoCapitalize="none"
          onChangeText={setSearchQuery}
          placeholder="Search by name, role, company or city"
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          className="min-w-0 flex-1 rounded-[8px] border border-[#D1D5DB] bg-white px-4 py-3 text-[#111827]"
        />
        <Pressable
          accessibilityRole="button"
          onPress={refetch}
          className="rounded-[8px] bg-[#111827] px-4 py-3"
        >
          <Text className="font-bold text-white">Refresh</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <LoadingState message="Loading contacts..." />
      ) : error ? (
        <ErrorState
          message="Could not load contacts. Start json-server and try again."
          onRetry={refetch}
        />
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
