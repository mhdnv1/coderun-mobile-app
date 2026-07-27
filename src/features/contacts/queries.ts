import { useQuery } from "@tanstack/react-query";

import { getContactById, getContacts } from "../../shared/api/mockApi";

export const contactsQueryKeys = {
  all: ["contacts"] as const,
  detail: (contactId: string) => ["contacts", contactId] as const,
};

export function useContactsQuery() {
  return useQuery({
    queryKey: contactsQueryKeys.all,
    queryFn: getContacts,
  });
}

export function useContactQuery(contactId: string) {
  return useQuery({
    queryKey: contactsQueryKeys.detail(contactId),
    queryFn: () => getContactById(contactId),
  });
}
