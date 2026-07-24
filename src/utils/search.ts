import type { Contact } from "../types/contact";

export function filterContacts(contacts: Contact[], searchQuery: string) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  if (!normalizedQuery) {
    return contacts;
  }

  return contacts.filter((contact) =>
    [contact.name, contact.role, contact.company, contact.city]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );
}
