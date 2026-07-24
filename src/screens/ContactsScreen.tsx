import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Pressable, Text, View } from "react-native";

import { logout } from "../features/auth/authSlice";
import { useGetContactsQuery } from "../services/contactsApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { Contact } from "../types/contact";
import type { ProtectedStackParamList } from "../navigation/types";
import { truncateText } from "../utils/text";

type Props = NativeStackScreenProps<ProtectedStackParamList, "Contacts">;

const CARD_TITLE_LIMIT = 24;
const CARD_DESCRIPTION_LIMIT = 56;

export function ContactsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state) => state.auth.user?.email);
  const { data, error, isFetching, isLoading, refetch } = useGetContactsQuery();

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

      {isLoading ? (
        <Text className="mt-8 text-center text-[#4B5563]">Loading...</Text>
      ) : error ? (
        <View className="mt-8 items-center gap-4">
          <Text className="text-center text-[#B91C1C]">
            Could not load contacts. Start json-server and try again.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={refetch}
            className="rounded-[8px] bg-[#111827] px-5 py-3"
          >
            <Text className="font-bold text-white">Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={data}
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
